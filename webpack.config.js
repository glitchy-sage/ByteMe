const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Correct way to specify the static files directory
    },
    historyApiFallback: true,  // This tells the server to serve index.html for all routes
    compress: true,  // Enable gzip compression for everything served
    port: 8080,      // Port for the dev server
    open: true       // Automatically opens the browser when the server starts
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
