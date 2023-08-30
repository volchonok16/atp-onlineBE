import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Configuration } from 'webpack';
import * as fs from 'fs';

const devServer: DevServerConfiguration = {
  https: {
    key: fs.readFileSync('src/Backend/ssl/cert.key'),
    cert: fs.readFileSync('src/Backend/ssl/cert.crt'),
    ca: fs.readFileSync('src/Backend/ssl/ca.crt'), // Use "ca" instead of "cacert"
  },

  allowedHosts: ['.example.dev'], // An array of allowed hosts
  setupMiddlewares(middlewares, devServer) {
    // Serve OPTIONS requests
    devServer.app.options('*', (req, res) => {
      // Only serve if request has the expected origin header
      if (/^https:\/\/example\.dev$/.test(req.headers.origin)) {
        res.set({
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Private-Network': 'true',
          // Using * results in an error if the request includes credentials
          'Access-Control-Allow-Origin': req.headers.origin,
        });

        res.sendStatus(200);
      }
    });

    return middlewares;
  },
};

const config: Configuration = { devServer };

export default config;
