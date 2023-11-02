import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './img/stlogo.png';
import './css/style.css';
import Footer from './footer';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const registrationMessage = location.state && location.state.registrationMessage;


  if (localStorage.getItem('user') != null) {
    window.location.href = '/login/userpanel';
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.1.145:9876/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, pass: password })
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        // Redirigir al usuario a la página "userpanel"
        window.location.href = '/login/userpanel';
      } else {
        setErrorMessage('Credenciales no válidas');
      }
    } catch (error) {
      // Manejar errores de conexión o solicitud
      setErrorMessage('Credenciales no válidas');
    }
  };
  
  return (
    <form onSubmit={handleLogin} className="login">
      <div className="containerReg">
        <div className="boxchrono">
          <img src={logo} alt="Logo" className="logologin" />
          <br />
          <input
            type="email"
            name="u"
            placeholder="e-Mail"
            required="required"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            name="p"
            placeholder="Contraseña"
            required="required"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit" className="btn btn-primary btn-block btn-large">
            Login
          </button>
          <br />
          <br />
          <a href="/register">¿Quieres registrarte?</a>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {registrationMessage && <p className="error-message">{registrationMessage}</p>}
        </div>
      </div>
    </form>
  );
};

export default Index;