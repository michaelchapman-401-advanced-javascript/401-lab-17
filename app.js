'use strict';

const utility = require('./readWriteCaps.js');

/**
 * @module alterFile
 * @param {string} file - Name of the file to read from
 * @desc Handles promise chain for read and write file
 */
const alterFile = (file) => {
  utility.readFile(file)
    .then(data => {
      utility.writeFile(file, utility.caps(data));
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
