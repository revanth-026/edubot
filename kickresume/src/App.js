import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import TemplateSelector from "./pages/TemplateSelector";
import DownloadPage from "./pages/DownloadPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout headerType="landing">
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout headerType="landing">
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout headerType="landing">
              <Register />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout headerType="dashboard">
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/resume"
          element={
            <Layout headerType="dashboard">
              <ResumeBuilder />
            </Layout>
          }
        />
        <Route
          path="/templates"
          element={
            <Layout headerType="dashboard">
              <TemplateSelector />
            </Layout>
          }
        />
        <Route
          path="/download"
          element={
            <Layout headerType="dashboard">
              <DownloadPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;