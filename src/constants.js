//CSS color constants
export const PRIMARY_COLOR = '#F7C933';
export const MAIN_BACKGROUND_COLOR = '#EAEAEC';
export const SECONDARY_BACKGROUND_COLOR = '#161824';
//CSS text color constants
export const MAIN_TEXT_COLOR = 'black';
export const STRONG_TEXT_COLOR = '#3F4150';
export const WEAK_TEXT_COLOR = '#9A9BA3';
export const UNDEREMPHASIZE_FOOTER_HEADER_TEXT_COLOR = '#8D91AD';
export const ERROR_TEXT_COLOR = '#C53C3C';

export const UNIVERSAL_BORDER_RADIUS = '4px';

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

//CONSTANT MESSAGES:
export const LOGIN_ERROR_MESSAGES = {
  FIELDS_EMPTY: 'Los campos no pueden estar vacíos.',
  WRONG_USERNAME_OR_PASSWORD: 'El usuario o la contraseña ingresados no son correctos.',
}


