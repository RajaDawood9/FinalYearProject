import React from 'react';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './pages/Dashboard';
import AboutUs from './Components/AboutUs';

const App = () => {
  return (
    <Router>
      <Navbar />
        <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/AboutUs" Component={AboutUs} />
        </Routes>
    </Router>
  );
};

export default App;
