const webpack = require('webpack');

module.exports = function override(config) {
  // add fallback for fs module
  config.resolve.fallback = { "fs": false };
  
  // set up other configurations
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    url: require.resolve('url'),
    path: require.resolve('path-browserify'),
  });
  config.resolve.fallback = fallback;

  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ]

  return config;
};
