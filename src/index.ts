import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { Worker } from 'worker_threads'

/**
 * beautify file by path
 */
function beautifier (filepath: string, outpath: string) {
  return new Promise(resolve => {
    let cache: string[] = []
    let result = ''

    const worker = new Worker(path.join(__dirname, 'work.js'))
    worker.on('message', message => {
      result += message
    })

    const readStream: NodeJS.ReadableStream = fs.createReadStream(filepath)
    readline.createInterface({ input: readStream })
      .on('line', line => {
        const trimmedLine = line.trim()
        if (!trimmedLine) return
        cache.push(trimmedLine)
        // magic number is faster than constant
        if (cache.length > 1000) {
          worker.postMessage(cache)
          cache = []
        }
      })
      .on('close', () => {
        if (cache.length) worker.postMessage(cache)
        worker.on('exit', () => {
          const filename = path.basename(filepath)
          outpath = outpath || `beauty_${filename}`
          fs.writeFileSync(outpath, result)
          resolve(outpath)
        })
        worker.postMessage('exit')
      })
  })
}

export = beautifier
