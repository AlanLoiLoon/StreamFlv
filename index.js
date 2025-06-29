const express = require('express');
const got = require('got');
const app = express();

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing 'url' parameter");

  try {
    const stream = got.stream(url, {
      headers: {
        'Referer': 'https://v.567440.com',
        'Origin': 'https://v.567440.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Connection': 'keep-alive',
        'Range': 'bytes=0-'
      },
      timeout: { request: 10000 }
    });

    res.setHeader('Content-Type', 'video/x-flv');

    stream.on('error', (err) => {
      console.error('Stream error:', err.message);
      res.status(500).send('Stream error: ' + err.message);
    });

    stream.pipe(res);
  } catch (err) {
    console.error('Proxy error:', err.message);
    res.status(500).send("Proxy error: " + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('FLV proxy server running on port', port);
});
