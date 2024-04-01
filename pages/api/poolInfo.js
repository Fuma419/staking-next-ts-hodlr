// pages/api/poolInfo.js

export default async function handler(req, res) {
  // Ensure that we only respond to POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // The URL of the Koios API
  const koiosAPIUrl = 'https://api.koios.rest/api/v1/pool_info';

  // Extracting data from the request body
  const { pool_bech32_ids } = req.body;

  // Access the API key from environment variables
  const apiKey = process.env.KOIOS_API_KEY;

  try {
    // Making a POST request to the Koios API
    const apiRes = await fetch(koiosAPIUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _pool_bech32_ids: pool_bech32_ids
      }),
    });

    // If the request was successful, parse the JSON response
    if (apiRes.ok) {
      const data = await apiRes.json();
      return res.status(200).json(data);
    } else {
      // If the request failed, return the error status and message
      const error = await apiRes.text();
      return res.status(apiRes.status).json({ message: error });
    }
  } catch (error) {
    // Catch any other errors and return a 500 Server Error status
    return res.status(500).json({ message: error.message });
  }
}
