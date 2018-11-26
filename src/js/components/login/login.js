// Orquesta Filarmónica de Bogotá - Trivia admin.
// login.js - Loging page

import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
import { Button } from '../../utilities/button.js';
//IMG
import violinImage from '../../../assets/img/login/violin.svg';

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
    padding: 20px 60px;


    &:first-child {
      position: relative;
      background-color:  ${Constants.PRIMARY_COLOR};

      img {
        height: 60%;
        margin-top: 10%;
      }

      .footer {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        background-color: transparent;
        height: auto;
        bottom: 15px;
        
        h3 {
          position: relative;
          width: 100%;
          font-family: 'Bitter';
          font-weight: 800;
          font-size: 20px;
          margin-top: 70px;
          margin-bottom: 0px;

          &:after {
            position: absolute;
            content: '';
            width: 20%;
            height: 2px;
            left: 0;
            top: -10px;
            background-color: #E6B923;
          }

        }
        
        span {
          font-size: 13px;
          letter-spacing: 1px;
          width: 100%;
        }
      }

    };

    &:last-child {
      background-color:  ${Constants.MAIN_BACKGROUND_COLOR};

      form {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height 90%;
        padding: 0px 18%;
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;

        h2 {
          margin: 0 0 15px 0;
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

  componentDidMount(){
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
      this.loging();
    }else{
      this.setState({
        loginError: true,
        loginErrorType: 'FIELDS_EMPTY',
      });
    }
  };

  loging = () => {
    if(this.state.username === 'admin' && this.state.password === '1234'){
      this.props.onLogin();
      this.setState({mustNavigate: true});
    }else{
      this.setState({
        loginError: true,
        loginErrorType: 'WRONG_USERNAME_OR_PASSWORD',
      });
    }
  }

  render() { 
    if(this.state.mustNavigate){
      return <Redirect push to='/dashboard/trivia'/>
    }
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer>
          <LoginContainer>
            <div>
              <img src={violinImage} alt='violin_image'/>
              <div className='footer'>
                <h3>Orquesta Filarmónica de Bogotá</h3>
                <span>ADMINISTRADOR</span>
              </div>
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