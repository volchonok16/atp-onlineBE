import * as fs from 'fs';

module.exports = {
  //...
  devServer: {
    https: {
      key: fs.readFileSync('./.ssl/cert.key'),
      cert: fs.readFileSync('./.ssl/cert.crt'),
      cacert: fs.readFileSync('./.ssl/ca.crt'),
    },

    allowedHosts: '.example.dev', // should match host in origin below
    setupMiddlewares(middlewares, devServer) {
      // Serve OPTIONS requests
      devServer.app.options('*', (req, res) => {
        // Only serve if request has expected origin header
        if (/^https:\/\/example\.dev$/.test(req.headers.origin)) {
          res.set({
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Private-Network': 'true',
            // Using * results in an error if the request includes credentials
            'Access-Control-Allow-Origin': req.headers.origin,
          });

          res.sendStatus(200);
        }
      }); // <-- Missing closing parenthesis

      return middlewares;
    },
  },
};
