import React from "react";
import { Routes, Route, Link } from "react-router";
import About from "./components/About";
import Home from "./components/Home";

export default function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </li>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </ul>
      </nav>
    </>
  );
}
