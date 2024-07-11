const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust the entry point to match your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"),
      "async_hooks": require.resolve("async_hooks"),
      "querystring": require.resolve("querystring-es3"),
      "path": require.resolve("path-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "fs": false,
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "net": false,
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
    },
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
