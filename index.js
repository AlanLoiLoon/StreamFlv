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
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: { request: 10000 }
    });

    res.setHeader('Content-Type', 'video/x-flv');
    stream.pipe(res);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('FLV proxy server running on port', port));
