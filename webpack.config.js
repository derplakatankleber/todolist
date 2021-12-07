const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// let outputFilename= "firebase.js";
const dev = process.env.NODE_ENV !== 'production'
console.log("node env: '"+process.env.NODE_ENV+"'");

module.exports = {
  mode: 'development',
  // watch: true,
  watchOptions: {
    ignored: ['**/dist/*.js','**/bundle*.js', '**/node_modules'],
  },
  entry: {
    index: {
        import: './index.js',
        // dependOn: 'firebase',
        dependOn: 'jQuery',
    },
    // firebase:{
        // import: ['firebase/app','firebase/auth','firebase/firestore'],
        // //import: 'indexFirebase.js',
        // dependOn: 'jQuery',
    // },
    jQuery:{
        import: './public/thirdparty/jquery.js',
    }
  },
  output: {
    path: path.resolve(__dirname, 'public/js/dist'),
    filename: '[name].bundle.js',//outputFilename,
  },
  optimization: {
    runtimeChunk: 'single',
  },
    plugins: [
        {
          apply: (compiler) => {
            compiler.hooks.done.tap('DonePlugin', (compilation) => {
            //  try {
                let files = fs.readdirSync(path.resolve(__dirname, 'dist/'));
                for(let myfile of files){
                    // fs.copyFileSync(path.resolve(__dirname, 'dist/'+myfile), path.resolve(__dirname, 'public/js/'+myfile));
                    console.info("copy file: " +myfile );
                }
                console.info('\x1b[31m%s\x1b[0m',"done '"+ new Date().toString());
                // console.info("pfad: " + path.resolve(__dirname, 'dist/'+outputFilename));
                // fs.copyFileSync(path.resolve(__dirname, 'dist/'+outputFilename), path.resolve(__dirname, 'public/js/'+outputFilename));
            //    console.log('source.txt was copied to destination.txt');
            //} catch {
            //    console.log('The file could not be copied');
            //}
            //firebase deploy
                // exec('firebase deploy', (err, stdout, stderr) => {
                 // if (stdout) process.stdout.write(stdout);
                 // if (stderr) process.stderr.write(stderr);
               // });
            });
          }
        }
    ],
  //devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
  devtool: 'inline-source-map',
};