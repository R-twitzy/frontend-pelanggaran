import { Link } from "react-router-dom"
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <b className="navbar-brand" href="#">BK SMK React</b>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/user" className="nav-link active" aria-current="page">
                                    User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/siswa" className="nav-link active" aria-current="page">
                                    Siswa
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pelanggaran" className="nav-link active" aria-current="page">
                                    Pelanggaran
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/list-pelanggaran-siswa" className="nav-link active" aria-current="page">
                                    List Pelanggaran Siswa
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pelanggaran-siswa" className="nav-link active" aria-current="page">
                                    Tambah Pelanggaran Siswa
                                </Link>
                            </li>
                        </ul>
                        <a class="nav-link h6" href="login.php">
                            <Link to="/signin" className="nav-link align-text-bottom text-danger" aria-current="page">
                                Logout
                            </Link>
                        </a>
                    </div>
                </div>
            </nav> <br /> <br/> <hr />
        </div>
    )
}