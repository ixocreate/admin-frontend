var webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|en/),
  ]
};
