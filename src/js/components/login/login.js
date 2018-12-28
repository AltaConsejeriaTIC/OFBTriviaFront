// Orquesta Filarmónica de Bogotá - Trivia admin.
// login.js - Loging page

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { Button } from '../../utilities/button.js';
import * as ServerServices from '../../utilities/serverServices.js';
//IMG
import LogoAlcaldia from '../../../assets/img/login/logoAlcaldia.svg';
import FooterImage from '../../../assets/img/login/footerImage.svg';

const theme = Constants.LOGIN_THEME;

//Section container
const SectionContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  overflow: hide;
`;

const LoginContainer = styled('div')`
  width: 85%;
  height: 80%;
  display: flex;
  flex-direction: row;
  background-color: white;

  div {
    position: relative;
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;

    h3 {
      margin-top: 25%;
      font-family: 'Bitter';
      font-weight: 500;
      font-size: 45px;
      color: white;
      
      @media (max-width: 1300px) {
        font-size: 25px;
      }
    }

    &:first-child {
      position: relative;
      padding: 0;
      background-color:  ${Constants.LOGIN_BACKGROUND_COLOR};

      img {
        &.logo-alcaldia {
          position: absolute;
          bottom: 23%;
          width: 22%;
          height: auto;

        }

        &:last-child {
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      }

    };

    &:last-child {
      background-color:  ${Constants.MAIN_BACKGROUND_COLOR};

      form {
        width: 100%;
        height 100%;
        padding: 0px 20%;
        display: flex;
        flex-direction: column;
        align-items: left;

        h2 {
          margin: 42% 0 15px 0;
          font-family: 'Bitter';
          font-weight: 800;
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 10px;

          input {
            height: 30px;
            border: solid 1px lightgray;
            border-radius: ${Constants.UNIVERSAL_BORDER_RADIUS};
            padding-left: 10px;
            margin-top: 5px;
          }
        }
      }
    };
  }
`;

const LoginErrorMessage = styled('p')`
  display: ${(props) => props.display ? 'block' : 'none'};
  font-size: 13px;
  color: #C53C3C;
  margin: 10px 0;
`;


class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mustNavigate: false,
      loginError: false,
      loginErrorType: 'FIELDS_EMPTY',
    };
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = event.target.value;
    const name = target.name;
    
    this.setState({
      [name]: value
    });
  };

  onLoginClick = (event) => {
    event.preventDefault()
    if(this.state.username && this.state.password){
      this.login();
    }else{
      this.setState({
        loginError: true,
        loginErrorType: 'FIELDS_EMPTY',
      });
    }
  };

  login = () => {
    const login = ServerServices.login({userName: this.state.username, password: this.state.password});
    login.then((response) => {
      if(response.status === 200) {
        this.props.onLogin();
        this.setState({mustNavigate: true});
      } else {
        this.setState({
          loginError: true,
          loginErrorType: 'WRONG_USERNAME_OR_PASSWORD',
        });
      }
    })
  }

  render() { 
    if(this.state.mustNavigate){
      return <Redirect push to='/admin/trivia'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <LoginContainer>
            <div>
              <h3>Orquesta<br/>Filarmónica<br/>de Bogotá</h3>
              <img className='logo-alcaldia' src={LogoAlcaldia} alt='logo_Alcaldia'/>
              <img src={FooterImage} alt='footer_image'/>
            </div>
            <div>
              <form>
                <h2>Iniciar sesión</h2>
                  <label >USUARIO
                  <input name='username'
                    type='text'
                    onChange={this.handleInputChange}
                    placeholder='Usuario'/>
                </label>
                <label>CONTRASEÑA
                  <input name='password'
                    type='password'
                    onChange={this.handleInputChange}
                    placeholder='Contraseña'/>
                </label>
                <Button primary onClick={this.onLoginClick}>Ingresar</Button>
                <LoginErrorMessage display={this.state.loginError ? 1 : 0}>
                  {Constants.LOGIN_ERROR_MESSAGES[this.state.loginErrorType]}
                </LoginErrorMessage>
              </form>
            </div>
          </LoginContainer>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default Login;