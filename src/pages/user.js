import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Toast } from "bootstrap";
export default function User() {
    let [user, setUser] = useState([])
    let [idUser, setIdUser] = useState(0)
    let [namaUser, setNamaUser] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [action, setAction] = useState("")

    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
    let [changePw, setChangePw] = useState(true)

    /** prepare token */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/user`
        /** send data */
        axios.get(endpoint, authorization)
            .then(response => {
                /** simpan ke state user */
                setUser(response.data.User)
            })
            .catch(error => console.log(error))
    }

    let tambahUser = item => {
        /** open modal */
        modal.show()

        /** mengosongkan inputan */
        setIdUser(0)
        setNamaUser("")
        setUsername("")
        setPassword("")
        setAction("insert")
        setChangePw(true)
    }

    let editUser = item => {
        /** open modal */
        modal.show()

        /** mengosongkan inputan */
        setIdUser(item.id_user)
        setNamaUser(item.nama_user)
        setUsername(item.username)
        setPassword("")
        setAction("edit")
        setChangePw(false)
    }

    let simpanUser = ev => {
        ev.preventDefault()

        /** close modal */
        modal.hide()

        if (action === "insert") {
            let endpoint = `http://localhost:8080/user`
            let request = new FormData()
            request.append('nama_user', namaUser)
            request.append('username', username)
            request.append('password', password)

            /** sending data */
            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh newest data */
                    getData()
                })
                .catch(error => console.log(error))

        } else if (action === "edit") {
            let endpoint = `http://localhost:8080/user/${idUser}`
            let request = new FormData()
            request.append('nama_user', namaUser)
            request.append('username', username)

            if (changePw === true) {
                request.append('password', password)
            }

            /** sending data */
            axios.put(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh newest data */
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let hapusUser = item => {
        if (window.confirm(`Data user yang telah dihapus tidak dapat dikembalikan`)) {
            let endpoint = `http://localhost:8080/user/${item.id_user}`

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

    useEffect(() => {
        let myModal = new Modal(
            document.getElementById("modalUser")
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
                <div className="card-header bg-secondary">
                    <h4 className="text-white">List User</h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {user.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-2">
                                        <small className="text-info">
                                            ID User
                                        </small>
                                        <h5>{item.id_user}</h5>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-info">
                                            Nama User
                                        </small>
                                        <h5>{item.nama_user}</h5>
                                    </div>
                                    <div className="col-4">
                                        <small className="text-info">
                                            Username
                                        </small>
                                        <h5>{item.username}</h5>
                                    </div>
                                    <div className="col-2 mt-3">
                                        {/** tombol Edit */}
                                        <button className="btn btn-sm btn-outline-primary mx-1"
                                            onClick={() => editUser(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>
                                        {/** tombol delete */}
                                        <button className="btn btn-sm btn-danger mx-1"
                                            onClick={() => hapusUser(item)}>
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** Button Tambah */}
                    <button className="btn btn-md btn-outline-success mt-3"
                        onClick={() => tambahUser()}>
                        <span className="fa fa-plus"></span> Tambah User
                    </button>

                    {/** modal yg berisi form utk data User */}
                    <div className="modal" id="modalUser">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-info">
                                    <h4 className="text-white">
                                        Form User
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => simpanUser(ev)}>
                                        {/** input namaUser */}
                                        Nama User
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={namaUser}
                                            onChange={ev => setNamaUser(ev.target.value)} />
                                        {/** input username */}
                                        Username
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={username}
                                            onChange={ev => setUsername(ev.target.value)} />
                                        {/** input password */}
                                        password
                                        <input type="password"
                                            className={`form-control mb-2 ${changePw ? `` : `d-none`}`}
                                            required={changePw}
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)} /> <br />

                                        <button
                                            type="button"
                                            onClick={() => setChangePw(true)}
                                            className={`btn btn-sm btn-outline-secondary mt-1 ${changePw ? `d-none` : ``}`}>
                                            Click to change password
                                        </button> <br />

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