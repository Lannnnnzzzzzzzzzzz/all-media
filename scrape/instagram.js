import fetch from 'node-fetch';

export async function scrapeInstagram(url) {
  try {
    const API_URL = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;
    const response = await fetch(API_URL);
    const data = await response.json();
    
    return {
      title: data.title,
      thumbnail: data.thumbnail_url,
      videoQualities: {
        'SD': {
          url: null, // Instagram doesn't provide direct download
          size: null,
          container: 'mp4',
        }
      },
      audioQualities: {},
      duration: null,
      author: data.author_name,
    };
  } catch (error) {
    throw new Error('Instagram scraping failed: ' + error.message);
  }
}