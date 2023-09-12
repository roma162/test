import { HashRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "scenes/Home";
import Welcome from "scenes/Welcome";
import Profile from "scenes/Profile";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import Login from "scenes/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <div>
        <HashRouter>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/home" element={isAuth ? <Home /> : <Navigate to="/"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:userId" element={isAuth ? <Profile /> : <Navigate to="/"/>} />
          </Routes>
      </HashRouter>
      </div>
      <div>  
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
