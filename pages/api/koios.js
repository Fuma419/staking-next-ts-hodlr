// pages/api/koios.js

import { KoiosProvider } from '@meshsdk/core';

export default async function handler(req, res) {
    const address = req.query.address;
    const apiKey = process.env.KOIOS_API_KEY;

    try {
      const koiosProvider = new KoiosProvider('api', apiKey);
      console.log(koiosProvider);

      const data = await koiosProvider.fetchAccountInfo(address);
      
      console.log(data);

      // Assuming the data fetched directly can be returned as a JSON response.
      res.status(200).json(data);
    } catch (error) {
      console.error(error); // It's often useful to log the error for server-side debugging.
      res.status(500).json({ message: error.message });
    }
}
