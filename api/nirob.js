const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // to parse JSON body

app.get('/dl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
    const response = await axios.post(
      'https://reelsdownloader.socialplug.io/api/instagram_reels_downloader',
      { url },
      {
        headers: {
          'authority': 'reelsdownloader.socialplug.io',
          'accept': '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          'origin': 'https://www.socialplug.io',
          'referer': 'https://www.socialplug.io/',
          'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
        }
      }
    );

    // Send only necessary data if you want, e.g., video URL
    res.json(response.data);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch Instagram reel' });
  }
});

app.listen(3000, () => {
  console.log('API is running on port 3000');
});
