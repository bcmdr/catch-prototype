#!/usr/bin/env node

// File System
const fs = require('fs')

// File Name
const defaultFilename = 'catch'
const fileformat = 'md'
const inputFilename = process.argv[2]
const filename = inputFilename ? inputFilename : defaultFilename
const file = filename + '.' + fileformat

// Readline API
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout)

// Track Empty Lines to Exit on Double Enter
let emptyLineCount = 0

function handleEmptyLine(line) {

  emptyLineCount++

  // Consecutive Empty Lines
  if (emptyLineCount > 1) {
    rl.close()
    return
  }

  captureLine(line)
  rl.prompt()
}

function handleLine(line) {

  // Handle empty lines
  if (line === '') {
    handleEmptyLine(line)
    return
  }

  emptyLineCount = 0
  captureLine(line)
  rl.prompt()
}

function handleClose() {
  process.exit(0)
}

function captureLine (line) {

  line = line + '\n'

  fs.appendFile(file, line, err => {  
    if (err) throw err;
  });

}

// Setup the Prompt Loop
rl.setPrompt('| ');
rl.on('line', line => { handleLine(line) })
rl.on('close', handleClose)

// start the prompt loop
rl.prompt()