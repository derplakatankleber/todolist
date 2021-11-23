const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let outputFilename= "firebase.js";
const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFilename,
  },
    plugins: [
        {
          apply: (compiler) => {
            compiler.hooks.done.tap('DonePlugin', (compilation) => {
            //  try {
                console.info("pfad: " + path.resolve(__dirname, 'dist/'+outputFilename));
                fs.copyFileSync(path.resolve(__dirname, 'dist/'+outputFilename), path.resolve(__dirname, 'public/js/'+outputFilename));
            //    console.log('source.txt was copied to destination.txt');
            //} catch {
            //    console.log('The file could not be copied');
            //}
                exec('firebase deploy', (err, stdout, stderr) => {
                 if (stdout) process.stdout.write(stdout);
                 if (stderr) process.stderr.write(stderr);
               });
            });
          }
        }
    ],
  devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
};