import React, { useContext } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../styles/milkpage.css";
import { userContext } from "../context/userContext";
export default function Ghee() {
    const { LoginUser } = useContext(userContext);
    const navigate = useNavigate();
  
  const notifyAndRedirect = (msg, redirectPath) => {
    // Show the toast and use the onClose callback for navigation
    toast(msg, {
      position: "top-center",
      onClose: () => navigate(redirectPath), // Navigate after toast is closed
    });
  };

  const tovendor = () => {
    if (!!LoginUser) {
      navigate("/vendor");
    } else {
      notifyAndRedirect("You need to login first", "/login-customer");
    }
  };

  return (
    <>
      <center>
        <h3>From Cow to Camel: Discover Unique Animal ghees</h3>
      </center>
      <ToastContainer position="top-center" transition={Bounce} />
      <div className="container d-flex gap-4 flex-wrap">
        <div className="card">
          <img src="./cow456.jpeg.jpg" alt="Coconut and ghee Image" />
          <div className="card-content">
            <h2>Cow ghee</h2>
            <p>
              Experience the goodness of pure cow ghee, carefully sourced and
              processed to retain its natural flavor and nutritional benefits.
            </p>
            <button className="btn-milk" onClick={tovendor}>
              Contact Vendor
            </button>
          </div>
        </div>
        <div className="card">
          <img src="./buffalo123.png" alt="Coconut and ghee Image" />
          <div className="card-content">
            <h2>Buffalo ghee</h2>
            <p>
              Experience the goodness of pure Buffalo ghee, carefully sourced
              and processed to retain its natural flavor and nutritional
              benefits.
            </p>
            <button className="btn-milk" onClick={tovendor}>
              Contact Vendor
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
