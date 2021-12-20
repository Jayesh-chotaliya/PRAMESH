import React, { useState, useEffect } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class Productlisting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
        };
    }

    async componentDidMount() {
        $(".example").DataTable().destroy();
        setTimeout(function () {
            $(".example").DataTable({
                pageLength: 50,
            });
        }, 1000);

        var answer = window.location.href;
        const answer_array = answer.split("/");
        if (answer_array[2] == "localhost:3000") {
            var url = "http://localhost/pramesh/backend/api/all_product";
        } else {
            var url = "http://pramesh.justcodenow.com/backend/api/all_product";
        }

        const response = await fetch(url);
        const data = await response.json();

        this.setState({ product: data.data });
    }

    deletedata(e) {
        var answer = window.location.href;
        const answer_array = answer.split("/");
        if (answer_array[2] == "localhost:3000") {
            var del = "http://localhost/pramesh/backend/api/product_delete";
        } else {
            var del = "http://pramesh.justcodenow.com/backend/api/product_delete";
        }

        var iProductId = e.target.id;
        const fd = new FormData();
        fd.append("iProductId", iProductId);
        if (iProductId) {
            const dataa = axios
                .post(del, fd)
                .then((res) => {
                    if (res.data.Status == "0") {
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
                        }, 2000);
                    } else {
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
                .catch((error) => { });
        }
    }

   


    render() {
        var product = this.state.product;


       
        return (
            <>
            
                <Sidebar />
                <div className="main-content" id="panel">
                    <Header />
                    {/* <!-- Page content --> */}
                    <div class="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="card-header border-0">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h3 className="mb-0">Product Content</h3>
                                            </div>
                                            <div className="col text-right">
                                                <Link to="/admin/product/add">
                                                    <a className="btn myBtn4">Add</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                   

                                    <div className="table-responsive">
                                        <table
                                            id="example"
                                            className="table align-items-center table-flush example"
                                        >
                                            <thead className="thead-light">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">ProductName</th>
                                                    <th scope="col">AddedDate</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.map((product, index) => {
                                                    return <tr>
                                                        <th>{index + 1} </th>
                                                        <td>
                                                            {
                                                                product.image.length > 0 ?
                                                                    product.image.map(function (img, id)
                                                                    {
                                                                        if (img.vImage!="")
                                                                        {
                                                                            return (<img
                                                                                className="h-101 w-101"
                                                                                src={img.vImage} />
                                                                            )
                                                                        }
                                                                        else
                                                                        {
                                                                            return (
                                                                            <img
                                                                                className="h-101 w-101"
                                                                                src={process.env.PUBLIC_URL + "/Images/imageno.jpg"}/>
                                                                            )
                                                                        }
                                                                        
                                                                    })
                                                                :
                                                                <img
                                                                    className="h-101 w-101"
                                                                    src={process.env.PUBLIC_URL + "/Images/imageno.jpg"} />
                                                                
                                                            }
                                                            
                                                        </td>
                                                        <td>{product.vProductName}</td>
                                                        <td>{product.dtAddedDate}</td>
                                                        <td>{product.eStatus}</td>
                                                        <td>
                                                            {/* {
                                                                    product.vHomePageDisplay=='1' ?
                                                                        <span style={{ 'color': 'blue', 'padding': '10px' }} className="fa fa-home"></span> : <></>
                                                                } */}

                                                            <Link
                                                                to={`/admin/product/edit/${product.iProductId}`}
                                                            >
                                                                <a>
                                                                    <button className="btn myBtn3 position-relative ">
                                                                        Edit
                                                                        {product.vHomePageDisplay == "1" ? (
                                                                            <span
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    marginLeft: "0.5rem"
                                                                                }}
                                                                                className="fa fa-home"
                                                                            ></span>
                                                                        ) : (
                                                                            <></>
                                                                        )}
                                                                    </button>
                                                                </a>
                                                                &nbsp;&nbsp;&nbsp;
                                                            </Link>
                                                            <button
                                                                id={`${product.iProductId}`}
                                                                class="btn myBtn2"
                                                                onClick={this.deletedata}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
    })}
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
export default Productlisting;
