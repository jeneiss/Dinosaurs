var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'},
      {test: /\.less$/, use: ['style-loader', 'less-loader']}
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
