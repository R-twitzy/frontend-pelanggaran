import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Pelanggaran from "./pages/Pelanggaran";
import Siswa from "./pages/siswa";
import User from "./pages/user";
import PelanggaranSiswa from "./pages/PelanggaranSiswa";
import ListPelanggaranSiswa from "./pages/ListPelanggaranSiswa";
import Navbar from "./component/navbar";
import Logout from "./component/logout";

export default function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/pelanggaran" element={<Pelanggaran />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/user" element={<User />} />
        <Route path="/pelanggaran-siswa" element={<PelanggaranSiswa />} />
        <Route path="/list-pelanggaran-siswa" element={<ListPelanggaranSiswa />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  )
}