import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
