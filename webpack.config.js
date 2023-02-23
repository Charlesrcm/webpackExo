const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readdirSync } = require('fs');
const { extname, parse } = require('path');

const filesNames = readdirSync(__dirname + '/src')
  .filter(f => extname(f) == '.ts')
  .map(f => parse(f).name);

const options = {
  mode: process.env.NODE_ENV,
  entry: filesNames.reduce((obj, f) => (
    { ...obj, [f]: `${__dirname}/src/${f}.ts` }
  ), {}),
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader'
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    ...filesNames.map(f => new HtmlWebpackPlugin({
      filename: `${f}.html`,
      template: `${__dirname}/src/${f}.html`
    }))
  ],
  devServer: {
    port: 4000,
    open: false,
    watchFiles: ['./src/**/*']
  }
};

module.exports = options;