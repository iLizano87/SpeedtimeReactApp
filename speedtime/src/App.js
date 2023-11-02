import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate 
} from "react-router-dom";
import Cookies from 'js-cookie';
import AddTrack from "./components/addtrack";
import EditTracks from "./components/edittracks";
import EditUsers from "./components/editusers";
import UpdateUserForm from "./components/updateuserform";
import Times from "./components/times";
import Register from "./components/register";
import Index from "./components/index";
import UserPanel from './components/userpanel';
import Exito from "./components/exito";
import Chrono from "./components/chrono";
import Error from "./components/error";

const BackButtonListener = ({ children }) => {
  React.useEffect(() => {
    const handleBackButton = () => {
      // Implementa el manejo de la acción de retroceso aquí
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return <>{children}</>;
};


function App() {
  const isAuthenticated = Cookies.get('user');

  return (
    <Router>
        <Routes>
          <Route path="/addtrack" element={<AddTrack/>}/>
          <Route path="/edittracks" element={<EditTracks/>}/>
          <Route path="/editusers" element={<EditUsers/>}/>
          <Route path='/times' element={<Times />} />
          <Route path='/register' element={<Register />} />          
          <Route path='/login/userpanel' element={<UserPanel />} />
          <Route path='/updateuserform' element={<UpdateUserForm />} />
          <Route path='/exito' element={<Exito />} />
          <Route path='/error' element={<Error />} />
          <Route path='/chrono' element={<Chrono />} />
          <Route path='/' element={<Index />} />
        </Routes>
    </Router>
  );
  
}

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default App;