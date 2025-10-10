const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Load environment variables
require('dotenv').config();

const dev = false;
const hostname = 'localhost'; // Правильный формат - by3020.hb.by
const port = 3000;

// Функция для поиска свободного порта на УКАЗАННОМ hostname
const findAvailablePort = (startPort, host) => {
  return new Promise((resolve, reject) => {
    const testServer = require('http').createServer();
    
    testServer.listen(startPort, host, (err) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${startPort} on ${host} is busy, trying ${startPort + 1}...`);
          findAvailablePort(startPort + 1, host).then(resolve).catch(reject);
        } else {
          reject(err);
        }
      } else {
        testServer.once('close', () => {
          resolve(startPort);
        });
        testServer.close();
      }
    });
    
    testServer.on('error', reject);
  });
};

// Create Next.js app
const app = next({ 
  dev, 
  hostname, 
  port,
  dir: __dirname 
});

const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Пытаемся слушать на указанном порту и hostname
  server.listen(port, hostname, (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.log(`Port ${port} on ${hostname} is busy, trying ${port + 1}...`);
      server.listen(port + 1, hostname);
    } else if (err) {
      console.error('Server error:', err);
      process.exit(1);
    } else {
      console.log(`> Ready on http://${hostname}:${port}`);
    }
  });
});