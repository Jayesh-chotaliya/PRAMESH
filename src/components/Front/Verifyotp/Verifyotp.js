import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import "../../../css/home.css";

const Verifyotp = () => {
  useEffect(() => {
    var codes = document.querySelectorAll(".code");


    codes.forEach((curr, index) => {
      curr.addEventListener("keydown", (e) => {
        if (e.key >= 0 && e.key <= 9) {
          curr.value = "";
          setTimeout(() => {
            if(index == 4)
            {

            }
            else
            {
                codes[index + 1].focus();
            }
           
          }, 10);
        }
        if (e.key == "Backspace") {
    
          setTimeout(() => {
              if(index == 0)
              {

              }
              else
              {
                codes[index - 1].focus();
              }

            
          }, 10);
        }
      });
    });
  });
  let history = useHistory();
  var answer = window.location.href;
  const answer_array = answer.split("/");

  const [show, setshow] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTPS, setOTPS] = useState("");
  const [UserId, setUserId] = useState("");

  const [Password, setPassword] = useState("");
  const [ErrorPassword, setErrorPassword] = useState("");

  const [ConPassword, setConPassword] = useState("");
  const [ErrorConPassword, setErrorConPassword] = useState("");

  const [ErrConfirmPassword, setErrConfirmPassword] = useState("");

  function verify() {
    if (OTPS) {
      setOTP("");
      if (answer_array[2] == "localhost:3000") {
        var resetpass = "http://localhost/pramesh/backend/api/otp_verify";
      } else {
        var resetpass = "http://pramesh.justcodenow.com/backend/api/otp_verify";
      }
      const fd = new FormData();
      fd.append("vOTP", OTPS);
      const dataa = axios
        .post(resetpass, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            if (show == true) {
              setshow(false);
            }

            setUserId(res.data.iUserId);
            gsap.fromTo(
              ".fa-check-circle",
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 }
            );

            if (show == false) {
              setshow(true);
              gsap.fromTo(
                ".passDiv",
                { x: "200rem" },
                { x: 0, duration: 0.2, delay: 0.5 }
              );
            }
          } else {
            // Swal.fire(
            //     'Error',
            //     res.data.message,
            //     'error'
            // )
          }
        })
        .catch((error) => {});
    }
  }

  if (OTP.length === 5) {
    setOTPS(OTP);
    verify();
  }
  const password_change = () => {
    if (Password) {
      setErrorPassword("");
    } else {
      setErrorPassword("Please Enter Password");
    }
    if (ConPassword) {
      setErrorConPassword("");
    } else {
      setErrorConPassword("Please Enter Confirm Password");
    }

    if (Password == ConPassword) {
      setErrConfirmPassword("");
    } else {
      setErrConfirmPassword("Password and confirm password does not match");
    }

    if (UserId && Password && Password == ConPassword) {
      setOTP("");
      if (answer_array[2] == "localhost:3000") {
        var resetpass = "http://localhost/pramesh/backend/api/password_update";
      } else {
        var resetpass =
          "http://pramesh.justcodenow.com/backend/api/password_update";
      }
      const fd = new FormData();
      fd.append("UserId", UserId);
      fd.append("vPassword", Password);

      const dataa = axios
        .post(resetpass, fd)
        .then((res) => {
          if (res.data.Status == "0") {
            Swal.fire("Password Updated", res.data.message, "success");
            setTimeout(function () {
              history.push("/login");
              window.location.reload(1);
            }, 2000);
          } else {
            Swal.fire("Error", res.data.message, "error");
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <>
      <div className="otpsection">
        <img
          src={process.env.PUBLIC_URL + "/Images/login.jpg"}
          className="registerBg"
        />
        <div className="c-email">
          <div className="c-email__header">
            <h1 className="c-email__header__title">Your Verification Code</h1>
          </div>
          <div className="c-email__content">
            <p className="c-email__content__text text-title">
              Please Enter your OTP in field:
            </p>
            <div className="c-email__code code-container">
              <input type="number" class="code" min="0" max="9" />
              <input type="number" class="code" min="0" max="9" />
              <input type="number" class="code" min="0" max="9" />
              <input type="number" class="code" min="0" max="9" />
              <input type="number" class="code" min="0" max="9" />
              {/* <input type="text"  onChange={(e) => setOTP(e.target.value)}  className="c-email__code__text" /> */}
            </div>
            <p className="c-email__content__text text-title ">
              Verification code is valid only for 30 minutes
            </p>
          </div>
          <button className="c-email__footer" onClick={verify}>
            Verify OTP <i className="far fa-check-circle"></i>{" "}
          </button>
        </div>
      </div>

      {/* Confirm PAssword  */}

      <div className={`passDiv ${show ? "show" : ""}`}>
        <div className={`confirmPass `}>
          {/* <div className="black" ></div> */}
          {/* <div className="red" ></div> */}
          <img
            src={process.env.PUBLIC_URL + "/Images/registerBg.jpg"}
            className="registerBg"
          />
          <div className="pass">
            <h1>Create New Password</h1>
            <div className="passInput">
              <label htmlFor="pass">Enter New Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="pass"
                id="pass"
              />
              <span className="">{ErrorPassword}</span>
            </div>
            <div className="passInput">
              <label htmlFor="confirmpass">Confirm Password</label>
              <input
                onChange={(e) => setConPassword(e.target.value)}
                type="password"
                name="confirmpass"
                id="confirmpass"
              />
              <span className="">{ErrorConPassword}</span>
            </div>
            <span className="">{ErrConfirmPassword}</span>

            <button onClick={password_change} className="passBtn">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verifyotp;
