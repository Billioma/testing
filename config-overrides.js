module.exports = function override(config) {
    return {
      ...config,
      ignoreWarnings: [
        {
          module: /node_modules\/@zxing/,
        },
      ],
    }
  }