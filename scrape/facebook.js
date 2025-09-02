import fetch from 'node-fetch';
import cheerio from 'cheerio';

export async function scrapeFacebook(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const videoData = $('meta[property="og:video"]').attr('content');
    const title = $('meta[property="og:title"]').attr('content');
    const thumbnail = $('meta[property="og:image"]').attr('content');
    
    if (!videoData) throw new Error('Video URL not found');
    
    return {
      title,
      thumbnail,
      videoQualities: {
        'SD': {
          url: videoData,
          size: null,
          container: 'mp4',
        }
      },
      audioQualities: {},
      duration: null,
      author: null,
    };
  } catch (error) {
    throw new Error('Facebook scraping failed: ' + error.message);
  }
}