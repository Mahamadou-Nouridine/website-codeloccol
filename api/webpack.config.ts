const path = require('path');
const webpack = require('webpack');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.ENVIRONMENT': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('3080'),
  'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb://192.168.1.4:27017/codeloccol')
};

if (environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('3080'),
    'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb://192.168.1.4:27017/codeloccol')
  };
} else if (environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('3080'),
    'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb+srv://codeloccol:SDpHrgYY6k23cqu@cluster0.ucscesg.mongodb.net/?retryWrites=true&w=majority')
  };
}

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api.bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
  ]
};