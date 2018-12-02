// Server services

import * as Env from './../../env.js';

const BACKEND_ENDPOINT = Env.SERVICES_ENDPOINT;
const END_POINTS = {
	questionsList: 'trivia/questions-list',
	answersList: 'trivia/users-answers',
	saveWinners: 'trivia/select-winners',
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

//Trivia
export const getTriviaList = async (lastId, page) => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['questionsList']}?${lastId ? 'lastId=' + lastId : ''}${page ? 'page=' + page : ''}`
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const getAnswersList = async (questionId) => {
	const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['answersList']}?${'questionId=' + questionId}`;
	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const saveWinners = async (winnersIds, questionId) => {
	const composedBody = [];
	winnersIds.forEach((winnerId) => {
		composedBody.push({
			questionId: questionId,
			userId: winnerId
		})
	})
	const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['saveWinners']}`, {
        method: "POST",
        body: JSON.stringify(composedBody),
        headers : fetchHeaders.headers
    }));
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

