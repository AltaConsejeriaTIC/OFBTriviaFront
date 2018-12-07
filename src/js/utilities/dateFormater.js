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