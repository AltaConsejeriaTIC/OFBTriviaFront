// Server services
const BACKEND_ENDPOINT = 'http://localhost:10011/';
const END_POINTS = {
	questionsList: 'trivia/questions-list',
	audioList: 'trivia/get-audios',
	createAudio: 'trivia/upload-audio',
	videosList: 'trivia/get-videos',
}

const fetchHeaders = {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
	}
};

export const getTriviaList = async (lastId, page) => {
	const composedURL = `
		${BACKEND_ENDPOINT}		
		${END_POINTS['questionsList']}
		?
		${lastId ? 'lastId=' + lastId : ''}
		${page ? 'page=' + page : ''}`

	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};


//Audio
export const getAudioList = async () => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['audioList']}`
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const createAudio = async (songName, artistName, url) => {
	const composedBody = {
		title: songName,
	  artist: artistName,
	  url: url,
	} 
	const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createAudio']}`, {
        method: "POST",
        body: JSON.stringify(composedBody),
        headers : { 
			    'Content-Type': 'application/json',
			    'Accept': 'application/json'
				}
    }));
  return json;
};

//Video
export const getVideoList = async () => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['videosList']}`
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};