import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Pelanggaran from "./pages/Pelanggaran";
import Siswa from "./pages/siswa";

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/siswa" element={<Siswa />} />
      </Routes>
    </BrowserRouter>
  )
}