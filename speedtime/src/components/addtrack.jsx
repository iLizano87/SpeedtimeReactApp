import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddTrack = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    iniLat: '',
    iniLong: '',
    p1Lat: '',
    p1Long: '',
    p2Lat: '',
    p2Long:''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://192.168.1.145:9876/track', formValues);
      alert('Track agregado correctamente'); // Muestra un mensaje emergente de éxito
    } catch (error) {
      console.error(error);
    }
    setFormValues({
      name: '',
      iniLat: '',
      iniLong: '',
      p1Lat: '',
      p1Long: '',
      p2Lat: '',
      p2Long:''
    });
  };

  //Comprobacion de campos
  const isFormValid = () => {
    return formValues.name && formValues.iniLat && formValues.iniLong;
  };

  return (
    <div className='boxtrack'>
      <h2>Agregar Track</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br/>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          IniLat:
          <br/>
          <input
            type="number"
            name="iniLat"
            value={formValues.iniLat}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          IniLong:
          <br/>
          <input
            type="number"
            name="iniLong"
            value={formValues.iniLong}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          P1Lat:
          <br/>
          <input
            type="number"
            name="p1Lat"
            value={formValues.p1Lat}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          P1Long:
          <br/>
          <input
            type="number"
            name="p1Long"
            value={formValues.p1Long}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          P2Lat:
          <br/>
          <input
            type="number"
            name="p2Lat"
            value={formValues.p2Lat}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          P2Long:
          <br/>
          <input
            type="number"
            name="p2Long"
            value={formValues.p2Long}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <Button variant="primary" type="submit" disabled={!isFormValid()}>
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default AddTrack;
