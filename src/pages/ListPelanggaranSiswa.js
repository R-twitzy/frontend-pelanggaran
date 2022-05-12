import { useState, useEffect } from "react";
import axios from "axios";
export default function ListPelanggaranSiswa() {
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
            setList(result.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getData()
    }, [])
    return(
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                style={{background: `teal`}}>
                    <h4 className="text-white">
                        List Pelanggaran Siswa
                    </h4>
                </div>
                <div className="card-body">

                </div>
            </div>
        </div>
    )
}