import fetch from 'node-fetch';

export async function scrapeSpotify(url) {
  try {
    const trackId = url.split('/track/')[1]?.split('?')[0];
    if (!trackId) throw new Error('Invalid Spotify URL');
    
    const API_URL = `https://open.spotify.com/oembed?url=${url}&format=json`;
    const response = await fetch(API_URL);
    const data = await response.json();
    
    return {
      title: data.title,
      thumbnail: data.thumbnail_url,
      videoQualities: {},
      audioQualities: {
        'Stream': {
          url: `https://open.spotify.com/track/${trackId}`,
          size: null,
          container: 'mp3',
        }
      },
      duration: null,
      author: data.author_name,
    };
  } catch (error) {
    throw new Error('Spotify scraping failed: ' + error.message);
  }
}