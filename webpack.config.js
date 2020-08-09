const path = require('path');

const ENV = process.env.ENV === 'production' ? 'production' : 'local';
const watch = process.env.WATCH !== 'false';
const development = ENV === 'local';

console.log(`Starting webpack:`, {
  ENV,
  watch,
});

module.exports = {
  mode: development ? 'development' : 'production',

  entry: {
    fn: './source/index.ts',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  watch: watch,

  // Enable sourcemaps for debugging webpack's output.
  devtool: development ? 'source-map' : false,

  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.ts'],
    alias: {
      "@source": path.resolve(__dirname, 'source/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
};