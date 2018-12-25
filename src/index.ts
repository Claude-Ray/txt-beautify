'use strict'

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

/**
 * beautify file by path
 * @param {string} filepath
 * @param {string} [outpath]
 * @return {Promise.<string>} outpath
 */
function beautifier (filepath: string, outpath: string) {
  return new Promise((resolve, reject) => {
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
        fs.writeFileSync(outpath, data.join('\r\n\r\n'))
        resolve(outpath)
      })
  })
}

export = beautifier
