function isProductionEnv(caller) {
  return Boolean(caller && caller.isProduction);
}

function isVerbose(caller) {
  return Boolean(caller && caller.isVerbose);
}

module.exports = api => {
  const prod = api.caller(isProductionEnv);
  const verbose = api.caller(isVerbose);

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 'core-js@3',
          targets: {
            browsers: 'since 2019'
          },
          loose: true
        }
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      'lodash',
      !prod && 'react-hot-loader/babel',
      '@babel/transform-runtime',
      prod && '@babel/plugin-transform-react-inline-elements',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      '@loadable/babel-plugin'
    ].filter(p => !!p)
  };

  if (verbose) {
    console.log('Babel env: ', 'prod = ', prod);
  }

  return config;
};
