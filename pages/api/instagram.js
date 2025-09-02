import { scrapeInstagram } from '../../scrape/instagram';

export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) return res.status(400).json({ error: 'URL is required' });
  
  try {
    const data = await scrapeInstagram(url);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}