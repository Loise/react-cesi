import React, { useState } from 'react';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Header from './components/Header'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);

  const propsChild = {setErrorMessage}
  return (
    <BrowserRouter>
      <Header color="white" />
      <Routes>
        <Route path="/" element={<Home {...propsChild} />} />
        <Route path="/login" element={<Login {...propsChild} />} />
      </Routes>
      <Snackbar open={errorMessage !== null} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error" variant="filled">{errorMessage}</Alert>
      </Snackbar>
    </BrowserRouter>
  );
}

