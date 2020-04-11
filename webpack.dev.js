const webpack = require('webpack');
const path = require('path');
const sane = require('sane');

// plugins
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  mode: 'development',

  entry: {
    // craft: path.resolve(__dirname, './src/scripts/craft.js'),
    main: path.resolve(__dirname, './src/scripts/main.js'),
  },

  output: {
    path: path.resolve(__dirname, './web/assets/'),
    // publicPath: settings.urls.publicPath,
    filename: '[name].js',
    publicPath: 'http://localhost:8080/',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  devtool: 'inline-source-map',

  devServer: {
    public: 'http://localhost:8080',
    contentBase: './templates/',
    host: '0.0.0.0',
    port: '8080',
    https: false,
    hot: true,
    overlay: true,
    stats: 'errors-only',
    watchOptions: {
      poll: false,
      ignored: /node_modules/,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // Use sane to monitor all of the templates files and sub-directories
    before: (app, server) => {
      const watcher = sane(path.join(__dirname, './templates/'), {
        glob: ['**/*'],
        poll: false,
      });
      watcher.on('change', function(filePath, root, stat) {
        console.log('  File modified:', filePath);
        server.sockWrite(server.sockets, 'content-changed');
      });
    },
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
        loader: 'svg-sprite-loader',
        exclude: [path.resolve(__dirname, 'src/images')],
        options: { extract: true },
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
        ],
      },
      {
        test: /\.(html|twig)$/,
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
    new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new SpriteLoaderPlugin(),
  ],
};
