const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// let outputFilename= "firebase.js";
let dev = "development";
if (process.env.NODE_ENV) {
  dev = process.env.NODE_ENV;
}
console.log("node env: '" + process.env.NODE_ENV + "'");
console.log("bla env: '" + process.env.npm_config_bla + "'");

// console.log("env: "+ JSON.stringify(process.env));
// if(fs.existsSync(path.resolve(__dirname, 'testing.txt'))){
// let bla = fs.readFileSync(path.resolve(__dirname, 'testing.txt'))
// console.log("testing1 env: '"+new String(bla).length+"'");
// console.log("testing2 env: '"+bla+"'");
// }
// console.log("testing env: '"+process.env.TESTING+"'");
// console.log("firebase env: '"+process.env.npm_config_FIREBASE_CONFIG+"'");
// let fb_config = process.env.npm_config_FIREBASE_CONFIG;
// console.log("firebase config: '" + fb_config + "'");
// console.log("firebase2 config: '" + process.env.npm_config_FIREBASE_CONFIG2 + "'");
// if (fb_config) {
//   fs.writeFileSync(path.resolve(__dirname, 'firebase-config.json'), fb_config);
// }
const distFolder = path.resolve(__dirname, 'public/js/dist');
if (fs.existsSync(distFolder)) {
  fs.mkdirSync(distFolder, { recursive: true });
}

module.exports = {
  mode: dev,
  // watch: true,
  watchOptions: {
    ignored: ['**/dist/*.js', '**/bundle*.js', '**/node_modules'],
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
    jQuery: {
      import: './public/thirdparty/jquery.js',
      // import: './public/thirdparty/flexdatalist/jquery.flexdatalist.min.js',
    }
  },
  output: {
    path: distFolder,
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
          // let files = fs.readdirSync(path.resolve(__dirname, 'dist/'));
          // for(let myfile of files){
          // // fs.copyFileSync(path.resolve(__dirname, 'dist/'+myfile), path.resolve(__dirname, 'public/js/'+myfile));
          // console.info("copy file: " +myfile );
          // }
          console.info('\x1b[31m%s\x1b[0m', "done '" + new Date().toString());
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
          fs.readdir(distFolder, (err, files) => {
            if (err)
              console.log(err);
            else {
              console.log("dist-directory files:");
              files.forEach(file => {
                console.log(file);
              })
            }
          })
        });
      }
    },
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // instead of style-loader
          {
            loader: 'css-loader', options: { sourceMap: false },
          }
        ],
      }
    ],
  },
  //devtool: dev ? 'eval-cheap-module-source-map' : 'source-map',
  devtool: dev == 'development' ? 'inline-source-map' : 'source-map',
};