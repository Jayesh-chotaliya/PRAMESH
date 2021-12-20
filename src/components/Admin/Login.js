import React, { useState, Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../image/img/brand/0000003.png";
// import { AUTH_LOGIN } from 'react-admin';

const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Message, setMessage] = useState("");
    const [name, setName] = useState("");

    let history = useHistory();

    const something = (event) => {
        if (event.keyCode === 13) {
            login();
        }
    };

    function login() {
        var answer = window.location.href;
        const answer_array = answer.split("/");

        if (answer_array[2] == "localhost:3000") {
            var url = "http://localhost/pramesh/backend/api/login";
        } else {
            var url = "http://pramesh.justcodenow.com/backend/api/login";
        }

        const fd = new FormData();
        fd.append("vEmail", Email);
        fd.append("vPassword", Password);

        const dataa = axios
            .post(url, fd)
            .then((res) => {
                if (res.data.estatus == "0") {
                    var now = new Date().getTime();
                    localStorage.setItem("iAdminId", res.data.iAdminId);
                    localStorage.setItem("vUserName", res.data.vUserName);
                    localStorage.setItem("setupTime", now);

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
                        history.push("/admin/");
                        // window.location.reload(1);
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

    return (
        <div class="login_body ">
            <div className=" text-center login-page">
                <img src={logo} className="navbar-brand-img" alt="..." />
                <div className="form-login">
                    <h4>Admin Login </h4>
                    <input
                        type="text"
                        id="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control input-sm chat-input mt-1"
                        placeholder="Email"
                    />
                    {Email ? (
                        <span></span>
                    ) : (
                        <span className="error">Please Enter Valid Email Address</span>
                    )}

                    <input
                        type="password"
                        onKeyDown={(e) => something(e)}
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="userPassword"
                        className="form-control input-sm chat-input mt-4"
                        placeholder="password"
                    />
                    {Password ? (
                        <span></span>
                    ) : (
                        <span className="error">Please Enter Valid Password</span>
                    )}

                    <div className="wrapper">
                        <span className="group-btn">
                            <a
                                href="javascript:;"
                                onClick={login}
                                className="btn btn-danger btn-md mt-4"
                            >
                                login <i className="fa fa-sign-in"></i>
                            </a>
                        </span>
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
    );
};
export default Login;
