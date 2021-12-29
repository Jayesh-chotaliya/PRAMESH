
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import axios from 'axios';
import { useHistory } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Stories_edit = () => {
    let history = useHistory();
    const [Title, setTitle]         = useState("");
    const [Status, setStatus]       = useState('inActive');
    const [Image, setImage]         = useState("");
    const [Video, setVideo]         = useState("");
    const [LiveVideo, setLiveVideo] = useState("");
    const [Desc, setDesc]           = useState("");
    const [Gif, setGif]             = useState(false);


    const [errorTitle, setErrroTitle]   = useState("");
    const [errorImage, setErrroImage]   = useState("");
    const [errorVideo, setErrroVideo]   = useState("");
    const [errorDesc, setErrroDesc]     = useState("");
    var iStoriesId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    let images = [];
    const handleChangeStatus = ({ meta }, status) => {
        // console.log(meta.name);
        images.push(meta.name);
    }
    // *********************************************************DATA ADDED************************************
    function chosenVideo(e) {
        var file = e.target.files[0];
        var file_state = e.target;
        var reader = new FileReader();
        reader.onloadend = () => {
        };
        reader.readAsDataURL(file);
        setVideo(file);
        setLiveVideo(URL.createObjectURL(file));
    }

    const addstories = () => {
        if (Title) {
            setErrroTitle('');
        }
        else {
            setErrroTitle('Please Enter Stories Title');
        }
        if (Image) {
            setErrroImage('');
        }
        else {
            setErrroImage('Please Select Stories Image');
        }

        if (Video) {
            setErrroVideo('');
        }
        else {
            setErrroVideo('Please Select Stories Video');
        }

        if (Desc) {
            setErrroDesc('');
        }
        else {
            setErrroDesc('Please Enter Discription');
        }

        var answer = window.location.href;
        const answer_array = answer.split('/');

        if (answer_array[2] == 'localhost:3000') {
            var url = 'http://localhost/pramesh/backend/api/stories_added';
        }
        else {
            var url = 'http://pramesh.justcodenow.com/backend/api/stories_added';
        }

        const fd = new FormData();
        fd.append('vTitle', Title);
        fd.append('vImage', Image);
        fd.append('vvideo', Video);
        fd.append('tDesc', Desc);
        fd.append('eStatus', Status);
        fd.append('iStoriesId', iStoriesId);
        
        if (Title && Desc) {
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
                            history.push("/admin/stories");
                        }, 1000);
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

    // *********************************************FETCHING DATA*************************************
    
    var answer = window.location.href;
    const answer_array = answer.split('/');
    if (answer_array[2] == 'localhost:3000') {
        var urls = `http://localhost/pramesh/backend/api/all_stories?iStoriesId=${iStoriesId}`;
    }
    else {
        var urls = `http://pramesh.justcodenow.com/backend/api/all_stories?iStoriesId=${iStoriesId}`;
    }
    useEffect(() => {
        axios.get(urls)
            .then(res => {
                console.log(res);
                setTitle(res.data.data.vTitle);
                setImage(res.data.data.vImage);
                setVideo(res.data.data.vVideo);
                setDesc(res.data.data.tDescription);
                setStatus(res.data.data.eStatus);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])
    if(Status=='Active')
    {
        var Active='selected';
    }
    else if(Status=='Inactive')
    {
        var Inactive = 'selected';
    }
    else
    {
        var Active = '';
        var Inactive = '';
    }


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
                                            <h3 className="mb-0">Stories Add</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <h6 className="heading-small text-muted mb-4">Stories information</h6>
                                        <div className="pl-lg-4">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vTitle">Title</label>
                                                        <input type="text" id="vTitle" className="form-control" placeholder="Title" value={Title} onChange={(e) => setTitle(e.target.value)} />
                                                        <span className="red">{errorTitle}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vImage">Stories Image</label>
                                                            <input type="file" id="vImage" onChange={(e) => setImage(e.target.files[0])} accept="image/*" className="form-control vImage" />
                                                            {
                                                                Image ?
                                                                    <img src={Image} className="img1 h-101" />
                                                                :<p>No Image</p>
                                                            }

                                                            

                                                            <span className="red">{errorImage}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="vVideo">Stories Video</label>
                                                            <input type="file" className="vVideo_change" onChange={(e) => chosenVideo(e)} accept="video/*" className="form-control" />
                                                            {
                                                                Video
                                                                    ?
                                                                    <video controls autoplay>
                                                                        <source src={Video} type="video/mp4" />
                                                                    </video>
                                                                    :
                                                                    <p></p>
                                                            }
                                                            <span className="red">{errorVideo}</span>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vDescription">Description</label>
                                                        <textarea value={Desc} id="vDescription" rows="4" class="form-control" placeholder="Description..." onChange={(e) => setDesc(e.target.value)}></textarea>
                                                        <span className="red">{errorDesc}</span>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label className="form-control-label" for="vEmail">Status</label>
                                                        <select className="form-control" onChange={(e) => setStatus(e.target.value)}>
                                                            <option selected={Inactive} value="inActive">Inactive</option>
                                                            <option selected={Active} value="Active">Active</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <button type="button" onClick={addstories} className="btn  btn-primary">
                                                            {
                                                                Gif == true ?
                                                                    <img className="loding_gif" src={process.env.PUBLIC_URL + "/Images/3.gif"} alt="img" />
                                                                    :
                                                                    <>Submit</>
                                                            }
                                                        </button>
                                                        <Link to='/admin/stories'>
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


export default Stories_edit;