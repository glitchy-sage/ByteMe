const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port to run on
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  // Extract the requested URL path
  let filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url);

  // Extract the file extension
  const extname = String(path.extname(filePath)).toLowerCase();

  // Define the MIME types
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml',
  };

  // Default to 'application/octet-stream' if the MIME type is not found
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  // Serve index.html for non-static files (handle SPA routing)
  if (contentType === 'application/octet-stream') {
    filePath = path.join(__dirname, 'build', 'index.html');
  }

  // Read the file and serve it
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // If file not found, serve 404 page
        fs.readFile(path.join(__dirname, 'build', '404.html'), (err, content404) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content404, 'utf-8');
        });
      } else {
        // If other error, serve a 500 server error
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Successfully serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
