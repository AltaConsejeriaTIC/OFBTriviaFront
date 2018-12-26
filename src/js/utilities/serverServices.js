// Server services

import * as Env from './../../env.js';

const BACKEND_ENDPOINT = Env.SERVICES_ENDPOINT;
const END_POINTS = {
  login: 'trivia/login',
  questionsList: 'trivia/questions-list',
  createQuestion: 'trivia/upload-question',
  getQuestionById: 'trivia/get-question',
  answersList: 'trivia/users-answers',
  saveWinners: 'trivia/select-winners',
  audioList: 'trivia/get-audios',
  createAudio: 'trivia/upload-audio',
  videosList: 'trivia/get-videos',
  youtubeData: 'trivia/get-video-data',
  createVideo: 'trivia/upload-video',
  getUserData: 'trivia/get-user',
  send: 'trivia/send'

};

const fetchHeaders = {
  headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    }
};

//Login

export const login = async (credentials) => {
  const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['login']}`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers : fetchHeaders.headers
  }));
  return json;
}

//Trivia
export const getTriviaList = async (lastId, page) => {
  const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['questionsList']}?${lastId ? 'lastId=' + lastId : ''}${page ? 'page=' + page : ''}`
  const list = await fetch(composedURL, fetchHeaders);
  const body = await list.json()
  const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const getQuestionById = async (id) => {
  const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['getQuestionById']}?id=${id}`
  const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const deleteTrivia = async (id) => {
  const composedBody = {
    id,
    'active': false,
  };
  const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createQuestion']}`, {
    method: "POST",
    body: JSON.stringify(composedBody),
    headers : fetchHeaders.headers
  }));
  return json;
};

export const getAnswersList = async (questionId) => {
  const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['answersList']}?${'questionId=' + questionId}`;
  const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

export const createQuestion = async (questionObject, id) => {
  if (id) {questionObject.id = id};
  const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createQuestion']}`, {
    method: "POST",
    body: JSON.stringify(questionObject),
    headers : fetchHeaders.headers
  })).json();
  return json;
}

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

export const deleteAudio = async (id) => {
  const composedBody = {
    id,
    'active': false,
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
export const createVideo = async (title, channel, url, thumbnail, time, id) => {
  const composedBody = {
    title,
    channel,
    url,
    thumbnail,
    time,
    id
  };
  const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['createVideo']}`, {
    method: "POST",
    body: JSON.stringify(composedBody),
    headers : fetchHeaders.headers
  }));
  return json;
};

export const deleteVideo = async (id) => {
  const composedBody = {
    id,
    'active': false,
  };
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

export const getYoutubeData = async (url) => {
  const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['youtubeData']}?url=${url}`
  const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};

//USERS

export const getUserData = async (userId) => {
  const composedURL = `${BACKEND_ENDPOINT}${END_POINTS['getUserData']}?id=${userId}`
  const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};


export const sendPush = async (questionObject) => {
  const json = await (await fetch(`${BACKEND_ENDPOINT}${END_POINTS['send']}`, {
    method: "POST",
    body: JSON.stringify({
      "title": "Se ha creado una nueva trivia en la aplicación",
      "body": questionObject.content
    }),
    headers : fetchHeaders.headers
  }));
  return json;
};
