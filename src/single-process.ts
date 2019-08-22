import fs from 'fs'
import path from 'path'
import readline from 'readline'

const CRLF = '\r\n\r\n'

export default (filepath: string, outpath: string) =>
  new Promise(resolve => {
    const data: string[] = []
    const readStream: NodeJS.ReadableStream = fs.createReadStream(filepath)
    readline.createInterface({ input: readStream })
      .on('line', line => {
        const trimmedLine = line.trim()
        if (!trimmedLine) return
        trimmedLine.split(/\s{2,}/)
          // tslint:disable-next-line
          .map(str => data.push(`　　${str}`))
      })
      .on('close', () => {
        const filename = path.basename(filepath)
        outpath = outpath || `beauty_${filename}`
        fs.writeFileSync(outpath, data.join(CRLF) + CRLF)
        resolve(outpath)
      })
  })
