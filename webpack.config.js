var path = require('path');

module.exports = {

  context: path.join(__dirname, "app"),

  //define entry point
  entry: './js/main.js',

  //define output point
  output: {
      path: __dirname + "/app/",
      filename: 'app.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          plugins: ['lodash'],
          presets: ['es2015', 'stage-2']
        }
      }
      // {
      //     test: /\.scss$/,
      //     loader: 'style-loader!css-loader!sass-loader'
      // }
    ] //loaders
  }, //module

  plugins: [
  ],


  devtool: "inline-sourcemap"

};