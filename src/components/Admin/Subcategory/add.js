import {Link} from "react-router-dom";
import React, { useState, Component ,useEffect} from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Subcategoryadd = () => {
    let history = useHistory();
    const [Category, setCategory] = useState([]);
    const [FabricArray, setFabricArray] = useState([]);
    const [Category_v, setCategory_v]   = useState("");
    const [Title, setTitle]             = useState("");
    const [Fabric, setFabric] = useState("");
    const [ErrorFabric, setErrorFabric] = useState("");
    const [Gif, setGif]                 = useState(false);

    const [ProductType, setProductType] = useState("0");
    const [Status, setStatus]           = useState("Inactive");
    const [TitleError, setTitleError]   = useState("");

    const [CategoryError, setCategoryError] = useState("");
    
    function addcategory() {

        if (Title){ 
            setTitleError(''); 
        }
        else 
        {
            setTitleError("Please Enter Category Name");
        }
        if (Category_v)
        {
            setCategoryError('');
        }
        else
        {
            setCategoryError("Select Category");
        }
        if (Fabric)
        {
            setErrorFabric('');
        }
        else
        {
            setErrorFabric('Please Select Main Category');
        }
       

        var answer = window.location.href;
        const answer_array = answer.split('/');
        console.log(answer_array);

        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/subcategory_add';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/subcategory_add';
        }
        const fd = new FormData();
        fd.append('iCategoryId', Category_v);
        fd.append('vTitle', Title);
        fd.append('ProductType', ProductType);
        fd.append('iFabricId', Fabric)
        fd.append('eStatus', Status);

        if (Title && Category_v)
        {
            setGif(true);
            const dataa = axios.post(url, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        setGif(false);
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
                        setGif(false);
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
    if (answer_array[2] == 'localhost:3000') {
        var urls = `http://localhost/pramesh/backend/api/get_category`;
    }
    else {
        var urls = `http://pramesh.justcodenow.com/backend/api/get_category`;
    }

    useEffect(() => {
        axios.get(urls)
            .then(res => {
                setCategory(res.data.data);
                setFabricArray(res.data.fabric);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    console.log(FabricArray);
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
                                            <h3 className="mb-0">SubCategory Add </h3>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">SubCategory information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Category</label>
                                                        <select className="form-control" onChange={(e) => setCategory_v(e.target.value)}>
                                                            <option>Select Category</option>
                                                            {Category.map((cat , index) => (
                                                                <option value={cat.iCategoryId}>{cat.vTitle}</option>
                                                            ))}
                                                        </select>
                                                       
                                                        <span className="red">{CategoryError}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Main Category</label>
                                                        <select className="form-control" onChange={(e) => setFabric(e.target.value)}>
                                                            <option>Select Category</option>
                                                            {FabricArray.map((cat, index) => (
                                                                <option value={cat.iFabricId}>{cat.vTitle}</option>
                                                            ))}
                                                        </select>

                                                        <span className="red">{ErrorFabric}</span>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">SubCategory Title</label>
                                                        <input type="text" id="vTitle" onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title" value={Title} />
                                                        <span className="red">{TitleError}</span>
                                                    </div>
                                                </div>
                                               
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Select type</label>
                                                        <select className="form-control" onChange={(e) => setProductType(e.target.value)}>
                                                            <option value="0">Other</option>
                                                            <option value="1">Main ProductPage Show </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option value="inActive">Inactive</option>
                                                            <option value="Active">Active</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={addcategory} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.gif"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
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


export default Subcategoryadd;