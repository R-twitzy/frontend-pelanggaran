import { useState, useEffect } from "react"
import axios from "axios"
export default function PelanggaranSiswa() {
    let [siswa, setSiswa] = useState([])
    let [pelanggaran, setPelanggaran] = useState([])
    let [selectedSiswa, setSelectedSiswa] = useState("")
    let [selectedDate, setSelectedDate] = useState("")
    let [selectedPelanggaran, setSelectedPelanggaran] = useState([])

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

    let addPelanggaran = (id_pelanggaran) => {
        // cek keberadaan id_pelanggaran di dlm selectedpelanggaran
        let temp = [...selectedPelanggaran]
        let found = temp.find(
            item => item.id_pelanggaran === id_pelanggaran
        )

        // jika ditemukan maka dihapus
        // jika tidak ketemu ditambahkan
        if (found) {
            let index = temp.findIndex(
                item => item.id_pelanggaran === id_pelanggaran
            )
            temp.splice(index, 1)
        } else {
            //memasukkan id pelanggaran yang dipilih ke selected pelanggaran
            temp.push({
                id_pelanggaran: id_pelanggaran
            })
        }
        setSelectedPelanggaran(temp)
    }

    let simpanPelanggaranSiswa = () => {
        if (window.confirm(`Are u sure bby?`)) {
            // ambil id user dari local storage
            let user = JSON.parse(localStorage.getItem(`user-pelanggaran`))
            let id = user.id_user

            let endpoint = `http://localhost:8080/pelanggaran_siswa`
            let request = {
                "waktu": selectedDate,
                "id_siswa": selectedSiswa,
                "id_user": id,
                "detail_pelanggaran_siswa": selectedPelanggaran
            }

            // sending data
            axios.post(endpoint, request, authorization)
                .then(result => {
                    alert(result.data.message)
                })
                .catch(error => console.log(error))
        }
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
                            <select
                                className="form-control"
                                onChange={ev => setSelectedSiswa(ev.target.value)}
                                value={selectedSiswa} >
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
                                className="form-control"
                                onChange={ev => setSelectedDate(ev.target.value)}
                                value={selectedDate} />
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
                                        value={item.id_pelanggarn}
                                        onClick={() => addPelanggaran(item.id_pelanggaran)}
                                    />
                                    {item.nama_pelanggaran}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-outline-success"
                        onClick={() => simpanPelanggaranSiswa()}>
                        <span className="fa fa-save me-2"></span>Simpan
                    </button>

                    {/* isi dari selected siswa: {selectedSiswa} <br />
                    isi dari selected Date: {selectedDate} <br />
                    isi dari selected pelanggaran: {selectedPelanggaran.map(item => `${item.id_pelanggaran}, `)} */}
                </div>
            </div>
        </div>
    )
}