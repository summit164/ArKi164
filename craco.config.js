const path = require('path') // eslint-disable-line @typescript-eslint/no-require-imports

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
