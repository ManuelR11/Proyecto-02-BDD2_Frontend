import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import LogoX from '../Images/LogoX.png';
import Register from '../Register/register.js';

const Login = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleRegisterClick = () => {
    navigate('/Register');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post('http://18.221.157.193:3161/users/verify', {
        username,
        password,
      });

      if (response.data.success) {
        setLoggedInUser(username);
        localStorage.setItem('loggedInUser', username);
        navigate('/Home');
      } else {
        // Mostrar mensaje de error al usuario
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error al usuario
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={LogoX} alt="Logo X" className="login-logo" />
        <h2 className="login-title">Happening now</h2>
        <h3 className="login-subtitle">Join today.</h3>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <button className="register-button" onClick={handleRegisterClick}>
          ¿No tienes una cuenta? Regístrate
        </button>
      </div>
    </div>
  );
};

export default Login;