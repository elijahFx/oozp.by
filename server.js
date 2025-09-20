const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');

// Load environment variables
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

// Function to find an available port
const findAvailablePort = (startPort) => {
  return new Promise((resolve, reject) => {
    const server = require('http').createServer();
    
    server.listen(startPort, (err) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          // Try next port
          findAvailablePort(startPort + 1).then(resolve).catch(reject);
        } else {
          reject(err);
        }
      } else {
        server.once('close', () => {
          resolve(startPort);
        });
        server.close();
      }
    });
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
  // Find an available port
  const availablePort = await findAvailablePort(port);
  
  if (availablePort !== port) {
    console.log(`⚠️  Port ${port} is already in use. Using port ${availablePort} instead.`);
  }

  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Handle static files
      if (pathname.startsWith('/_next/static/') || 
          pathname.startsWith('/favicon') ||
          pathname.startsWith('/images/') ||
          pathname.startsWith('/public/')) {
        await handle(req, res, parsedUrl);
        return;
      }

      // Handle API routes
      if (pathname.startsWith('/api/')) {
        await handle(req, res, parsedUrl);
        return;
      }

      // Handle all other routes
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  })
  .listen(availablePort, hostname, () => {
    console.log(`> Ready on http://${hostname}:${availablePort}`);
    console.log(`> Environment: ${process.env.NODE_ENV}`);
    console.log(`> Process ID: ${process.pid}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


