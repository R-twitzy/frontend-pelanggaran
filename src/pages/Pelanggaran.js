import { useState, useEffect } from "react";
import axios from "axios";
export default function Pelanggaran() {
    let [pelanggaran, setPelanggaran] = useState([])

    // get token from localstorage
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    //create function to get data pelanggaran from backend
    let getData = () => {
        /**
         * endpoint = http://localhost:8080/pelanggaran
         * method = GET
         * request = none
         * response = array data pelanggaran
         * authorization = bearer token
         */
        let endpoint = 'http://localhost:8080/pelanggaran'
        // sending data
        axios.get(endpoint, authorization)
            .then(response => {
                // simpan di state pelanggaran
                setPelanggaran(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <div className="card m-2">
                <div className="card-header"
                    style={{ background: `cornflowerblue` }}>
                    <h4 className="text-white">
                        Daftar Jenis Pelanggaran
                    </h4>
                </div>

                <div className="card-body" style={{ background: `mintcream` }}>
                    <ul className="list-group">
                        {pelanggaran.map(item => (
                            <li className="list-group-item" style={{ background: `mintcream` }} key={`key-${item.id_pelanggaran}`}>
                                <div className="row">
                                    <div className="col-3">
                                        <small className="text-info">
                                            ID Pelanggaran
                                        </small>
                                        <h5>{item.id_pelanggaran}</h5>
                                    </div>
                                    <div className="col-6">
                                        <small className="text-info">
                                            Jenis Pelanggaran
                                        </small>
                                        <h5>{item.nama_pelanggaran}</h5>
                                    </div>
                                    <div className="col-3">
                                        <small className="text-info">
                                            Point
                                        </small>
                                        <h5>{item.poin}</h5>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}