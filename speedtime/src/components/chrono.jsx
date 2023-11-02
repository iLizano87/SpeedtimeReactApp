import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Chrono = () => {

    const navigate = useNavigate();
//ATRAS
    const handleGoBack = () => {
        navigate('/login/userpanel');
    };

    return (
        <div className="center">
            <h2>SOLO DISPONIBLE EN VERSIONES MOVIL</h2>
            <br />
            <br />
            <Link to="/login/userpanel" className="btn-primary" onClick={handleGoBack}>
                Volver
            </Link>
        </div>
    )
}

export default Chrono