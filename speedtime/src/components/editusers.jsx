import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.145:9876/allusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://192.168.1.145:9876/user/delete/${userId}`);
      fetchUsers(); // Volver a obtener la lista de usuarios después de borrar uno
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  const updateUser = async (userId) => {
    const userData = {
      mode: 'admin'
    };

    try {
      const response = await axios.put(`http://192.168.1.145:9876/user/${userId}`, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('User updated:', response.data);
      fetchUsers(); // Volver a obtener la lista de usuarios después de actualizar uno
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
    }
  };

  return (
    <div className='boxlist'>
      <h2>Editar Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Nick</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Motor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nick}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.brand}</td>
              <td>{user.model}</td>
              <td>{user.engine}</td>
              <td>
              {user.mode !== 'admin' && (
                  <>
                    <button className="btn btn-primary btn-block btn-large" onClick={() => deleteUser(user.id)}>Borrar</button>
                    <button className="btn btn-primary btn-block btn-large" onClick={() => updateUser(user.id)}>Admin</button>
                  </>
                )}
                {user.mode === 'admin' && (
                  <>
                    <p>ADMINISTRADOR</p>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditUsers;