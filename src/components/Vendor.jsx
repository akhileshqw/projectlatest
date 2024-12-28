import React, { useContext, useEffect } from "react";
import "../styles/vendorstyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const Vendor = () => {
  const [vendorsList, setVendorsList] = useState([]);
  const [finvendor,setfinvendor]=useState([]);
  const navigate = useNavigate();

  const { LoginUser } = useContext(userContext);

  const filterbystar=(v)=>{
      if(vendorsList.length!==0){
       const  sp=vendorsList.filter((vendor) => vendor.rating >= v)
        setfinvendor(sp)
  }
}
  const getVendors = async () => {
    const data = await fetch("http://localhost:3000/vendors");
    const vendorsData = await data.json();
    console.log(vendorsData);
    setVendorsList(vendorsData);
    setfinvendor(vendorsData);
  };
  useEffect(() => {
    getVendors();
  }, []);
  const renderStars = (num) => {
    return Array.from({ length: num }, (_, index) => (
      <span style={{ fontSize: 30 }} key={index}>
        &#9733;
      </span> // Unicode for star
    ));
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <>
        <center>
          <h2 style={{ color: "#333" }}>Vendor Profiles</h2>
        </center>

        {LoginUser ? (
          <div
            className="container"
            style={{
              display: "flex",
              gap: 20,
              height: "100vh",
              overflow: "auto",

              // Ensure full viewport height
              // Prevent scroll on parent
            }}
          >
            {/* Filter Section */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                width: 250,
                position: "sticky", // Make the sidebar sticky
                top: "20px", // Offset from the top of the viewport
                alignSelf: "flex-start",
              }}
              className="filter-section sticky-sidebar"
            >
              <h3 style={{ color: "#333" }}>Filter Vendors</h3>
              {/* Filter by Rating */}
              <h4>Rating</h4>
              <label>
                <input
                  type="radio"
                  name="rating"
                  defaultValue={5}
                  onChange={()=>filterbystar(5)}
                />{" "}
                5 Stars
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  defaultValue={4}
                  onChange={()=>filterbystar(4)}
                />{" "}
                4 Stars &amp; Up
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  defaultValue={3}
                  onChange={()=>filterbystar(3)}
                />{" "}
                3 Stars &amp; Up
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  defaultValue={2}
                  onChange={()=>filterbystar(2)}
                />{" "}
                2 Stars &amp; Up
              </label>
              <label>
                <input
                  type="radio"
                  name="rating"
                  defaultValue={1}
                  onChange={()=>filterbystar(1)}
                />{" "}
                1 Star &amp; Up
              </label>
              {/* Filter by Cost */}
              <h4>Cost</h4>
              <label>
                <input
                  type="checkbox"
                  name="cost"
                  defaultValue="low"
                  onclick="filterVendors()"
                />{" "}
                Low
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cost"
                  defaultValue="medium"
                  onclick="filterVendors()"
                />{" "}
                Medium
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cost"
                  defaultValue="average"
                  onclick="filterVendors()"
                />{" "}
                Average
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cost"
                  defaultValue="high"
                  onclick="filterVendors()"
                />{" "}
                High
              </label>
              {/* Filter by Place */}
              <h4>Place</h4>
              <label>
                <input
                  type="checkbox"
                  name="place"
                  defaultValue="springfield"
                  onclick="filterVendors()"
                />{" "}
                Springfield
              </label>
              <label>
                <input
                  type="checkbox"
                  name="place"
                  defaultValue="green-valley"
                  onclick="filterVendors()"
                />{" "}
                Green Valley
              </label>
              <label>
                <input
                  type="checkbox"
                  name="place"
                  defaultValue="downtown"
                  onclick="filterVendors()"
                />{" "}
                Downtown
              </label>
              {/* Filter by Products Sold */}
              <h4>Products Sold</h4>
              <label>
                <input
                  type="checkbox"
                  name="products"
                  defaultValue="fruits"
                  onclick="filterVendors()"
                />{" "}
                milk wholesale{" "}
              </label>
              <label>
                <input
                  type="checkbox"
                  name="products"
                  defaultValue="vegetables"
                  onclick="filterVendors()"
                />{" "}
                Organic Milk{" "}
              </label>
              <label>
                <input
                  type="checkbox"
                  name="products"
                  defaultValue="dairy"
                  onclick="filterVendors()"
                />{" "}
                Fresh Cow Milk and Curd
              </label>
              <label>
                <input
                  type="checkbox"
                  name="products"
                  defaultValue="dairy"
                  onclick="filterVendors()"
                />{" "}
                Butter and Cream
              </label>
              <label>
                <input
                  type="checkbox"
                  name="products"
                  defaultValue="dairy"
                  onclick="filterVendors()"
                />{" "}
                any type of animal milk
              </label>
            </div>
            {/* Vendor List Section */}
            <div
              className="vendor-list"
              id="vendorList"
              style={{ overflow: "auto" }}
            >
              {/* Vendor Card 1 */}

              {vendorsList.map((vendor) => {
                return (
                  <div
                    className="vendor-card"
                    data-rating={vendor.rating}
                    data-cost={vendor.cost}
                    data-place={vendor.place}
                    data-products={vendor.products}
                  >
                    <div className="vendor-profile">
                      <img src="user.jpg" alt="Vendor Profile" />
                    </div>
                    <div className="vendor-details">
                      <div className="vendor-name">
                        {vendor.firstname + " " + vendor.lastname}
                      </div>
                      {/* based on the number i want the no of stars give me the codee */}

                      {/* generate a random no between in the range 1-5 */}

                      <div className="rating">
                        {renderStars(vendor.rating + 1)}
                      </div>
                      <div className="vendor-info">
                        <strong>Products Sold:</strong> {vendor.work}
                      </div>

                      <div className="location">
                        <strong>Location:</strong> {vendor.address}
                      </div>
                      <div className="phone">
                        <strong>Phone:</strong>{" "}
                        <a href={`tel:+91${vendor.phone}`}>
                          +91 {vendor.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                className="vendor-card"
                data-rating={5}
                data-cost="low"
                data-place="springfield"
                data-products="fruits,vegetables,dairy"
              >
                <div className="vendor-profile">
                  <img src="user.jpg" alt="Vendor Profile" />
                </div>
                <div className="vendor-details">
                  <div className="vendor-name">John's Organic Store</div>
                  <div className="rating">⭐⭐⭐⭐⭐</div>
                  <div className="vendor-info">
                    <strong>Products Sold:</strong> Organic Fruits, Vegetables,
                    Dairy
                  </div>

                  <div className="location">
                    <strong>Location:</strong> Springfield
                  </div>
                  <div className="phone">
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+911234567890">+91 12345 67890</a>
                  </div>
                </div>
              </div>
              {/* Vendor Card 2 */}
              {/* <div
                            className="vendor-card"
                            data-rating={4}
                            data-cost="medium"
                            data-place="green-valley"
                            data-products="vegetables,dairy"
                        >
                            <div className="vendor-profile">
                                <img src="user.jpg" alt="Vendor Profile" />
                            </div>
                            <div className="vendor-details">
                                <div className="vendor-name">
                                    Green Valley Farmers
                                </div>
                                <div className="rating">⭐⭐⭐⭐</div>
                                <div className="vendor-info">
                                    <strong>Products Sold:</strong> Fresh
                                    Vegetables, Dairy
                                </div>
                                <div className="price">
                                    <strong>Cost per Packet:</strong> Medium
                                </div>
                                <div className="location">
                                    <strong>Location:</strong> Green Valley
                                </div>
                                <div className="phone">
                                    <strong>Phone:</strong>{" "}
                                    <a href="tel:+911234567890">
                                        +91 12345 67890
                                    </a>
                                </div>
                            </div>
                        </div> */}
            </div>
          </div>
        ) : (
          <div>kindly login to view vendor profiles</div>
        )}
      </>
    </div>
  );
};

export default Vendor;
