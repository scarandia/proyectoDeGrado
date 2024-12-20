import React, { useState } from 'react';
import './styles/App.css';
import Login from './componentes/Login';
import Inicio from './componentes/Inicio';
import Default from './componentes/Default';
import { Routes, Route } from "react-router-dom"
import NewClientPage from './componentes/NewClientPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Inicio />} />
        <Route path="/create" element={<NewClientPage />} />
        <Route path="*" element={<Default />} />

      </Routes>
    </>
  );
}

export default App;