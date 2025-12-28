const axios = require('axios');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ status: 'error', message: 'Missing url parameter' });
  }

  try {
    const response = await axios.get('https://aiimageeditor.ai/api/app/image-to-image', {
      params: {
        page: '1',
        limit: '20',
      },
      headers: {
        authority: 'aiimageeditor.ai',
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        cookie: 'additionalAuthParams={}; __Host-next-auth.csrf-token=36b098c5aafd64cc0c4d0a6baf471c045f5807680808038544fa4f69e7ea9ead%7Cd6cb98adca653eace0982e28d999889d52314e8626b8d2435a5979d94c2231e4; ...',
        referer: 'https://aiimageeditor.ai/',
        'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 11; RMX3261) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Something went wrong', error: error.message });
  }
};
