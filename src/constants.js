//CSS color constants
export const PRIMARY_COLOR = '#F7C933';
export const MAIN_BACKGROUND_COLOR = '#EAEAEC';
export const SECONDARY_BACKGROUND_COLOR = '#161824';
export const INFO_CARD_BACKGROUND_COLOR = '#F9F9F9';
export const INFO_CARD_BORDER_COLOR = '#DBDBDB';
export const PAGE_CONTROLLER_BACKGROUND_COLOR = '#F9F9F9';
export const PAGE_CONTROLLER_BORDER_COLOR = '#DBDBDB';
export const MAIN_TEXT_COLOR = 'black';
export const STRONG_TEXT_COLOR = '#3F4150';
export const WEAK_TEXT_COLOR = '#9A9BA3';
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
export const SELECTED_INFOCARD_BORDER_COLOR = '#12D2FF';

export const PRIMARY_BORDER_COLOR = '#E0AE0D';
export const SECONDARY_BORDER_COLOR = '#4A5363';
export const INPUT_BORDER_COLOR = '#DBDBDB';
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
  containerHeight: '10vh',
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
  containerHeight: '77vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR,
}

export const NEW_TRIVIA_THEME = {
  containerHeight: '77vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: '#737582',
}

export const NEW_AUDIO_THEME = {
  containerHeight: '77vh',
  backgroundColor: MAIN_BACKGROUND_COLOR,
  textColor: '#737582',
}

export const NEW_VIDEO_THEME = {
  containerHeight: '77vh',
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


