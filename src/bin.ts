#! /usr/bin/env node --experimental-worker
'use strict'

import { Command } from 'commander'
import beautifier from '.'
import pkg from '../package.json'

const program = new Command()

program
  .version(pkg.version)
  .arguments('<input_file> [output_file]')
  .description('Beautify text files for better reading experience on kindle.')
  .action((input, output) => {
    return beautifier(input, output)
      .then(outpath => console.log(`txt-beautify done: ${outpath}`))
      .catch(console.error)
  })

program.parse(process.argv)
