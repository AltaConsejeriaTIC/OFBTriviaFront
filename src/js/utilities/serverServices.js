// Server services

import * as Env from './../../env.js';

const BACKEND_ENDPOINT = Env.SERVICES_ENDPOINT;
const END_POINTS = {
	questionsList: 'trivia/questions-list',
	audioList: 'trivia/get-audios',
	createAudio: 'trivia/upload-audio',
	videosList: 'trivia/get-videos',
	createVideo: 'trivia/upload-video',
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
export const createAudio = async (title, artist, url, id) => {
	const composedBody = {
		title,
		artist,
		url,
		id
	};
	const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createAudio']}`, {
        method: "POST",
        body: JSON.stringify(composedBody),
        headers : fetchHeaders.headers
    }));
  return json;
};

export const getAudioList = async () => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['audioList']}`
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

//Video
export const createVideo = async (title, url, id) => {
	const composedBody = {
		title,
		url,
		id
	};
	console.log(composedBody)
	const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createVideo']}`, {
        method: "POST",
        body: JSON.stringify(composedBody),
        headers : fetchHeaders.headers
    }));
  return json;
};


export const getVideoList = async () => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['videosList']}`
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

