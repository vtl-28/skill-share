import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import HostTalk from './components/HostTalk';
import Talk from './components/Talk';
import Host from './components/Host';
import SignUp from './components/SignUp';
import HostProfile from './components/HostProfile';
import Home from './components/Home';
import 'react-calendar/dist/Calendar.css';
import ReactDependentScript from 'react-dependent-script';


function App() {
  return (
    <div className="App">
    <ReactDependentScript
  scripts={[`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_KEY}&libraries=places`]}
>
 
</ReactDependentScript>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hostTalk" element={<HostTalk />} />
      <Route path="/host/:id" element={<Host />} />
      <Route path="/profile/:id" element={<HostProfile />} />
      <Route path="/talk/:id" element={<Talk />} />

     </Routes>
    </div>
  );
}

export default App;
