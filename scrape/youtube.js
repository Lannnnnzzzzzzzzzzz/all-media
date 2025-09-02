import ytdl from 'ytdl-core';

export async function scrapeYouTube(url) {
  try {
    const info = await ytdl.getInfo(url);
    const formats = info.formats;

    // Filter video with audio
    const videoFormats = ytdl.filterFormats(formats, 'videoandaudio');
    const audioFormats = ytdl.filterFormats(formats, 'audioonly');

    // Group video formats by quality
    const videoQualities = {};
    videoFormats.forEach(format => {
      const quality = format.qualityLabel || 'unknown';
      if (!videoQualities[quality] || videoQualities[quality].size < format.contentLength) {
        videoQualities[quality] = {
          url: format.url,
          size: format.contentLength,
          container: format.container,
        };
      }
    });

    // Group audio formats by quality (bitrate)
    const audioQualities = {};
    audioFormats.forEach(format => {
      const bitrate = format.audioBitrate || 'unknown';
      if (!audioQualities[bitrate] || audioQualities[bitrate].size < format.contentLength) {
        audioQualities[bitrate] = {
          url: format.url,
          size: format.contentLength,
          container: format.container,
        };
      }
    });

    return {
      title: info.videoDetails.title,
      thumbnail: info.videoDetails.thumbnails[0].url,
      videoQualities,
      audioQualities,
      duration: info.videoDetails.lengthSeconds,
      author: info.videoDetails.author.name,
    };
  } catch (error) {
    throw new Error('YouTube scraping failed: ' + error.message);
  }
}