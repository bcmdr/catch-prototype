#!/usr/bin/env node

// File System
const fs = require('fs')

// File Name
const defaultFilename = 'untitled'
const fileformat = 'md'
const inputFilename = process.argv[2]
const filename = inputFilename ? inputFilename : defaultFilename
const file = filename + '.' + fileformat

// Readline API
const readline = require('readline')
const rl = readline.createInterface(process.stdin, process.stdout);

function handleLine(line) {
  // Close on empty Lines
  if (line === '') {
    rl.close()
  } else {
    // Save non-empty lines
    captureLine(line)
    // Prompt again
    rl.prompt()
  }
}

function handleClose() {
  process.exit(0)
}

function captureLine (line) {
  line = '\n' + line
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





