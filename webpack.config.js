const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const IS_DEVELOPMENT = argv.mode === 'development';

  return {
    output: {
      filename: IS_DEVELOPMENT ? 'bundle.js' : 'bundle.min.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      open: true,
      hot: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          }
        },
        {
          test: /.css$/,
          use: [
            IS_DEVELOPMENT ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'view/index.html')
      }),
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        filename: 'style.min.css'
      }),
      ...(IS_DEVELOPMENT ? [new webpack.HotModuleReplacementPlugin()] : [])
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        components: path.resolve(__dirname, 'src/components/')
      }
    }
  };
};
