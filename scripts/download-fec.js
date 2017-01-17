'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const years = [
  2004,
  2006,
  2008,
  2010,
  2012,
  2014,
];

function directoryExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

const xlsDir = path.join(process.cwd(), 'xls');

if (!directoryExists(xlsDir)) {
  fs.mkdirSync(xlsDir);
}

years.forEach((year) => {
  const url = 'http://www.fec.gov/pubrec/fe' + year + '/federalelections' +
    year + '.xls';
  const xlsPath = 'xls/' + year + '.xls';
  let xlsFile = fs.createWriteStream(xlsPath);
  const request = http.get(
    url,
    (response) => {
      response.pipe(xlsFile);
      response.on('end', () => {
        if (response.statusCode === 200) {
          console.log('successfully downloaded: ' + url);
        } else {
          console.log('statusCode: ', response.statusCode);
        }
      });
    });
  request.on('error', (err) => {
    console.log('error downloading: ' + url);
    console.log(err);
  });
  request.end();
});
