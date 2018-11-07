'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * beautify file by path
 * @param {string} filepath
 * @param {string} [outpath]
 * @return {Promise.<string>} outpath
 */
function beautifier(filepath, outpath) {
  return new Promise((resolve, reject) => {
    const data = [];
    const readStream = fs.createReadStream(filepath);
    readline.createInterface({ input: readStream })
      .on('line', line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return;
        trimmedLine.split(/\s{2,}/)
          // eslint-disable-next-line
          .map(str => data.push(`　　${str}`));
      })
      .on('close', () => {
        const filename = path.basename(filepath);
        outpath = outpath || `beauty_${filename}`;
        fs.writeFileSync(outpath, data.join('\r\n\r\n'));
        resolve(outpath);
      });
  });
}

module.exports = beautifier;
