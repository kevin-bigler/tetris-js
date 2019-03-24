const path = require('path');

module.exports = {

  context: path.resolve(__dirname, "app"),

  entry: './js/main.js',
  output: {
      path: path.resolve(__dirname, "app/"),
      filename: 'app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },

  plugins: [
  ],

  devtool: "inline-sourcemap"

};