module.exports = ({ isProduction }) => {
  return {
    plugins: [
      require('postcss-import'),
      require('postcss-mixins')(),
      //require('precss')(), - TODO: режет @tsp-wl в composes: Unable to find property @tsp-wl in .submit-button
      require('postcss-preset-env')({
        autoprefixer: false
      }),
      require('postcss-flexbugs-fixes')(),
      require('postcss-custom-media')(),
      require('postcss-calc')({
        warnWhenCannotResolve: !isProduction,
        mediaQueries: true
      }),
      require('postcss-reporter')()
    ]
  };
};
