import React, { useState } from 'react';
import './register.css';
import LogoX from '../Images/LogoX.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    dateOfBirth: '',
    verified: true
  });
  const [error, setError] = useState('');

  const handleSignIn = () => {
    navigate('/Login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Formatear la fecha de nacimiento al formato esperado por la API (YYYY-MM-DD)
      const dateOfBirthFormatted = new Date(formData.dateOfBirth).toISOString().split('T')[0];

      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        date_of_birth: dateOfBirthFormatted,
        real_name: formData.fullName,
        verificado: formData.verified
      };

      const response = await axios.post('http://18.221.157.193:3161/users', userData);
      if (response.data.success) {
        // Redirigir al usuario a la página de inicio de sesión solo si el registro fue exitoso
        navigate('/Login');
      } else {
        setError('Error al crear el usuario. Inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('El usuario ya existe. Por favor, elija otro nombre de usuario.');
      } else {
        setError('Error al crear el usuario. Inténtelo de nuevo más tarde.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={LogoX} alt="Logo X" className="login-logo" />
        <h3 className="login-title">Happening now</h3>
        <h3 className="login-subtitle">Join today.</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Nombre completo:</label>
            <input type="text" id="fullName" name="fullName" placeholder="Ingrese su nombre completo" required value={formData.fullName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input type="text" id="username" name="username" placeholder="Ingrese su usuario" required value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" placeholder="Ingrese su correo electrónico" required value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" required value={formData.password} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Fecha de nacimiento:</label>
            <input type="text" id="dateOfBirth" name="dateOfBirth" placeholder="Ej. 01 de Enero de 1990" required value={formData.dateOfBirth} onChange={handleInputChange} />
          </div>
          <button type="submit" className="login-button">Crear cuenta</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="login-footer">
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
        </p>
        <p className="login-footer">
          Already have an account? <span className="login-link-container"><a href="#" className="login-link" onClick={handleSignIn}>Sign in</a></span>
        </p>

      </div>
    </div>
  );
};

export default Register;