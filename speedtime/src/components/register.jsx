import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './img/stlogo.png'
import './css/style.css'
import Footer from './footer';

function Register() {
  const [user, setUser] = useState({
    id: '0',
    nick: '',
    pass: '',
    mode: 'user',
    email: '',
    phone: '',
    brand: '',
    model: '',
    engine: ''
  });
  const carData = require('./car.json');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [confirmPass, setConfirmPass] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const navigate = useNavigate();

  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleBrandChange = (event) => {
    const selectedBrand = event.target.value;
    setSelectedBrand(selectedBrand);

    setSelectedModel('');
    setFormSubmitted(false);

    setUser((prevState) => ({
      ...prevState,
      brand: selectedBrand
    }));
  };

  const handleModelChange = (event) => {
    const selectedModel = event.target.value;
    setSelectedModel(selectedModel);

    setFormSubmitted(selectedBrand !== '' && selectedModel !== '');

    setUser((prevState) => ({
      ...prevState,
      model: selectedModel
    }));
  };

  const getModelsForSelectedBrand = () => {
    const selectedCar = carData.find((car) => car.brand === selectedBrand);
    return selectedCar ? selectedCar.models : [];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const isFormValid =
      Object.values(user).every((value) => value !== '') &&
      selectedBrand !== '' &&
      selectedModel !== '' &&
      user.pass === confirmPass;
  
      //Validacion de form
    if (!isFormValid) {
      alert('Por favor, complete todos los campos y asegúrese de que las contraseñas coincidan');
      return;
    }
    
    const baseUrl = 'http://192.168.1.145:9876/user';
    //Primero hace un GET - si devuelve false...
    try {
      const response = await axios.get(`${baseUrl}?email=${user.email}`);
      console.log("response", response);
      
      if (response.data === false) {
        try {
          const registerResponse = await axios.post(baseUrl, user);
          // Guardar las credenciales en el almacenamiento local
          localStorage.setItem('userData', JSON.stringify(user));
          navigate('/', { state: { registrationMessage: 'Usuario registrado correctamente' } });
        } catch (error) {
          navigate('/', { state: { registrationMessage: 'Error al registrar usuario' } });
        }
      } else {
        // YA EXISTE
        navigate('/', { state: { registrationMessage: 'El email ya está registrado' } });
      }
    } catch (error) {
      console.error(error);
      navigate('/', { state: { registrationMessage: 'Error de redirección' } });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  //boton desactivado si no estan correctas los campos
  const isButtonDisabled =
    Object.values(user).some((value) => value === '') ||
    selectedBrand === '' ||
    selectedModel === '' ||
    user.pass !== confirmPass;

  return (
    <form onSubmit={handleSubmit} className="login">
      <div className='containerReg'>
      <div className="content-register">
        <div className="boxflag">
      <img src={logo} alt="Logo" className="logo" />
      <br/>
      <input
        type="text"
        name="nick"
        placeholder="Nick"
        required="required"
        className="input-field"
        value={user.nick}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type="email"
        name="email"
        placeholder="e-Mail"
        required="required"
        className="input-field"
        value={user.email}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type="password"
        name="pass"
        placeholder="Contraseña"
        required="required"
        className="input-field"
        value={user.pass}
        onChange={handleChange}
      />
      <br />
      <br />
      <input
        type="password"
        name="confirmpass"
        placeholder="Confirma contraseña"
        required="required"
        className="input-field"
        value={confirmPass}
        onChange={handleConfirmPassChange}
      />
      <br />
      <br />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        required="required"
        className="input-field"
        value={user.phone}
        onChange={handleChange}
      />
      <br />
      <br />
      <div className="input_field">
        <select
          name="brand"
          placeholder="Marca"
          value={selectedBrand}
          onChange={handleBrandChange}
          required
        >
          <option value="">Seleccionar Marca</option>
          {carData.map((car) => (
            <option key={car.brand} value={car.brand}>
              {car.brand}
            </option>
          ))}
        </select>
        <br />
        <br />
      </div>
      <div className="input_field">
        <select
          name="model"
          placeholder="Modelo"
          value={selectedModel}
          onChange={handleModelChange}
          required
          disabled={!selectedBrand}
        >
          <option value="">Seleccionar Modelo</option>
          {getModelsForSelectedBrand().map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
      <br />
      <input
        type="text"
        name="engine"
        placeholder="Motor"
        required="required"
        className="input-field"
        value={user.engine}
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit" className="btn btn-primary btn-block btn-large" disabled={isButtonDisabled}>
        Registrarme
      </button>
      {registrationMessage && <p className="error-message">{registrationMessage}</p>}
      <br />
      <br />
      <a href="/">Ya estoy registrado</a>
      </div>
    </div>
    </div>
    </form>
  );
}

export default Register;