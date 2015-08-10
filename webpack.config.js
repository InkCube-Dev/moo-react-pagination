module.exports = {
  entry: {
    example: './example/app.js'
  },
  devtool: 'source-map',
  output: {
    filename: './example/app.bundle.js',
    sourceMapFilename: './example/app.bundle.js.map'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
