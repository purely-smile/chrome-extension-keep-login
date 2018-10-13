/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import path from 'path'

const { NODE_ENV = 'development' } = process.env

const base = {
  context: __dirname,
  entry: {
    background: './src/background/index.js',
    popup: './src/popup/index.js',
    options: './src/options/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: './src/manifest.json', to: './manifest.json' },
    ]),
    new HtmlWebpackPlugin({
      template: './src/popup/template.html',
      chunks: ['popup'],
      filename: 'popup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/options/template.html',
      chunks: ['options'],
      filename: 'options.html',
    }),
    new VueLoaderPlugin(),
  ],
}


const development = {
  ...base,
  mode: 'development',
  module: {
    ...base.module,
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
}

const production = {
  ...base,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'production',
  devtool: '#source-map',

  plugins: [
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
  ],
}

if (NODE_ENV === 'development') {
  module.exports = development
} else {
  module.exports = production
}
