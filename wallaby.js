module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js',
      '!src/**/*.test.js',
    ],
    tests: [
      'src/**/*.test.js',
    ],
    env: {
      type: 'node',
    },
    testFramework: 'mocha',
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets: ['@babel/preset-env']
      })
    },
  }
}
