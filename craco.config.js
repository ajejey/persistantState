const MillionLint = require('@million/lint').default;
module.exports = {
  webpack: {
    plugins: { add: [MillionLint.webpack({ legacyHmr: true })] }
  }
};