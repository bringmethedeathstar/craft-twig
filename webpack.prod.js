const webpack = require('webpack');
const path = require('path');

// plugins
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    // craft: path.resolve(__dirname, './src/scripts/craft.js'),
    main: path.resolve(__dirname, './src/scripts/main.js'),
  },

  output: {
    path: path.resolve(__dirname, './web/assets/'),
    filename: '[name].[hash].js',
    publicPath: '/assets/',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [path.resolve(__dirname, 'src/images')],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: { extract: true },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        exclude: [path.resolve(__dirname, 'src/sprite')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
            },
          },
          // 'svgo-loader',
        ],
      },
      {
        test: /\.html$/,
        use: ['raw-loader'],
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
    ],
  },

  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '',
      map: file => {
        file.name = file.name.replace(/(\.[a-f0-9]{32})(\..*)$/, '$2');
        return file;
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(['web/assets']),
    new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }),
    new SpriteLoaderPlugin(),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'initial',
    },
  },
};
