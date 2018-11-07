'use strict';

const fs = require('fs');
const path = require('path');
const txtBeautify = require('../');

test('check text', async () => {
  const preFilePath = path.join(__dirname, 'before.txt');
  const nextFilePath = path.join(__dirname, 'after.txt');
  const outpath = path.join(__dirname, 'after_test.txt');

  await txtBeautify(preFilePath, outpath);

  const nextFile = fs.readFileSync(nextFilePath);
  const outFile = fs.readFileSync(outpath);

  expect(outFile).toEqual(nextFile);

  fs.unlinkSync(outpath);
});
