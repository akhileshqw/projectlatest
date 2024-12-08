import React from "react";
import { Link } from "react-router-dom";
import "../styles/milkpage.css";
export default function FreshMilkPage() {
    return (
        <>
        <center>
          <h3>From Cow to Camel: Discover Unique Animal Milks</h3>
        </center>
        <div className="container d-flex gap-4 flex-wrap">
       
          <div className="card">
            <img src="./cow456.jpeg.jpg" alt="Coconut and Milk Image" />
            <div className="card-content">
              <h2>Cow Milk</h2>
              <p>
                Experience the goodness of pure cow milk, carefully sourced and
                processed to retain its natural flavor and nutritional benefits.
              </p>
              <Link to="/vendor" className="btn-milk">
                Contact Vendor
              </Link>
            </div>
          </div>
          <div className="card">
            <img src="./buffalo123.png" alt="Coconut and Milk Image" />
            <div className="card-content">
              <h2>Buffalo Milk</h2>
              <p>
                Experience the goodness of pure Buffalo milk, carefully sourced and
                processed to retain its natural flavor and nutritional benefits.
              </p>
              <Link to="/vendor" className="btn-milk">
                Contact Vendor
              </Link>
            </div>
          </div>
          <div className="card">
            <img src="./camel123.jpeg.jpg" alt="Coconut and Milk Image" />
            <div className="card-content">
              <h2>Camel Milk</h2>
              <p>
                Experience the goodness of pure camel milk, carefully sourced and
                processed to retain its natural flavor and nutritional benefits.
              </p>
              <Link to="/vendor" className="btn-milk">
                Contact Vendor
              </Link>
            </div>
          </div>
          <div className="card">
            <img src="./goat123.jpeg.jpg" alt="Coconut and Milk Image" />
            <div className="card-content">
              <h2>Goat Milk</h2>
              <p>
                Experience the goodness of pure goat milk, carefully sourced and
                processed to retain its natural flavor and nutritional benefits.
              </p>
              <Link to="/vendor" className="btn-milk">
                Contact Vendor
              </Link>
            </div>
          </div>
          <div className="card">
            <img src="./donkey.jpeg.jpg" alt="Coconut and Milk Image" />
            <div className="card-content">
              <h2>Donkey Milk</h2>
              <p>
                Experience the goodness of pure Donkey milk, carefully sourced and
                processed to retain its natural flavor and nutritional benefits.
              </p>
              <Link to="/vendor" className="btn-milk">
                Contact Vendor
              </Link>
            </div>
          </div>
        </div>
       
      </>
      
    );
}


