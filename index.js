'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function beautifier(filepath, outpath) {
  const readStream = fs.createReadStream(filepath);
  const data = [];
  return readline.createInterface({ input: readStream })
    .on('line', line => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return;
      trimmedLine.split(/\s{2,}/)
        .map(str => data.push(`　　${str}`));
    })
    .on('close', () => {
      const filename = path.basename(filepath);
      outpath = outpath || `beauty_${filename}`;
      fs.writeFileSync(outpath, data.join('\r\n\r\n'));
      console.log('ok');
    });
}

module.exports = beautifier;
