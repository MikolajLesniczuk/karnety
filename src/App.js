import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";
import SeniorGroup from "./components/SeniorGroup";
import JuniorGroup from "./components/JuniorGroup";
import WelcomePage from "./components/WelcomePage";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/*" element={<Home />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

const Home = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="junior">Grupa Młodsza</Link>
          </li>
          <li>
            <Link to="senior">Grupa Starsza</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="senior" element={<SeniorGroup />} />
        <Route path="junior" element={<JuniorGroup />} />
        <Route path="/" element={<Navigate to="senior" />} />
      </Routes>
    </div>
  );
};

export default App;
