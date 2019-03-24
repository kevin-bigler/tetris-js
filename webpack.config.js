const path = require('path');

module.exports = {

  context: path.resolve(__dirname, "src"),

  entry: './js/app.js',
  output: {
      path: path.resolve(__dirname, "src/"),
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