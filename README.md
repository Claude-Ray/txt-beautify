# txt-beautify
[![Build Status](https://travis-ci.org/Claude-Ray/txt-beautify.svg?branch=master)](https://travis-ci.org/Claude-Ray/txt-beautify)

Beautify text files for better reading experience on kindle.

## Features
- Without calibre
- No need to convert into mobi

主要用于kindle传书，不需要calibre，不需要转mobi，因为亚马逊会自动转换txt文件。

这里仅修饰文件内容，以便亚马逊转出格式更优美的文本。

现在只是一个简单粗暴的脚本，要求文件编码utf-8，满足基本需求。

## Install
```sh
npm install txt-beautify -g
```

## Usage
### cli
```
Usage: txt-beautify input_file [output_file]

Beautify text files for better reading experience on kindle.

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

### package
```js
const txtBeautify = require('txt-beautify');
  
// return a Promise
txtBeautify(filepath, outpath);
// or
txtBeautify(filepath)
  .then(defaultOutpath => { });
```

## Todo
~~有时间会做一些优化~~
- [x] Node.js 版本高于 10.5.0 时支持 worker_threads
- [x] cli，先做个最基础的凑合用
- [ ] 功能扩充
- [ ] txt中标题优化
