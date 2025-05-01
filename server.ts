// import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr/node';
// import express from 'express';
// import { fileURLToPath } from 'node:url';
// import { dirname, join, resolve } from 'node:path';
// import bootstrap from './src/main.server';
// import * as cookie from 'cookie';

// // The Express app is exported so that it can be used by serverless Functions.
// export function app(): express.Express {
//   const server = express();
//   const serverDistFolder = dirname(fileURLToPath(import.meta.url));
//   const browserDistFolder = resolve(serverDistFolder, '../browser');
//   const indexHtml = join(serverDistFolder, 'index.server.html');

//   const commonEngine = new CommonEngine();

//   server.set('view engine', 'html');
//   server.set('views', browserDistFolder);

//   // Example Express Rest API endpoints
//   // server.get('/api/**', (req, res) => { });
//   // Serve static files from /browser
//   server.get('**', express.static(browserDistFolder, {
//     maxAge: '1y',
//     index: 'index.html',
//   }));

//   // All regular routes use the Angular engine
//   server.get('**', (req, res, next) => {
//     const cookies = cookie.parse(req.headers.cookie || '');
//     const token = cookies['auth_token'];

//     const isLoginPage = req.url.startsWith('/auth/login');
//     const isDashboardPage = req.url.startsWith('/dashboard');

//     if (isLoginPage && token) {
//       return res.redirect('/dashboard');
//     }

//     if (isDashboardPage && !token) {
//       return res.redirect('/auth/login');
//     }

//     commonEngine
//       .render({
//         bootstrap,
//         documentFilePath: indexHtml,
//         url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
//         publicPath: browserDistFolder,
//         providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
//       })
//       .then((html) => res.send(html))
//       .catch((err) => next(err));
//   });

//   return server;
// }

// function run(): void {
//   const port = process.env['PORT'] || 4000;

//   // Start up the Node server
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// run();
