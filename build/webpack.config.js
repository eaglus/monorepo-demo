const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const { merge } = require('lodash');

const getPostcssConfig = require('./postcss.config');

const isProduction = process.env.NODE_ENV === 'production';
const emitAssets = process.env.ASSETS;

const enableHmr = !isProduction;
const mode = isProduction ? 'production' : 'development';
const reactEnvironment = isProduction ? 'production' : 'development';
const target = 'web';
const isSilent = false;
const outputPath = path.resolve(__dirname, '../public/');

class StatsFilterPlugin {
  apply(compiler) {
    const excludeChildrenMessages = ['extract-css-chunks-webpack-plugin'];
    compiler.hooks.done.tap('stats-filter-plugin', result => {
      result.compilation.children = result.compilation.children.filter(
        child =>
          !excludeChildrenMessages.find(
            exclude => child.name.indexOf(exclude) !== -1
          )
      );
    });
  }
}

function getResolve() {
  const resolveHmr = isProduction
    ? undefined
    : {
        alias: {
          'react-dom': '@hot-loader/react-dom'
        }
      };

  return merge(resolveHmr, {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.css']
  });
}

function getEntry() {
  const hmrEntry = enableHmr ? ['react-hot-loader/patch'] : [];

  const entryPoint = path.resolve(__dirname, '../packages/app/index.tsx');

  return [...hmrEntry, entryPoint];
}

function getRules() {
  const cssLoaderBuildOptions = {};

  const cssLoadersTop = [
    {
      loader: MiniCssExtractPlugin.loader
    }
  ];

  const babelLoaderUse = [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        configFile: path.resolve(__dirname, './babel.config.js'),
        caller: {
          target,
          isProduction,
          isVerbose: !isSilent
        }
      }
    }
  ];

  return [
    {
      test: /\.tsx?$/,
      exclude: /(node_modules)/,
      use: babelLoaderUse
    },
    {
      test: /\.css$/,
      use: [
        ...cssLoadersTop,
        {
          loader: 'css-loader',
          options: {
            ...cssLoaderBuildOptions,
            importLoaders: 1,
            modules: {
              localIdentName: isProduction
                ? '[hash:base64]'
                : '[folder]--[local]___[hash:base64:5]'
            }
          }
        }
        // {
        //   loader: 'postcss-loader',
        //   options: {
        //     postcssOptions: getPostcssConfig({
        //       isProduction
        //     })
        //   }
        // }
      ]
    }
  ];
}

function getPlugins() {
  const cssPlugins = [
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name]-bundle-[chunkhash:8].css' : '[name].css',
      chunkFilename: isProduction ? '[id]-chunk-[chunkhash:8].css' : '[id].css',
      ignoreOrder: true
    })
  ];

  const clientPlugins = [
    ...cssPlugins,
    !isProduction &&
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          enabled: true,
          files: './packages/**/*.{ts,tsx,js}'
        }
      }),
    enableHmr && new webpack.HotModuleReplacementPlugin()
  ];

  const pluginsForBuild = clientPlugins;

  return [
    new StatsFilterPlugin(),
    new CleanWebpackPlugin(),
    ...pluginsForBuild,

    new LoadablePlugin(),
    new webpack.EnvironmentPlugin({
      REACT_ENVIRONMENT: reactEnvironment
    }),
    new HtmlWebpackPlugin({
      title: 'Monorepo demo',
      template: path.resolve(__dirname, '../packages/app/template/index.ejs')
    })
  ].filter(p => !!p);
}

module.exports = {
  mode,
  target,
  name: 'client',
  devtool: 'source-map',
  plugins: getPlugins(),
  output: {
    path: outputPath,
    publicPath: '/',
    chunkFilename: '[id]-chunk-[chunkhash:8].js',
    filename: '[name]-bundle-[chunkhash:8].js'
  },

  resolve: getResolve(),

  entry: getEntry(),

  module: {
    rules: getRules()
  },
  stats: {
    children: true,
    timings: true,
    colors: true,
    assets: emitAssets,
    warnings: false,
    modules: false
  },
  infrastructureLogging: {
    level: 'warn'
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  }
};
