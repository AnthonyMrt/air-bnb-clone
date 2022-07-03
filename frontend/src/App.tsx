import React from 'react';
import SearchPage from './pages/Search/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DisplayLocationPage from './pages/DisplayLocation/DisplayLocation';
import CreateLocationPage from './pages/CreateLocation/CreateLocation';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<SearchPage />} />
        </Route>
        <Route path="/locations/:id" element={<DisplayLocationPage />} />
        <Route path="/locations/create" element={<CreateLocationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
