const express = require('express');
const got = require('got');
const app = express();

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  try {
    const stream = got.stream(url, {
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Origin': 'https://v.567440.com',
        'Pragma': 'no-cache',
        'Referer': 'https://v.567440.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137.0.0.0 Safari/537.36',
        'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Range': 'bytes=0-'
      }
    });

    res.setHeader('Content-Type', 'video/x-flv');
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Proxy error: ' + err.message);
  }
});

app.listen(3000, () => {
  console.log('Local FLV Proxy running on http://localhost:3000');
});
