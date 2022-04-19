import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap";
export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [idSiswa, setIdSiswa] = useState(0)
    let [nis, setNis] = useState(0)
    let [nama, setNama] = useState("")
    let [kelas, setKelas] = useState("")
    let [poin, setPoin] = useState(0)
    let [image, setImage] = useState(null)
    let [action, setAction] = useState("")

    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
    let [uploadImage, setUploadImage] = useState(true)

    /** prepare token */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/siswa`
        /** send data */
        axios.get(endpoint, authorization)
            .then(response => {
                /** simpan ke state siswa */
                setSiswa(response.data.Siswa)
            })
            .catch(error => console.log(error))
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

    let tambahSiswa = () => {
        /** open modal */
        modal.show()

        /** mengosongkan inputan */
        setIdSiswa(0)
        setNis(0)
        setNama("")
        setKelas("")
        setPoin(0)
        setImage(null)
        setAction("insert")
        setUploadImage(true)
    }

    let editSiswa = item => {
        /** open modal */
        modal.show()

        /** mengisi inputan sesuai data yg dipilih */
        setIdSiswa(item.id_siswa)
        setNis(item.nis)
        setNama(item.nama)
        setKelas(item.kelas)
        setPoin(item.poin)
        setImage(null)
        setAction("edit")
        setUploadImage(false)
    }

    let simpanSiswa = ev => {
        ev.preventDefault()

        /** close modal */
        modal.hide()

        if (action === "insert") {
            let endpoint = `http://localhost:8080/siswa`
            let request = new FormData()
            request.append('nis', nis)
            request.append('nama', nama)
            request.append('kelas', kelas)
            request.append('poin', poin)
            request.append('image', image)

            /** sending data */
            axios.post(endpoint, request, authorization)
            .then(response => {
                showToast(response.data.message)
                /** refresh newest data */
                getData()
            })
            .catch(error => console.log(error))

        } else if (action === "edit") {
            
        }
    }

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modal-siswa")
        )
        setModal(myModal)
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

            <div className="card">
                <div className="card-header"
                    style={{ background: `mediumpurple` }}>
                    <h4 className="text-white">
                        Data Siswa
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {siswa.map(item => (
                            <li className="list-group-item"
                                key={`key-${item.id_siswa}`}>
                                <div className="row">
                                    {/** section gambar */}
                                    <div className="col-4">
                                        <img src={`http://localhost:8080/image/${item.image}`}
                                            alt="gambar siswa"
                                            style={{ width: `250px`, height: `250px`, borderRadius: `50%` }} />
                                    </div>
                                    {/** section desc */}
                                    <div className="col-8">
                                        <small className="text-info">Nis</small>
                                        <h5>{item.nis}</h5>
                                        <small className="text-info">Nama</small>
                                        <h5>{item.nama}</h5>
                                        <small className="text-info">Kelas</small>
                                        <h5>{item.kelas}</h5>
                                        <small className="text-info">Poin</small>
                                        <h5>{item.poin}</h5>
                                        <small className="text-info">Options</small>
                                        <br />
                                        <button className="btn btn-outline-primary"
                                        onClick={() => editSiswa(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger m-2">
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** Button tambah data */}
                    <button className="btn btn-outline-success mt-3"
                        onClick={() => tambahSiswa()}>
                        <span className="fa fa-plus"></span> Tambah Data
                    </button>

                    {/** Modal form siswa */}
                    <div className="modal" id="modal-siswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info">
                                    <h4 className="text-white">
                                        Form Siswa
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => simpanSiswa(ev)}>
                                        {/** input NIS */}
                                        NIS
                                        <input type="number"
                                            className="form-control mb-2"
                                            required
                                            value={nis}
                                            onChange={ev => setNis(ev.target.value)} />
                                        {/** input Nama */}
                                        Nama
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={nama}
                                            onChange={ev => setNama(ev.target.value)} />
                                        {/** input Kelas */}
                                        Kelas
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={kelas}
                                            onChange={ev => setKelas(ev.target.value)} />
                                        {/** input Poin */}
                                        Poin
                                        <input type="number"
                                            className="form-control mb-2"
                                            required
                                            value={poin}
                                            onChange={ev => setPoin(ev.target.value)} />
                                        {/** input Image */}
                                        Image
                                        <input type="file"
                                            className="form-control mb-2"
                                            required = {uploadImage}
                                            accept="image/*"
                                            onChange={ev => setImage(ev.target.files[0])} />

                                        {/** button utk submit */}
                                        <button type="submit" className="btn btn-sm btn-success mt-1">
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