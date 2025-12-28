const express = require('express');
const axios = require('axios');
const app = express();

app.get('/dl', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
    const response = await axios.post(
      'https://reelsdownloader.socialplug.io/api/instagram_reels_downloader',
      { url: url },
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

    // Filter only the URLs
    // Usually the response has a field like `url` or `video_url`
    // Adjust based on actual response structure
    const data = response.data;
    let urls = [];

    if (data && data.download_url) {
      // Single video URL
      urls.push(data.download_url);
    } else if (data && Array.isArray(data.urls)) {
      // Multiple URLs
      urls = data.urls.map(item => item.url || item.download_url).filter(Boolean);
    }

    res.json({ urls });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch URLs' });
  }
});

app.listen(3000, () => { console.log("API is running on port 3000"); });
