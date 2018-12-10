// Date Formater
const MONTHS = {
	0: 'Enero',
	1: 'Febrero',
	2: 'Marzo',
	3: 'Abril',
	4: 'Mayo',
	5: 'Junio',
	6: 'Julio',
	7: 'Agosto',
	8: 'Septiembre',
	9: 'Octubre',
	10: 'Noviembre',
	11: 'Diciembre',
}

export const fullDateString = (date) => {
	return `${date.getDate()} ${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;
};

export const hourFromDate = (date) => {
	return `${date.getHours()}:${date.getMinutes()}`;
};

export const dayAndMonthFromDate = (date) => {
	return `${date.getDate()} de ${MONTHS[date.getMonth()]}`;
};

export const youtubeTime = (time) => {
	//var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var result = /(\d+H)(\d+M)(\d+S)|(\d+M)(\d+S)|(\d+S)/.exec(time);
	if(result === null) {
		console.error('No se ha podido extraer la duración del video.\n on input:', time);
		return -1;
	}

	const duration = {
		hours: result[1] || null,
		minutes: result[2] || result[4] || '',
		seconds: result[3] || result[5] || result[6] || '',
	}

	console.log(duration)

	const hours = duration.hours ? duration.hours.slice(0, -1) + ':' : '';
	const minutes = duration.minutes ? duration.minutes.slice(0, -1) + ':' : '';
	let seconds = duration.seconds ? duration.seconds.slice(0, -1) : '';
	if (seconds.length === 1) {seconds = '0' + seconds};

	const composedDuration = hours + minutes + seconds;
	return composedDuration;
}

// Esta función extrae el ID de un video de youtube desde la URL: url soportadas:
  // http://www.youtube.com/watch?v=0zM3nApSvMg&feature=feedrec_grec_index
  // http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o
  // http://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg#t=0m10s
  // http://www.youtube.com/embed/0zM3nApSvMg?rel=0
  // http://www.youtube.com/watch?v=0zM3nApSvMg
  // http://youtu.be/0zM3nApSvMg