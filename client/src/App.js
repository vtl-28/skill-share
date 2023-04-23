import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from './Pages/Dashboard/Index';
import HostTalk from './Pages/HostTalk/Index';
import Talk from './Pages/Talk/Index';
import Host from './Pages/Host/Index';
import HostProfile from './Pages/HostProfile/Index';
import Home from './Pages/Home/Index';
import 'react-calendar/dist/Calendar.css';


function App() {
  return (
    <div className="App">

     <Routes>
      <Route path="/" element={<Home />} />
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
