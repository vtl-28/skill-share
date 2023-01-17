import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import HostTalk from './components/HostTalk';
import Talk from './components/Talk';
import Host from './components/Host';
import SignUp from './components/SignUp';
import HostProfile from './components/HostProfile';


function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/hostTalk" element={<HostTalk />} />
      <Route path="/host" element={<Host />} />
      <Route path="/profile/:id" element={<HostProfile />} />

     </Routes>
    </div>
  );
}

export default App;
