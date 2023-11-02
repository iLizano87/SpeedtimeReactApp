import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyNavbar from './navbar';
import axios from 'axios';

const UpdateUserForm = () => {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [phone, setPhone] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [engine, setEngine] = useState('');
  const [error, setError] = useState('');

  const userData = {
    nick,
    email,
    pass,
    phone,
    brand,
    model,
    engine
  };

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleGoBack = () => {
    navigate('/login/userpanel');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pass !== confirmpass) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const baseUrl = 'http://192.168.1.145:9876/user';
    //Primero hace un GET - si devuelve true...
  try {
    const responseGet = await axios.get(baseUrl, {
      params: {
        email: userData.email
      }
    });
    console.log("response", responseGet.data);

    if (responseGet.data===true) {
      //Mensaje de error
      setError('Email existente en base de datos');
      return;
    }
    //Si responseGet es false:

      try {
        const response = await fetch(`http://192.168.1.145:9876/user/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData),
        });
        console.log(response);
        if (response.ok) {
          const updatedUser = await response.json();
          console.log(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          navigate('/login/userpanel');
        } else {
          setError('Ocurrió un error al modificar el usuario');
        }
      } catch (error) {
        setError(error);
      }
    } catch {
      setError('Ocurrió un error al modificar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <MyNavbar />
      <div className='boxdriver'>
        <h2>Datos de Usuario</h2>
        <input
          type="text"
          name="nick"
          placeholder={user.nick}
          className="input-field"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder={user.email}
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="pass"
          placeholder="Contraseña"
          className="input-field"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          name="confirmpass"
          placeholder="Confirme contraseña"
          className="input-field"
          value={confirmpass}
          onChange={(e) => setConfirmpass(e.target.value)}
        />
        <br />
        <br />
        <input
          type="phone"
          name="phone"
          placeholder={user.phone}
          className="input-field"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='boxcar'>
        <h2>Vehículo</h2>
        <input
          type="text"
          name="brand"
          placeholder={user.brand}
          className="input-field"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="model"
          placeholder={user.model}
          className="input-field"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          name="engine"
          placeholder={user.engine}
          className="input-field"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
        />
        <br/>
        {error && <p className="error-message">{error}</p>}
        <br />
      </div>
      <div className='center'>
        <button type="submit" className="btn-primary">
          Modificar
        </button>
      </div>
      <div className='center'>
        <Link to="/login/userpanel" className="btn-primary" onClick={handleGoBack}>
          Volver
        </Link>
      </div>
    </form>
  );
};

export default UpdateUserForm;
