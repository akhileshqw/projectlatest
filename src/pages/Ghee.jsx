import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/milkpage.css";
import { userContext } from "../context/userContext";
export default function Ghee() {
  const { LoginUser } = useContext(userContext);
  const navigate = useNavigate();
  const tovendor = () => {
    if (!!LoginUser) {
      navigate("/vendor");
    } else {
      alert("you need to login");
      navigate("/login-customer");
    }
  };

  return (
    <>
      <center>
        <h3>From Cow to Camel: Discover Unique Animal ghees</h3>
      </center>
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
