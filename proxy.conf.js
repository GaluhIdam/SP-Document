const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'http://172.16.41.107:8322',
    changeOrigin: true,
  }));
};
