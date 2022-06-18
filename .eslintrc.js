module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  extends: [
    'plugin:vue/essential',
  ],
  plugins: [
    'html',
    'import',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-restricted-syntax': 'off',
    'vue/no-mutating-props': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'max-len': ['error', { ignorePattern: 'd="([\\s\\S]*?)"', code: 120 }],
    'no-shadow': ['error', { allow: ['state'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        vue: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
};
