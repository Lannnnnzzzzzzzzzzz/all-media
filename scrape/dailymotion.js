import fetch from 'node-fetch';

export async function scrapeDailymotion(url) {
  try {
    const videoId = url.split('/video/')[1]?.split('_')[0];
    if (!videoId) throw new Error('Invalid Dailymotion URL');
    
    const API_URL = `https://api.dailymotion.com/video/${videoId}?fields=title,thumbnail_url,duration,owner.screenname`;
    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (data.error) throw new Error(data.error.message);
    
    // Get download URLs from video page (multiple qualities)
    const pageResponse = await fetch(url);
    const html = await pageResponse.text();
    
    // Extract qualities
    const qualities = {};
    const regex = /"stream_h264_(hd|hq|sd|ld)_url":"(.*?)"/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      const quality = match[1].toUpperCase();
      const url = match[2].replace(/\\\//g, '/');
      qualities[quality] = {
        url,
        size: null,
        container: 'mp4',
      };
    }
    
    // If no qualities found, try fallback
    if (Object.keys(qualities).length === 0) {
      const fallbackRegex = /"stream_h264_url":"(.*?)"/;
      const fallbackMatch = html.match(fallbackRegex);
      if (fallbackMatch) {
        qualities['SD'] = {
          url: fallbackMatch[1].replace(/\\\//g, '/'),
          size: null,
          container: 'mp4',
        };
      }
    }
    
    return {
      title: data.title,
      thumbnail: data.thumbnail_url,
      videoQualities: qualities,
      audioQualities: {},
      duration: data.duration,
      author: data['owner.screenname'],
    };
  } catch (error) {
    throw new Error('Dailymotion scraping failed: ' + error.message);
  }
}