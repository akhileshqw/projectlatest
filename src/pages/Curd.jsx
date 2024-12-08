import React from "react";
import { Link } from "react-router-dom";
import "../styles/milkpage.css";
export default function Curd() {
    return (
        <>
            <center>
                <h3>From Cow to Camel: Discover Unique Animal curds</h3>
            </center>
            <div className="container d-flex gap-4 flex-wrap">
                <div className="card">
                    <img src="./cow456.jpeg.jpg" alt="Coconut and curd Image" />
                    <div className="card-content">
                        <h2>Cow curd</h2>
                        <p>
                            Experience the goodness of pure cow curd, carefully
                            sourced and processed to retain its natural flavor
                            and nutritional benefits.
                        </p>
                        <Link to="/vendor" className="btn-milk"
                        
                        >
                            Contact Vendor
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <img src="./buffalo123.png" alt="Coconut and curd Image" />
                    <div className="card-content">
                        <h2>Buffalo curd</h2>
                        <p>
                            Experience the goodness of pure Buffalo curd,
                            carefully sourced and processed to retain its
                            natural flavor and nutritional benefits.
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
