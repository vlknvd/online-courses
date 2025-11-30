const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: '/',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|webp|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]',
        },
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    open: true,
    port: 8080,
  },

  target: 'web',
};
