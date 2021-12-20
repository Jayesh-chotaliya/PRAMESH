import React, { useState, useEffect } from "react";
import "../../../css/home.css";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useHistory } from "react-router";
import axios from "axios";
const Login = () => {
    let history = useHistory();
    var answer = window.location.href;
    const answer_array = answer.split('/');

    const [Email, setEmail]                 = useState("");
    const [ErrorEmail, setErrorEmail]       = useState("");

    const [Password, setPassword]           = useState("");
    const [ErrorPassword, setErrorPassword] = useState("");

    const [Remember, setRemember] = useState("");

    function validateEmail() {
        var emailText = document.getElementById('email').value;
        var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
        if (pattern.test(emailText)) {
            setErrorEmail('');
            return true;
        } else {
            setErrorEmail("Invalid email address : " + emailText);
            return false;
        }
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            login();
        }
    };

    function login()
    {  
        var Emaildata = validateEmail();

        if (Password) {
            if (Password.length >= 6) {
                setErrorPassword('');
            }
            else {
                setErrorPassword('Please Enter Maximum Six Digits');
            }
        }
        else {
            setErrorPassword('Please Enter Password');
        }
        if (Emaildata == true && Password)
        {
            if (answer_array[2] == 'localhost:3000') {
                var register = 'http://localhost/pramesh/backend/api/login_user';
            }
            else {
                var register = 'http://pramesh.justcodenow.com/backend/api/login_user';
            }

            const fd = new FormData();
            fd.append('vEmail', Email);
            fd.append('vPassword', Password);

            const dataa = axios.post(register, fd)
                .then(res => {
                    if (res.data.Status == '0') {
                        localStorage.setItem("iUserId", res.data.data.iUserId);
                        localStorage.setItem("vFirstName", res.data.data.vFirstName);
                        localStorage.setItem("vLastName", res.data.data.vLastName);
                        Swal.fire(
                            'Good job!',
                             res.data.message,
                            'success'
                        )
                        setTimeout(function () {
                            history.push("/");
                            window.location.reload(1);
                        }, 3000);
                    }
                    else {
                        Swal.fire(
                            'Error',
                            res.data.message,
                            'error'
                        )
                    }
                })
                .catch(error => {
                })
        }
    }



    return (
        <section className="registerForm loginForm">
            <img
                src={process.env.PUBLIC_URL + "/Images/login.jpg"}
                className="registerBg"
            />
            <div className="rowes">
                <div className=" left1">
                    <div className="bg">
                        <img
                            src={process.env.PUBLIC_URL + "/Images/loginpic.png"}
                            alt="Bg"
                        />
                    </div>
                </div>

                <div className="right1">
                    <div className="logo ">
                        <img src={process.env.PUBLIC_URL + "/Images/logo.png"} />
                    </div>
                    <h1 className="mb-3">CREATE AN ACCOUNT</h1>

                    <div className="info">
                            <div className="group">
                                <input type="text" onChange={(e) => setEmail(e.target.value)}  name="email" id="email" />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Email</label>
                                <span className="red">{ErrorEmail}</span>
                            </div>

                            <div className="group">
                                <input type="password" onKeyDown={(e) => something(e)}  onChange={(e) => setPassword(e.target.value)}  name="pass" id="pass" />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label>Password</label>
                                <span className="red">{ErrorPassword}</span>
                            </div>

                            <div className="remember">
                                <div className=" pretty p-icon p-smooth">
                                    <input type="checkbox" onClick={(e)=>setRemember(e.target.value)} value="1" name="price1" id="price1" />
                                    <div class="state p-maroon">
                                        <i class="icon fa fa-check"></i>
                                        <label for="price1">REMEMBER ME</label>
                                    </div>
                                </div>
                                <div className="forgot">
                                    <a href="/">FORGET PASSWORD</a>
                                </div>
                            </div>

                            <div className="btn-box my-5">
                                <button onClick={login} className="btn btn-submit mb-4" type="button">
                                    LOGIN
                                </button>
                                <button className=" btn gbtn">
                                    <i class="fa fa-google mr-2" aria-hidden="true"></i>Sign in with Google
                                </button>
                            </div>


                            <div className="group">
                                <h3> Don't have an account ?  <Link to="/register"> Create free account </Link> </h3>
                            </div>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
