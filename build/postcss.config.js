module.exports = ({ isProduction }) => {
  return {
    plugins: [
      require('postcss-import'),
      require('postcss-mixins')(),
      require('precss')(),
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
