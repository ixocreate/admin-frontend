var webpack = require('webpack');
module.exports = {
  plugins: [
    // load `moment/locale/ja.js` and `moment/locale/it.js`
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|en/),
  ]
};
