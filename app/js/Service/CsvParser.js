const fs = require('fs');
const csvParse = require('csv-parse');
const csvParseSync = require('csv-parse/lib/sync');
const ResourceLoader = require('./ResourceLoader.js');

export default class CsvParser {
    constructor() {

    }

    /**
     * Asynchronously Parse CSV to a 2D Array
     *
     * @param filePath String Path to file, relative to the resources directory
     * @returns {Promise}
     */
    parseToArrays(filePath) {
        return new Promise((resolve, reject) => {

            const resourceLoader = new ResourceLoader();
            resourceLoader.loadText(filePath)
                .then((fileData) => {
                    csvParse(fileData, {trim: true}, function(err, rows) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(rows);
                    });
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }

    /**
     * Synchronously parse CSV to 2D Array
     *
     * @param filePath String Path to file, relative to the resources directory
     * @returns {*}
     */
    parseToArraysSync(filePath) {
        const resourceLoader = new ResourceLoader();
        const fileData = resourceLoader.loadTextSync(filePath);
        const rows = csvParseSync(fileData, {trim: true});
        return rows;
    }
}
