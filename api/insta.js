// File: /api/insta.js
import axios from 'axios';

export default async function handler(req, res) {
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
          'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
        },
        timeout: 8000  // 8-second timeout to prevent long crashes
      }
    );

    // Return only the video URL (optional)
    const videoUrl = response.data?.media?.[0]?.url || null;

    if (!videoUrl) {
      return res.status(404).json({ status: 'error', message: 'Video not found' });
    }

    res.status(200).json({ status: 'success', videoUrl });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch Instagram reel' });
  }
}
