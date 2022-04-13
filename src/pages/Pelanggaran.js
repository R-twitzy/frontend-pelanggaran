import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";
import { Modal } from "bootstrap";

export default function Pelanggaran() {
    let [pelanggaran, setPelanggaran] = useState([])
    let [message, setMessage] = useState("")

    let [idPelanggaran, setIdPelanggaran] = useState(0)
    let [namaPelanggaran, setNamaPelanggaran] = useState("")
    let [poin, setPoin] = useState(0)
    let [action, setAction] = useState("")

    let [modal, setModal] = useState(null)

    // get token from localstorage
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    // create a function to show a toast
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        // perintah utk mengisi state 'message'
        setMessage(message)

        // show the toast
        myToast.show()
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

                // call showtoast
                //showToast(`Data Pelanggaran berhasil dimuat`)
            })
            .catch(error => console.log(error))
    }

    let tambahData = () => {
        // show modal
        modal.show()

        // mengosongkan inputan form
        setIdPelanggaran(0)
        setNamaPelanggaran("")
        setPoin(0)
        setAction('insert')
    }

    let editData = item => {
        // show modal
        modal.show()

        // mengisi form sesuai data yg dipilih
        setIdPelanggaran(item.id_pelanggaran)
        setNamaPelanggaran(item.nama_pelanggaran)
        setPoin(item.poin)
        setAction('edit')
    }

    let saveData = event => {
        event.preventDefault()
        /** close modal */
        modal.hide()
        if (action === 'insert') {
            let endpoint = `http://localhost:8080/pelanggaran`
            let request = {
                nama_pelanggaran: namaPelanggaran,
                poin: poin
            }

            /** send data */
            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran */
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === 'edit') {
            let endpoint = `http://localhost:8080/pelanggaran/${idPelanggaran}`
            let request = {
                nama_pelanggaran: namaPelanggaran,
                poin: poin
            }

            /** send data untuk update pelanggaran */
            axios.put(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran */
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let hapusData = item => {
        if (window.confirm(`Data yang telah dihapus tidak dapat dikembalikan`)) {
            let endpoint = `http://localhost:8080/pelanggaran/${item.id_pelanggaran}`

            /** send data untuk menghapus */
            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran */
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        let modal = new Modal(
            document.getElementById("modalPelanggaran")
        )
        setModal(modal)
        getData()
    }, [])

    return (
        <div className="container-fluid">

            {/** Compnent Toast */}
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-info text-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/** Compnent Toast */}

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
                                    <div className="col-2">
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
                                    <div className="col-2">
                                        <small className="text-info">
                                            Point
                                        </small>
                                        <h5>{item.poin}</h5>
                                    </div>
                                    <div className="col-2 mt-3">
                                        {/** tombol Edit */}
                                        <button className="btn btn-sm btn-outline-primary mx-1"
                                            onClick={() => editData(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>
                                        {/** tombol delete */}
                                        <button className="btn btn-sm btn-danger mx-1"
                                            onClick={() => hapusData(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** Button Tambah */}
                    <button className="btn btn-md btn-outline-success mt-3"
                        onClick={() => tambahData()}>
                        <span className="fa fa-plus"></span> Tambah Data
                    </button>

                    {/** buat modal yg isinya form utk data pelanggaran */}
                    <div className="modal" id="modalPelanggaran">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-info">
                                    <h4 className="text-white">Form Pelanggaran</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => saveData(ev)}>
                                        Jenis Pelanggaran
                                        <input type="text" className="form-control mb-2" required
                                            onChange={e => setNamaPelanggaran(e.target.value)}
                                            value={namaPelanggaran} />
                                        Point
                                        <input type="number" className="form-control mb-2" required
                                            onChange={e => setPoin(e.target.value)}
                                            value={poin} />
                                        <button className="btn btn-sm btn-success mt-1">
                                            <span className="fa fa-check"></span> Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}