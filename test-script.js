const fs = require('fs');
const browserify = require('browserify');
browserify('./docs-js/main.js')
  .transform('babelify', {presets: ['es2015', 'react']})
  .bundle()
  .pipe(fs.createWriteStream('bundle.js'));
