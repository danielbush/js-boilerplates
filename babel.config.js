module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Minimum verisions to support:
        targets: {
          chrome: '50',
          ie: '11',
        },

        // USEBUILTINS
        //
        // 'entry'` will break up `import '@babel/polyfill'` into
        // separate requires and only include ones needed by your
        // targets.  But if the targets require regenerator runtime
        // (eg to transform async/await),
        // it will generate `require("regenerator-runtime/runtime");`
        // which isn't installed.  Setting this to false (default)
        // which just imports @babel/polyfill doesn't have this issue.
        // We could probalby install the runtime explicitly as a dep?
        //
        // Related: https://github.com/babel/babel/issues/8829

        useBuiltIns: false, // see above note
      },
    ],
  ],
  plugins: [
    // Proposals probably aren't in babel-env, so we the ones we want here:
    '@babel/proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ],
};
