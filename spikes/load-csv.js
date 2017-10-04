const fs = require('fs');
const parse = require('csv-parse');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'app', 'resources', 'pieces', 'S.csv');

const readCsv = new Promise((resolve, reject) => {

    fs.readFile(inputPath, function (err, fileData) {
        if (err) {
            return reject(err);
        }

        parse(fileData, {trim: true}, function(err, rows) {
            if (err) {
                return reject(err);
            }
            console.log('rows:', rows);
            return resolve(rows);
        });
    });

});

readCsv.then((rows) => {
    console.log('done reading csv. rows:', rows);
});