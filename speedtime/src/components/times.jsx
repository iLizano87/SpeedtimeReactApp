import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyNavbar from './navbar';

const Times = () => {
  const [timeList, setTimeList] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedTrackUserId, setSelectedTrackUserId] = useState(null);
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    fetch('http://192.168.1.145:9876/alltracks')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.log(error));
  };
      
  const handleGoBack = () => {
    navigate('/login/userpanel');
  };

  const handleChange = (e) => {
    setSelectedId(e.target.value);
  }

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      const times = response.data;
      const updatedTimes = await Promise.all(
        times.map(async (time) => {
          const userResponse = await axios.get(`http://192.168.1.145:9876/user/${time.idUser}`);
          const { nick, brand, model, engine } = userResponse.data;
          const trackResponse = await axios.get(`http://192.168.1.145:9876/trackjson/${time.idTrack}`);
          const name = trackResponse.data.name;
          return { ...time, nick, brand, model, engine, name };
        })
      );
      // Ordenar los tiempos de menor a mayor
      updatedTimes.sort((a, b) => a.time - b.time);
      setTimeList(updatedTimes);
    } catch (error) {
      console.error('Error al obtener los datos de tiempo:', error);
    }
  };

  // Función auxiliar para convertir los milisegundos a formato de tiempo (minutos:segundos.milisegundos)
  const convertTimeFormat = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');
    return `${minutes}:${seconds.toString().padStart(2, '0')}.${millisecondsPart}`;
  };

  const handleUserTrackButtonClick = async () => {
    try {
      // Realizar la petición GET para el botón timesusertrack
      await axios.get(`http://192.168.1.145:9876/timesusertrack/${selectedTrackUserId}/${userId}`);
      // Actualizar los datos de tiempo después de la solicitud
      fetchData(`http://192.168.1.145:9876/timesusertrack/${selectedTrackUserId}/${userId}`);
    } catch (error) {
      console.error('Error en la petición timesusertrack:', error);
    }
  };

  const handleTrackButtonClick = async () => {
    try {
      // Realizar la petición GET para el botón timestrack
      await axios.get(`http://192.168.1.145:9876/timestrack/${selectedId}`);
      // Actualizar los datos de tiempo después de la solicitud
      fetchData(`http://192.168.1.145:9876/timestrack/${selectedId}`);
    } catch (error) {
      console.error('Error en la petición timestrack:', error);
    }
  };


  const handleUserButtonClick = async () => {
    try {
      // Realizar la petición GET para el botón timesuser
      await axios.get(`http://192.168.1.145:9876/timesuser/${userId}`);
      // Actualizar los datos de tiempo después de la solicitud
      fetchData(`http://192.168.1.145:9876/timesuser/${userId}`);
    } catch (error) {
      console.error('Error en la petición timesuser:', error);
    }
  };

  return (
    <div>
      <MyNavbar />
      {timeList.length === 0 ? (
        <p className='pinfo'>No hay elementos que mostrar, haga una selección válida.</p>
      ) : (
        <Table>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              {/* <th>ID Usuario</th> */}
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Motor</th>
              <th>Circuito</th>
              <th>P1</th>
              <th>P2</th>
              <th>Tiempo</th>
              <th>Velocidad</th>
              <th>Fecha/hora</th>
            </tr>
          </thead>
          <tbody>
            {timeList.map((time) => (
              // Agregar una condición para evitar mostrar los tiempos con valor 0
              time.time !== 0 && (
                <tr key={time.id}>
                  {/* <td>{time.id}</td> */}
                  {/* <td>{time.idUser}</td> */}
                  <td>{time.nick}</td>
                  <td>{time.brand}</td>
                  <td>{time.model}</td>
                  <td>{time.engine}</td>
                  <td>{time.name}</td>
                  <td>{convertTimeFormat(time.p1time)}</td> {/* Llamar a la función convertTimeFormat */}
                  <td>{convertTimeFormat(time.p2time)}</td> {/* Llamar a la función convertTimeFormat */}
                  <td>{convertTimeFormat(time.time)}</td> {/* Llamar a la función convertTimeFormat */}
                  <td>{time.kmh}</td>
                  <td>{time.date}</td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      )}
      <div className='center'>
        <Button variant='info' onClick={handleUserTrackButtonClick}>Mis tiempos en:</Button>
        <br/>
        <select value={selectedTrackUserId} onChange={(e) => setSelectedTrackUserId(e.target.value)}>
          <option value="">Seleccionar Circuito</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
        <br />
        <br />
        <Button variant='info' onClick={handleTrackButtonClick}>Ranking en:</Button>
        <br/>
        <select value={selectedId} onChange={handleChange}>
          <option value="">Seleccionar Circuito</option>
          {options.map(option => (
            <option key={option.id} value={option.id}>{option.name}</option>
          ))}
        </select>
        <br />
        <br />
        <Button variant='info' onClick={handleUserButtonClick}>Mis mejores tiempos</Button>
        <br/>
        <br/>
        <Link to="/login/userpanel" className="btn-primary" onClick={handleGoBack}>
          Volver
        </Link>
      </div>
    </div>
  );
};

export default Times;