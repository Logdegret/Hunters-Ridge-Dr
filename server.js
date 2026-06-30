const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

loadEnv();

const publicDir = path.join(__dirname, 'public');
const port = Number(process.env.PORT) || 3000;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed.' });

    let pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = path.normalize(path.join(publicDir, pathname));
    if (!filePath.startsWith(publicDir)) return sendJson(res, 403, { error: 'Forbidden.' });

    fs.readFile(filePath, (error, data) => {
      if (error) {
        if (error.code === 'ENOENT') return sendJson(res, 404, { error: 'Not found.' });
        return sendJson(res, 500, { error: 'Unable to load the page.' });
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(filePath)] || 'application/octet-stream',
        'Cache-Control': pathname === '/index.html' ? 'no-cache' : 'public, max-age=3600'
      });
      res.end(data);
    });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: 'Something went wrong.' });
  }
});

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function loadEnv() {
  try {
    const contents = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    for (const line of contents.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

server.listen(port, () => console.log(`Hunters Ridge is ready at http://localhost:${port}`));
