// Server services
const BACKEND_ENDPOINT = 'http://localhost:10011/';
const END_POINTS = {
	questionList: 'trivia/questions-list'
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
		${END_POINTS['questionList']}
		?
		${lastId ? 'lastId=' + lastId : ''}
		${page ? 'page=' + page : ''}`

	const json = await (await fetch(composedURL, fetchHeaders)).json();
  return json;
};