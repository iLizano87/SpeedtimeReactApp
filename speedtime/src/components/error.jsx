import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <div>
      <h1>Error</h1>
      <p className="font-italic">Hay algún error</p>
      <Link to="/">
        <button className="btn btn-primary" onClick={handleLogout}>
          Principal
        </button>
      </Link>
    </div>
  );
};

export default Error;