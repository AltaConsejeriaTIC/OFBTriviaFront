//CSS color constants
export const PRIMARY_COLOR = '#F7C933';
export const MAIN_BACKGROUND_COLOR = '#EAEAEC';
export const LOGIN_BACKGROUND_COLOR = '#292B3C';
export const SECONDARY_BACKGROUND_COLOR = '#161824';
export const INFO_CARD_BACKGROUND_COLOR = '#F9F9F9';
export const INFO_CARD_BORDER_COLOR = '#DBDBDB';
export const PAGE_CONTROLLER_BACKGROUND_COLOR = '#F9F9F9';
export const PAGE_CONTROLLER_BORDER_COLOR = '#DBDBDB';
export const MAIN_TEXT_COLOR = 'black';
export const STRONG_TEXT_COLOR = '#3F4150';
export const WEAK_TEXT_COLOR = '#9A9BA3';
export const TRIVIA_DETAILS_TEXT_COLOR = '#737582';
export const TRIVIA_DETAILS_STRONG_TEXT_COLOR = '#575A6D';
export const TRIVIA_DETAILS_SUPER_STRONG_TEXT_COLOR = '#3F4150';
export const NAV_COLUMN_TEXT_COLOR = '#575A6D';
export const NAV_COLUMN_STRONG_TEXT_COLOR = '#3F4150';
export const NAV_COLUMN_WEAK_TEXT_COLOR = '#888B9C';
export const NAV_SELECTED_SECTION_BACKGROUND_COLOR = '#D3E5EB';
export const NAV_SELECTED_SECTION_BORDER_COLOR = '#AADBE9';
export const NAV_SELECTED_SECTION_LEFT_BORDER_COLOR = '#05B5DF';
export const INFO_CARD_WEAK_TEXT_COLOR = '#737582';
export const INFO_CARD_STRONG_TEXT_COLOR = '#3F4150';
export const PAGE_CONTROLLER_TEXT_COLOR = '#737582';
export const PAGE_CONTROLLER_STRONG_TEXT_COLOR = '#3F4150';
export const LIST_HEADER_TEXT_COLOR = '#7C7F92';
export const UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR = '#8D91AD';
export const ERROR_TEXT_COLOR = '#C53C3C';
export const SELECTED_INFOCARD_BORDER_COLOR = '#FF4284';
export const SELECTED_ANSWER_CARD_BORDER_COLOR = '#12D2FF';
export const NO_ITEMS_AVAILABLE_TEXT_COLOR = '#838595';
export const CHECKED_ANSWER_CHECKBOX_BACKGROUND_COLOR = '#87C677';
export const CHECKED_ANSWER_CHECKBOX_BORDER_COLOR = '#70A663';
export const UNCHECKED_ANSWER_CHECKBOX_BACKGROUND_COLOR = '#FFFFFF';
export const UNCHECKED_ANSWER_CHECKBOX_BORDER_COLOR = '#CECECE';
export const BREAD_CRUMBS_TEXT_COLOR= '#575A6D';

export const PRIMARY_BUTTON_TEXT_COLOR = '#161824';
export const PRIMARY_BORDER_COLOR = '#E0AE0D';
export const SECONDARY_BORDER_COLOR = '#4A5363';
export const PUBLISH_WINNERS_BUTTON_BACKGROUND_COLOR = '#E75252';
export const PUBLISH_WINNERS_BUTTON_BORDER_COLOR = '#C53C3C';
export const DELETE_BUTTON_BACKGROUND_COLOR = '#E75252';
export const DELETE_BUTTON_BORDER_COLOR = '#C53C3C';
export const INPUT_BORDER_COLOR = '#DBDBDB';
export const WEAK_BORDER_COLOR = '#DBDBDB';
export const UNIVERSAL_BORDER_RADIUS = '4px';

export const TRIVIA_QUESTION_MAX_CHARACTERS = 140;
export const TRIVIA_ANSWER_MAX_CHARACTERS = 140;
export const AUDIO_NAME_MAX_CHARACTERS = 40;
export const VIDEO_NAME_MAX_CHARACTERS = 40;

// Styled components Themes: 
//LOGIN
export const LOGIN_THEME = {
  backgroundColor: SECONDARY_BACKGROUND_COLOR,
};
//Loader (spiner)
export const LOADER_THEME = {
  loaderFrontColor: PRIMARY_COLOR,
  loaderFrontColorDark: '#212529',
  loaderBackgroundColor: '#C7C3B7',
  sectionBackgroundColor: '#EEEDE9',
}
//HEADER
export const HEADER_THEME = {
  containerHeight: '12vh',
  backgroundColor: SECONDARY_BACKGROUND_COLOR,
}

//FOOTER
export const FOOTER_THEME = {
  containerHeight: '13vh',
  backgroundColor: SECONDARY_BACKGROUND_COLOR,
  textColor: 'white',
}

//TRIVIA
export const TRIVIA_THEME = {
  containerHeight: '75vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR,
}

export const DETAILS_TRIVIA_THEME = {
  containerHeight: '75vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  normalTextColor: TRIVIA_DETAILS_TEXT_COLOR,
  strongTextColor: TRIVIA_DETAILS_STRONG_TEXT_COLOR,
  superStrongTextColor: TRIVIA_DETAILS_SUPER_STRONG_TEXT_COLOR,
}

export const NEW_TRIVIA_THEME = {
  containerHeight: '75vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: '#737582',
}

export const NEW_AUDIO_THEME = {
  containerHeight: '75vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: '#737582',
}

export const NEW_VIDEO_THEME = {
  containerHeight: '75vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: '#737582',
}

export const NAV_COLUMN_THEME = {
  normalTextColor: NAV_COLUMN_TEXT_COLOR,
  strongTextColor: NAV_COLUMN_STRONG_TEXT_COLOR,
  weakTextColor: NAV_COLUMN_WEAK_TEXT_COLOR,
}

//CONSTANT MESSAGES:
export const LOGIN_ERROR_MESSAGES = {
  FIELDS_EMPTY: 'Los campos no pueden estar vacíos.',
  WRONG_USERNAME_OR_PASSWORD: 'El usuario o la contraseña ingresados no son correctos.',
}

export const CREATE_UPDATE_TRIVIA_ERROR_MESSAGES = {
  CONTENT_FIELD_EMPTY: 'Este campo es obligatorio.',
  ANSWER_FIELD_EMPTY: 'Este campo es obligatorio.',
  INVALID_DATE: '',
  SERVER_ERROR: 'Tenemos problemas relizando esta petición, por favor intenta más tarde.',
}

export const CREATE_UPDATE_CONTENT_ERROR_MESSAGES = {
  FIELDS_EMPTY: 'Los campos no pueden estar vacíos.',
  INVALID_URL: 'URL inválida.',
  SERVER_ERROR: 'Tenemos problemas relizando esta petición, por favor intenta más tarde.',
}

// SWAL CONTENT CONSTANTS
export const ERROR_TRIVIA_ALERT_CONTENT = {
  title: 'Error al crear trivia',
  text: 'La fecha seleccionada no es válida, recuerda que la fecha de inicio de una trivia debe ser al menos dos días después de la finalización de la trivia inmediatamente anterior.',
  showCancelButton: false,
  confirmButtonText: 'OK',
  allowOutsideClick: false,
  customClass: 'swal-custom',
}

export const SAVE_WINNERS_ALERT_CONTENT = {
  title: '¿Estás seguro de que deseas seleccionar estos ganadores?',
  text: 'Esta acción no se puede deshacer ni modificar.',
  showCancelButton: true,
  cancelButtonText: 'CANCELAR',
  confirmButtonText: 'SELECCIONAR',
  allowOutsideClick: false,
  customClass: 'swal-custom',
}

export const CONFIRM_DELETE_ACTION_ALERT_CONTENT = {
  title: '¿Estás seguro de que deseas eliminar este elemento?',
  text: 'Esta acción no se puede deshacer ni modificar.',
  showCancelButton: true,
  cancelButtonText: 'CANCELAR',
  confirmButtonText: 'ELIMINAR',
  allowOutsideClick: false,
  customClass: 'swal-custom',
}

export const ITEM_DELETE_ALERT_CONTENT = (itemType) => {
  return {
    title: 'Éxito',
    text: `El ${itemType} fue eliminado.`,
    showCancelButton: false,
    confirmButtonText: 'OK',
    customClass: 'swal-custom',
    allowOutsideClick: false,
  }
}

export const BACKEND_DEFAULT_ERROR_ALERT_CONTENT = {
  title: 'Error',
  text: 'Algo salió mal, por favor intenta nuevamente en unos minutos.',
  showCancelButton: false,
  confirmButtonText: 'OK',
  allowOutsideClick: false,
  customClass: 'swal-custom',
}