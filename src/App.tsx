import React from 'react';
import './App.css';
import Navbar from './components/header/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Flowers  from './pages/flowers';

const App = () => {
  return (
    <Router>
    <div>
      <Navbar />
      {/* The Switch component enables us to render only the first matching Route */}
      <Routes>
        {/* Define your routes using the Route component */}
        <Route path="/" element={<Flowers />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
