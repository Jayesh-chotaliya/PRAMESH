import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";

const Subcategory_edit = () => {
    let history = useHistory();
    const [Title, setTitle] = useState("");
    const [SubTitle, setSubTitle] = useState("");
    const [ProductType, setProductType] = useState("0");
    const [Status, setStatus] = useState("");

    const [TitleError, setTitleError]   = useState("");
    
   
    var iSubcategoryId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    function addcategory() 
    {
        if (Title) {
            setTitleError('');
        }
        else {
            setTitleError("Please Enter Title");
        }

        var answer = window.location.href;
        const answer_array = answer.split('/');

        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/subcategory_add';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/subcategory_add';
        }
        const fd = new FormData();
        fd.append('iSubcategoryId', iSubcategoryId);
        fd.append('vTitle', SubTitle);
        fd.append('ProductType', ProductType);
        fd.append('eStatus', Status);
    
        if (Title && iSubcategoryId) {
            const dataa = axios.post(url, fd)
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
                            history.push("/admin/subcategory/listing");
                        }, 2000);
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

    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') 
    {
        var urls = `http://localhost/pramesh/backend/api/all_subcategory_get?iSubcategoryId=${iSubcategoryId}`;
    } 
    else 
    {
        var urls = `http://pramesh.justcodenow.com/backend/api/all_subcategory_get?iSubcategoryId=${iSubcategoryId}`;
    }
    useEffect(()=>{
        axios.get(urls)
        .then(res=>{
            console.log(res.data.data);
            setTitle(res.data.data.vTitle);
            setSubTitle(res.data.data.vSubTitle);
            setStatus(res.data.data.eStatus);
            setProductType(res.data.data.vProductType);
        })
        .catch(err =>{
            console.log(err);
        })
        
    },[])
    


    return (
        <>
            <Sidebar />
            <div className="main-content" id="panel" >
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-header border-0">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h3 className="mb-0">Sub Category Edit</h3>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Sub Category information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Category</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" value={Title} readOnly />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">SubCategory Title</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setSubTitle(e.target.value)} className="form-control" placeholder="Title" value={SubTitle} />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Select type</label>
                                                        <select className="form-control" onChange={(e) => setProductType(e.target.value)}>
                                                            <option 
                                                                selected={ ProductType == '0' ? 'selected' : '' }
                                                            value="0">Other</option>
                                                            <option 
                                                                selected={ ProductType == '1' ? 'selected' : '' }
                                                            value="1">Main ProductPage Show </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option selected={
                                                                Status=='Inactive' ?
                                                                'selected'
                                                                :
                                                                ''
                                                            } value="inActive">Inactive</option>
                                                            <option selected={
                                                                Status == 'Active' ?
                                                                    'selected'
                                                                    :
                                                                    ''
                                                            }
                                                            value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={addcategory} className="btn  btn-primary">Submit</button>
                                                        <Link to='/admin/subcategory/listing'>
                                                            <a><button type="button" className="btn btn-warning">Back</button></a>
                                                        </Link>
                                                       
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
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}


export default Subcategory_edit;