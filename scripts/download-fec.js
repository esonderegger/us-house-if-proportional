const fs = require('fs');
const http = require('http');

const years = [
  2004,
  2006,
  2008,
  2010,
  2012,
  2014,
];

years.forEach((year) => {
  const url = 'http://www.fec.gov/pubrec/fe' + year + '/federalelections' +
    year + '.xls';
  const xlsPath = 'xls/' + year + '.xls';
  let xlsFile = fs.createWriteStream(xlsPath);
  const request = http.get(url, (response) => {
      response.pipe(xlsFile);
      response.on('end', () => {
        console.log('successfully downloaded: ' + url);
      });
    });
  request.on('error', () => {
    console.log('error downloading: ' + url);
  });
});
