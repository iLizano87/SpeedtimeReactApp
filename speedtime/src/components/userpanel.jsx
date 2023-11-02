import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdateUserForm from './updateuserform';
import EditUsers from './editusers';
import EditTracks from './edittracks';
import AddTrack from './addtrack';
import MyNavbar from './navbar';
import Footer from './footer';
import { Button } from 'react-bootstrap';

const UserPanel = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('user'));
  const [updatedUserData, setUpdatedUserData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showEditUsers, setShowEditUsers] = useState(false);
  const [showEditTracks, setShowEditTracks] = useState(false);
  const [showAddTrack, setShowAddTrack] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [options, setOptions] = useState([]);
  const [isCronoEnabled, setIsCronoEnabled] = useState(false);

  const isAdmin = userData.mode === 'admin';

  useEffect(() => {
    if (!userData || !userData.nick) {
      // Redirigir al usuario de vuelta a la página de inicio de sesión
      navigate('/login');
    }
  }, [userData, navigate]);

  useEffect(() => {
    fetch('http://192.168.1.145:9876/alltracks')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (selectedId) {
      setIsCronoEnabled(true);
    } else {
      setIsCronoEnabled(false);
    }
  }, [selectedId]);

  if (!userData || !userData.nick) {
    return null;
  }

  const handleAddTrackSubmit = async (formValues) => {
    try {
      //Agregar Track
      await axios.post('http://192.168.1.145:9876/track', formValues);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSelectedId(e.target.value);
  }

  const toggleAddTrack = () => {
    setShowAddTrack(!showAddTrack);
  };

  const toggleEditUsers = () => {
    setShowEditUsers(!showEditUsers);
  };

  const toggleEditTracks = () => {
    setShowEditTracks(!showEditTracks);
  };

  const redirectToChrono = () => {
    const url = `/chrono?userId=${userData.id}&trackId=${selectedId}`;
    window.location.href = url;
  };

  if (!userData || Object.values(userData).some((value) => !value)) {
    localStorage.removeItem('userData');
    navigate('/login?error=incorrect');
    return null;
  }

  return (
    <div>
      <MyNavbar />
      <div className='boxdriver'>
        <h2>Datos de Usuario</h2>
        <p>Nick: {userData.nick}</p>
        <p>Email: {userData.email}</p>
        <p>Telefono: {userData.phone}</p>
      </div>
      <div className='boxcar'>
        <h2>Vehículo</h2>
        <p>Marca: {userData.brand}</p>
        <p>Modelo: {userData.model}</p>
        <p>Motor: {userData.engine}</p>
      </div>
      <div className='center'>
        {showUpdateForm && <UpdateUserForm userId={userData.id} />}
        <select value={selectedId} onChange={handleChange}>
          <option value="">Escoge track antes de iniciar CRONO</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
        <br/>
        <br/>
        <Button variant="info" onClick={redirectToChrono} disabled={!isCronoEnabled}>
          Crono
        </Button>
        <br/>
        <br/>
        {/* Botón "Editar usuarios" visible solo para usuarios administradores */}
        {isAdmin && (
          <Button variant="info" onClick={toggleEditUsers}>
            Editar usuarios
          </Button>
        )}
        {showEditUsers && <EditUsers />}
        <br/>
        <br/>
        {/* Botón "Editar tracks" visible solo para usuarios administradores */}
        {isAdmin && (
          <Button variant="info" onClick={toggleEditTracks}>
            Editar tracks
          </Button>
        )}
        {showEditTracks && <EditTracks />}
        <br/>
        <br/>
        {/* Botón "Add tracks" visible solo para usuarios administradores */}
        {isAdmin && (
          <Button variant="info" onClick={toggleAddTrack}>
            Agregar track
          </Button>
        )}
        {showAddTrack && <AddTrack onSubmit={handleAddTrackSubmit} />}
        <br/>
        <br/>
      </div>
      <Footer/>
    </div>
  );
};

export default UserPanel;