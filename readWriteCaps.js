'use strict';

const fs = require('fs');

module.exports = exports = {};

/**
 * @module readFile
 * @param {string} file - Name of the file to read from
 * @desc Handles reading the file and turning it's data to string
 */
exports.readFile = (file) => {
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
exports.caps = (data) => {
  return data.toUpperCase();
};

/**
 * @module writeFile
 * @param {string} file - Name of the file to read from
 * @param {string} text - The text from the file
 * @desc Writes the text to the file
 */
exports.writeFile = (file, text) => {
  return new Promise(() => {
    fs.writeFile( file, Buffer.from(text), (err) => {
      if(err) { throw err; }
      console.log(`${file} saved!`);
    });
  });
};