const axios = require('axios');

module.exports = async (req, res) => {
  const { prompt } = req.query; // text input from user

  if (!prompt) {
    return res.status(400).json({ status: 'error', message: 'Missing prompt parameter' });
  }

  try {
    const response = await axios.post(
      'https://aiimageeditor.ai/api/app/text-to-image', // Replace if needed
      { prompt },
      {
        headers: {
          authority: 'aiimageeditor.ai',
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          cookie: 'additionalAuthParams={}; __Host-next-auth.csrf-token=36b098c5aafd64cc0c4d0a6baf471c045f5807680808038544fa4f69e7ea9ead%7Cd6cb98adca653eace0982e28d999889d52314e8626b8d2435a5979d94c2231e4; YOUR_OTHER_COOKIES_HERE', // Full cookies here
          referer: 'https://aiimageeditor.ai/',
          'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '"Android"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
        }
      }
    );

    // Filter only image URLs
    const images = response.data.data?.filter(item => item.type === 'image')?.map(item => item.url) || [];

    res.status(200).json({ status: 'success', images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Something went wrong', error: error.message });
  }
};
