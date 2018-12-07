import google from 'googleapis';
import client from '../client.json';

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: 'AIzaSyApP5fc-yK9A6lr2Sifh_ZKV04U41NEoRg',
});

// a very simple example of getting data from a playlist
export default test = async () => {
  const res = await youtube.videos.list({
    part: 'id',
    id: 'a23KH4gVFt0',
  });
  console.log(res)
}

