import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import SeniorGroup from "./components/SeniorGroup";
import JuniorGroup from "./components/JuniorGroup";
import WelcomePage from "./components/WelcomePage";
import { AuthProvider, useAuth } from "../src/components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/*" element={<ProtectedRoutes />} />
            </Routes>
          </header>
        </div>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="senior" element={<SeniorGroup />} />
      <Route path="junior" element={<JuniorGroup />} />
      <Route path="/" element={<Navigate to="senior" />} />
    </Routes>
  );
};

export default App;
