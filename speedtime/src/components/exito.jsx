import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Exito = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get("userId");
  const userData = location.state.userData;

  const handleRedirect = () => {
    navigate(`/login/userpanel/`);
  };

  return (
    <div>
      <h1>Exito</h1>
      <p className="font-italic">Operación confirmada</p>
      <button onClick={handleRedirect}>Volver</button>
    </div>
  );
};

export default Exito;