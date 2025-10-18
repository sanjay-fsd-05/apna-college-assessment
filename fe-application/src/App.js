import "./App.css";
// import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Topics from "./Components/Topics";
import PrivateRoute from "./Components/RouteTypes/PrivateRoute";
import PublicRoute from "./Components/RouteTypes/PublicRoute";
import Progress from "./Components/Progress";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <PrivateRoute>
                <Topics />
              </PrivateRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <PrivateRoute>
                <Progress />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
