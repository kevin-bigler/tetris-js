const fs = require('fs');
const csvParse = require('csv-parse');
const csvParseSync = require('csv-parse/lib/sync');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'app', 'resources', 'pieces', 'S.csv');

const readCsv = new Promise((resolve, reject) => {

    fs.readFile(inputPath, function (err, fileData) {
        if (err) {
            return reject(err);
        }

        csvParse(fileData, {trim: true}, function(err, rows) {
            if (err) {
                return reject(err);
            }
            return resolve(rows);
        });
    });

});

// readCsv.then((rows) => {
//     console.log('done reading csv. rows:', rows);
// });

const readCsvSync = (file) => {
    const fileData = fs.readFileSync(file);
    const rows = csvParseSync(fileData, {trim: true});
    return rows;
};


console.log('rows:', readCsvSync(inputPath));
