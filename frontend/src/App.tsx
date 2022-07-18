import React from 'react';
import SearchPage from './pages/Search/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DisplayLocationPage from './pages/DisplayLocation/DisplayLocation';
import CreateLocationPage from './pages/CreateLocation/CreateLocation';
import './index.css';
import TestCreateLocationPage from './pages/CreateLocation/TestCreateLocations';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/locations/:id" element={<DisplayLocationPage />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/locations/create" element={<CreateLocationPage />} />
          </Route>
          <Route path="/locations/createtest" element={<TestCreateLocationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
