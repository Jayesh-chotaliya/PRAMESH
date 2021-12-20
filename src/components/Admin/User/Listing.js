
import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const  $ = require('jquery');
$.DataTable = require('datatables.net');



class Listing extends React.Component 
{
    constructor(props) {
        super(props);
        this.state = {
            userdata: [],
        };
    }
   
    async componentDidMount() 
    {
    
        $('.example').DataTable().destroy();
        setTimeout(function () {
            $('.example').DataTable({
                "pageLength": 50
            });
        }, 1000);

        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') 
        { 
            var url = 'http://localhost/pramesh/backend/api/all_user_get';
        }
        else 
        {
            var url = 'http://pramesh.justcodenow.com/backend/api/all_user_get';
        }
        const response = await fetch(url);
        const data = await response.json();
        this.setState({userdata: data.data });
        // $('.example').DataTable({
        //     "pageLength": 50
        // });
        
    }

    deletedata(e) 
    {
        var answer = window.location.href;
        const answer_array = answer.split('/');
        if (answer_array[2] == 'localhost:3000') {
            var del = 'http://localhost/pramesh/backend/api/delete_user';
        }
        else {
            var del = 'http://pramesh.justcodenow.com/backend/api/delete_user';
        }

        var iUserId = e.target.id;
        const fd = new FormData();
        fd.append('iUserId', iUserId);
        if (iUserId) {
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
        

        var user_data = this.state.userdata;
        
        return(
            <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div class="container-fluid">
                    <div className="row">
                    <div className="col-xl-12 col-md-12 col-sm-12">
                        <div className="card">
                        <div className="card-header border-0">
                            <div className="row align-items-center">
                            <div className="col">
                                <h3 className="mb-0">Page visits</h3>
                            </div>
                            <div className="col text-right">
                                <Link to="/admin/listing/useradd">
                                    <a className="btn myBtn4">Add</a>
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            {/* <!-- Projects table --> */}
                            <table id="example" className="table align-items-center table-flush example">
                            <thead className="thead-light">
                                <tr>
                                <th scope="col">Id</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Email</th>
                                <th scope="col">AddedDate</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                user_data.map((user, index) =>
                                    (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <td>{user.vFirstName}</td>
                                            <td>{user.vLastName}</td>
                                            <td>{user.vEmail}</td>
                                            <td>{user.dtAddedDate}</td>
                                            <td>{user.eStatus}</td>
                                            <td>
                                                <Link to={`/admin/user/edit/${user.iUserId}`}>
                                                <a><button className="btn myBtn3">Edit</button>
                                                </a>&nbsp;&nbsp;&nbsp;
                                                </Link>
                                               

                                            <button id={`${user.iUserId}`} class="btn myBtn2" onClick={this.deletedata}>Delete</button>
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
        )
    }
}

export default Listing;

