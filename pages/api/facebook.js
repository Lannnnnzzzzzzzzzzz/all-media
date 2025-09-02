import { scrapeFacebook } from '../../scrape/facebook';

export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ error: 'URL is required' });
  
  try {
    const data = await scrapeFacebook(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}