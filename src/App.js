import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "./App.css";
import SeniorGroup from "./components/SeniorGroup";
import JuniorGroup from "./components/JuniorGroup";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li>
                <Link to="/junior">Grupa Młodsza</Link>
              </li>
              <li>
                <Link to="/senior">Grupa Starsza</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/senior" element={<SeniorGroup />} />
            <Route path="/junior" element={<JuniorGroup />} />
            <Route path="/" element={<SeniorGroup />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
