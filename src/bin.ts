#! /usr/bin/env node --experimental-worker
'use strict'

import { Command } from 'commander'
import beautifier from '.'
import pkg from '../package.json'

const program = new Command()

program.version(pkg.version)
  .usage('input_file [output_file]')
  .description('Beautify text files for better reading experience on kindle.')
  .action((input, output) => {
    return beautifier(input, output)
      .then(() => console.log('txt-beautify done'))
      .catch(console.error)
  })

program.parse(process.argv)
