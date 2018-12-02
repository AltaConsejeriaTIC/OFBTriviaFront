// Date Formater
const MONTHS = {
	1: 'Enero',
	2: 'Febrero',
	3: 'Marzo',
	4: 'Abril',
	5: 'Mayo',
	6: 'Junio',
	7: 'Julio',
	8: 'Agosto',
	9: 'Septiembre',
	10: 'Octubre',
	11: 'Noviembre',
	12: 'Diciembre',
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