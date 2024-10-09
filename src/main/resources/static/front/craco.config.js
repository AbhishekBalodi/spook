module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.externals = {
        jquery: 'jQuery'
      };
      return webpackConfig;
    }
  }
};
