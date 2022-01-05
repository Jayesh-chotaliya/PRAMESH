import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const $ = require('jquery');
$.DataTable = require('datatables.net');

class Color_listing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [],
        };
    }

    async componentDidMount() {
        $('.example').DataTable().destroy();
        setTimeout(function () {
            $('.example').DataTable({
                "pageLength": 50
            });
        }, 1000);

        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/all_color_get';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/all_color_get';
        }
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        this.setState({ color: data.data });
    }

    deletedata(e) {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/delete_color';
        }
        else {
            var del = 'http://pramesh.justcodenow.com/backend/api/delete_color';
        }

        var iColorId = e.target.id;
        const fd = new FormData();
        fd.append('iColorId', iColorId);
        if (iColorId != 'undefined') {
            const dataa = axios.post(del, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        toast.success(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        setTimeout(function () {
                            window.location.reload(1);
                        }, 1000);
                    }
                    else {
                        toast.error(res.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                })
                .catch(error => {
                })
        }
    }

    render() {
        var colors = this.state.color;
        return (
            <>
                <Sidebar />
                <div className="main-content" id="panel" >
                    <Header />
                    {/* <!-- Page content --> */}
                    <div class="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Color Listing</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Link to='/admin/color/add'>
                                                    <a className="btn myBtn4">Add</a>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table id="example" className="table align-items-center table-flush example">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Color Name</th>
                                                    <th scope="col">AddedDate</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    colors.map((cat, index) =>
                                                    (
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td>{cat.vColor}</td>
                                                            <td>{cat.dtAddedDate}</td>
                                                            <td>{cat.eStatus}</td>
                                                            <td>
                                                                <button id={`${cat.iColorId}`} class="btn myBtn2" onClick={this.deletedata}>Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    />

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </>
        );
    }

}
export default Color_listing; 