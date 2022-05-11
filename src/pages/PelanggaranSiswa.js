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
            setSiswa(result.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getSiswa()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                    style={{ background: `tan` }}>
                    <h4>Form Pelanggaran Siswa</h4>
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
                            </select>
                        </div>
                        <div className="col-2 my-1">
                            Tgl Pelanggaran
                        </div>
                        <div className="col-10 my-1">
                            <input type="date" 
                            className="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}