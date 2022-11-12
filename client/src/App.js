import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HostTalk from './components/HostTalk'

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<HostTalk />} />
     </Routes>
    </div>
  );
}

export default App;
