import { useState, useEffect } from "react"
import axios from "axios"
export default function PelanggaranSiswa() {
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])

    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getSiswa = () => {
        let endpoint = `http://localhost:8080/siswa`
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state siswa
                setSiswa(result.data.Siswa)
            })
            .catch(error => console.log(error))
    }

    let getPelanggaran = () => {
        let endpoint = `http://localhost:8080/pelanggaran`
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state pelanggaran
                setPelanggaran(result.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getSiswa()
        getPelanggaran()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                    style={{ background: `tan` }}>
                    <h4 className="text-white">Form Pelanggaran Siswa</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-2 my-1">
                            Pilih Siswa
                        </div>
                        <div className="col-10 my-1">
                            <select className="form-control">
                                <option value="">
                                    --- List Siswa ---
                                </option>
                                {siswa.map(item => (
                                    <option
                                        value={item.id_siswa}
                                        key={`key${item.id_siswa}`}>
                                        {item.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-2 my-1">
                            Tgl Pelanggaran
                        </div>
                        <div className="col-10 my-1">
                            <input type="date"
                                className="form-control" />
                        </div>
                        <div className="col-2 my-1">
                            Pilih Pelanggaran
                        </div>
                        <div className="col-10 my-1">
                            {pelanggaran.map(item => (
                                <div
                                    key={`ppp${item.id_pelanggaran}`} >
                                    <input className="me-1"
                                        type={"checkbox"}
                                        value={item.id_pelanggaran}
                                    />
                                    {item.nama_pelanggaran}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}