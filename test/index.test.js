'use strict';

const path = require('path');
const txtBeautify = require('../');

function convert() {
  const filepath = path.join(__dirname, 'before.txt');
  txtBeautify(filepath);
}

convert();
