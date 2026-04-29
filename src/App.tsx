import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cascade } from "./pages/Cascade";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cascade" element={<Cascade />} />
    </Routes>
  );
}
