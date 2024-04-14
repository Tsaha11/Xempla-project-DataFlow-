import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.scss';
import Reports from './pages/Reports';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Reports} />
      </Routes>
    </Router>
  );
}

export default App;
