import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function AppLayout() {
  const location = useLocation();

  // ✅ hide navbar on login page
 const hideNavbar = ["/login", "/dashboard"].includes(location.pathname);


  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Cards />
          </>
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}