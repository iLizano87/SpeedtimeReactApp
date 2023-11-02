import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditTracks = () => {
  const [tracks, setTracks] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
      iniLat: '',
      iniLong: '',
      p1Lat: '',
      p1Long: '',
      p2Lat: '',
      p2Long:''
  });
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  //actualizar Tracks
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('http://192.168.1.145:9876/alltracks');
      setTracks(response.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  //borrar track
  const deleteTrack = async (trackId) => {
    try {
      await axios.delete(`http://192.168.1.145:9876/track/delete/${trackId}`);
      fetchTracks(); // Volver a obtener la lista de tracks después de borrar uno
    } catch (error) {
      console.error(`Error deleting track ${trackId}:`, error);
    }
  };
  
  //muestra datos
  const toggleEditForm = (trackId) => {
    setSelectedTrackId(trackId);
    setEditFormVisible(!editFormVisible);
    const track = tracks.find((track) => track.id === trackId);
    setSelectedTrack(track);
    setEditFormData({
      name: track.name,
      iniLat: track.iniLat,
      iniLong: track.iniLong,
      p1Lat: track.p1Lat,
      p1Long: track.p1Long,
      p2Lat: track.p2Lat,
      p2Long: track.p2Long,
    });
  };

  
  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const submitEditForm = async () => {
    try {
      await axios.put(`http://192.168.1.145:9876/track/${selectedTrackId}`, editFormData);
      fetchTracks(); // Volver a obtener la lista de tracks después de la edición
      setEditFormVisible(false); // Ocultar el formulario de edición después de la edición exitosa
    } catch (error) {
      console.error(`Error editing track ${selectedTrackId}:`, error);
    }
  };

  return (
    <div className='boxlist'>
      <h2>Editar Tracks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>IniLat</th>
            <th>IniLong</th>
            <th>P1Lat</th>
            <th>P1Long</th>
            <th>P2Lat</th>
            <th>P2Long</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td>{track.name}</td>
              <td>{track.iniLat}</td>
              <td>{track.iniLong}</td>
              <td>{track.p1Lat}</td>
              <td>{track.p1Long}</td>
              <td>{track.p2Lat}</td>
              <td>{track.p2Long}</td>
              <td>
                <button className="btn btn-primary btn-block btn-large" onClick={() => deleteTrack(track.id)}>Borrar</button>
                <button className="btn btn-primary btn-block btn-large" onClick={() => toggleEditForm(track.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editFormVisible && selectedTrack && (
        <div className='boxtrack'>
          <h3>Editar Track</h3>
          <form>
            <label>
              Name:
              <br/>
              <input
                type="text"
                name="name"
                value={editFormData.name || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              IniLat:
              <br/>
              <input
                type="text"
                name="iniLat"
                value={editFormData.iniLat || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              IniLong:
              <br/>
              <input
                type="text"
                name="iniLong"
                value={editFormData.iniLong || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              P1Lat:
              <br/>
              <input
                type="text"
                name="p1Lat"
                value={editFormData.p1Lat || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              P1Long:
              <br/>
              <input
                type="text"
                name="p1Long"
                value={editFormData.p1Long || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              P2Lat:
              <br/>
              <input
                type="text"
                name="p2Lat"
                value={editFormData.p2Lat || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <label>
              P2Long:
              <br/>
              <input
                type="text"
                name="p2Long"
                value={editFormData.p2Long || ""}
                onChange={handleEditFormChange}
              />
            </label>
            <br />
            <br/>
            <button type="button" className="btn-primary" onClick={submitEditForm}>
              OK
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditTracks;