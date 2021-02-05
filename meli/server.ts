import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/meli/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const http = require('http');
  (global as any).WebSocket = require('ws');
  (global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
  const https = require('https');
  const querystring = require('querystring');
  
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  
  server.set('view engine', 'html');
  server.set('views', distFolder);
  
  server.use('/api/items', (req,res) => {
    const urlObject = {q: req.query.search}; 
    const parsedQuery = querystring.stringify(urlObject);
    https.get('https://api.mercadolibre.com/sites/MLA/search?'+ parsedQuery, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const results = JSON.parse(data).results;
        const cat = JSON.parse(data).filters.find(filter => filter.id === 'category');
        const categories = cat ? cat.values.map(cat => cat.name) : [];
        const items = results.map(item => {
          return {
            id: item.id,
            title: item.title,
            price: {
              amount: item.price,
              decimals: 0,
              currency: item.currency_id
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping
          }
        });
        const response = {
          author: {
            name: 'Lucia',
            lastname: 'Julia'
          },
          categories: categories,
          items: items
        }
        res.send({data: response})
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.send({error: err})
    });
    
  });


  server.use('/api/item/:id', (req,res) => {
    const id = req.params.id;
    https.get('https://api.mercadolibre.com/items/'+ id, (resp) => {
      let data = '';
      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        const itemAPI = JSON.parse(data);
        const item = {
          id: itemAPI.id,
            title: itemAPI.title,
            price: {
              amount: itemAPI.price,
              decimals: 0,
              currency: itemAPI.currency_id
            },
            picture: itemAPI.thumbnail,
            condition: itemAPI.condition,
            free_shipping: itemAPI.shipping.free_shipping,
            sold_quantity: itemAPI.sold_quantity,
            description: ''
        }
        const response = {
          author: {
            name: 'Lucia',
            lastname: 'Julia'
          },
          item: item
        }
        https.get('https://api.mercadolibre.com/items/'+ id + '/description', (resp) => {
          let data2 = '';  
          resp.on('data', (chunk) => {
            data2 += chunk;
          });
          resp.on('end', () => {
            const descAPI = JSON.parse(data2);
            response.item.description = descAPI.plain_text;
            res.send({data: response});
          });
        })
      });
    
    }).on("error", (err) => {
      console.log("Error: " + err.message);
      res.send({error: err})
    });
  });




  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
