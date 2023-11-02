import React ,{useState} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from './img/stlogo.png'

function MyNavbar() {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const userData = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const redirectToUpdateUserForm = () => {
        const url = `/updateuserform`;
        navigate(url);
      };
  
    const redirectToTimes = () => {
      const url = `/times?userId=${userData.id}&selectedId=${selectedId}`;
      navigate(url, { state: { userData } });
    };
  
    const toggleUpdateForm = () => {
      setShowUpdateForm(!showUpdateForm);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('user');
      navigate('/');
    };
  
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <img src={logo} alt="Logo" className="logo" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown.Item onClick={redirectToUpdateUserForm} style={{ paddingTop: '10px' ,paddingLeft: '10px', color: '#ffffff' }}>Actualizar mis datos</NavDropdown.Item>
            <NavDropdown.Item onClick={redirectToTimes} style={{ paddingTop: '10px' ,paddingLeft: '10px', color: '#ffffff' }}>Ver tiempos</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout} style={{ paddingTop: '10px' ,paddingLeft: '10px', color: '#ffffff' }}>Cerrar sesión</NavDropdown.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };

  export default MyNavbar;