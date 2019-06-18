'use strict';

const fs = require('fs');

/**
 * @module alterFile
 * @param {string} file - Name of the file to read from
 * @desc Handles promise chain for read and write file
 */
const alterFile = (file) => {
  readFile(file)
    .then(data => {
      writeFile(file, caps(data));
    });
};

/**
 * @module readFile
 * @param {string} file - Name of the file to read from
 * @desc Handles reading the file and turning it's data to string
 */
let readFile = (file) => {
  return new Promise((resolve) => {
    fs.readFile( file, (err, data) => {
      if(err) { throw err; }
      resolve(data.toString());
    });
  });
};

/**
 * @module caps
 * @param {string} file - Name of the file to read from
 * @param {string} text - The text from the file
 * @desc Handles changing the text to all uppercase
 */
let caps = (data) => {
  return data.toUpperCase();
};

/**
 * @module writeFile
 * @param {string} file - Name of the file to read from
 * @param {string} text - The text from the file
 * @desc Writes the text to the file
 */
let writeFile = (file, text) => {
  return new Promise(() => {
    fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) { throw err; }
      console.log(`${file} saved!`);
    });
  });
};

let file = process.argv.slice(2).shift();
alterFile(file);
