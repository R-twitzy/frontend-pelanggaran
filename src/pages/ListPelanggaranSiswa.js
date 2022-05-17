import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
export default function ListPelanggaranSiswa() {
    if (!localStorage.getItem("token-pelanggaran")) {
        window.location.href = "/signin"
    }
    let [list, setList] = useState([])

    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/pelanggaran_siswa`
        // Sending data
        axios.get(endpoint, authorization)
            .then(result => {
                setList(result.data.hasil)
            })
            .catch(error => console.log(error))
    }

    let editPS = () => {

    }

    let hapusPS = () => {

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                    style={{ background: `teal` }}>
                    <h4 className="text-white">
                        List Pelanggaran Siswa
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {list.map(item => (
                            <li className="list-group-item"
                                key={`key-${item.id_pelanggaran_siswa}`}>
                                <div className="row">
                                    <div className="col-4">
                                        <small className="text-info">Nama Siswa</small>
                                        <h5>{item.siswa.nama} ({item.siswa.kelas}) </h5>
                                    </div>
                                    <br />
                                    <div className="col-2">
                                        <small className="text-info">Poin Siswa</small>
                                        <h5>{item.siswa.poin} </h5>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-info">Waktu Pelanggaran</small>
                                        <h5>{item.waktu} </h5>
                                    </div>
                                    <div className="col-2">
                                        {/** tombol Edit */}
                                        <button className="btn btn-sm btn-outline-primary mx-1"
                                            onClick={() => editPS(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>
                                        {/** tombol delete */}
                                        <button className="btn btn-sm btn-danger mx-1"
                                            onClick={() => hapusPS(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                                <small className="text-info">Detail Pelanggaran</small>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <h6 key={`idDetail${detail.id_pelanggaran}`}>
                                        - {detail.pelanggaran.nama_pelanggaran} ({detail.pelanggaran.poin})
                                    </h6>
                                ))}
                            </li>
                        ))}

                    </ul>
                    {/** Button tambah data */}
                    <button className="btn btn-success mt-3">
                        <Link to="/pelanggaran-siswa" className="text-white">
                            Tambah Pelanggaran Siswa
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}