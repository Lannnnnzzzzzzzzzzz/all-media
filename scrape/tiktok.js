import fetch from 'node-fetch';

export async function scrapeTikTok(url) {
  try {
    const API_URL = `https://api.tikapi.io/public/video?url=${encodeURIComponent(url)}`;
    const response = await fetch(API_URL, {
      headers: {
        'X-API-KEY': process.env.TIKAPI_KEY || 'demo-key',
      },
    });
    
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    
    // TikTok usually has one video quality, but we'll structure it
    return {
      title: data.title,
      thumbnail: data.cover,
      videoQualities: {
        'HD': {
          url: data.play_url,
          size: null, // TikTok API doesn't provide size
          container: 'mp4',
        }
      },
      audioQualities: {},
      duration: data.duration,
      author: data.author,
    };
  } catch (error) {
    throw new Error('TikTok scraping failed: ' + error.message);
  }
}