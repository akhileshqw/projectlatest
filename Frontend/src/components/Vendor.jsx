import React, { useContext, useEffect } from "react";
import "../styles/vendorstyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const Vendor = () => {
  const [vendorsList, setVendorsList] = useState([]);
  const [finvendor, setfinvendor] = useState([]);
  const navigate = useNavigate();
  const [dairySection, setDairySection] = useState([]);
  const [fullvendorData, setFullVendorData] = useState([]);
  const [star, setStar] = useState(1);
  const [certified, setCertified] = useState(false);
  const { LoginUser } = useContext(userContext);

  const applyFilters = async () => {
    // let np = [];
    // let strp = [];
    // if (numparameter.length !== 0) {
    //   np = finvendor.filter((vendor) => vendor.rating >= numparameter[0]);
    //   np.sort((a, b) => b.rating - a.rating);
    // }
    // if (strparameter.length !== 0 && numparameter.length !== 0) {
    //   for (const element of np) {
    //     if (strparameter.includes(element.work)) {
    //       strp.push(element);
    //     }
    //   }
    //   setVendorsList(strp);
    // } else if (strparameter.length === 0 && numparameter.length > 0) {
    //   setVendorsList(np);
    // } else if (strparameter.length > 0 && numparameter.length === 0) {
    //   const tt = finvendor.filter((element) => strparameter.includes(element.work));
    //   setVendorsList(tt);
    // } else {
    //   setVendorsList(finvendor);
    // }
    let ob = {};

    if (certified) {
      ob["isCertified"] = true;
    }
    if (star != 0) {
      ob["rating"] = star;
    }
    if (dairySection.length !== 0) {
      for (let index = 0; index < dairySection.length; index++) {
        const element = dairySection[index];
        ob[element] = true;
      }
    }

    console.log(ob);
    try {
      const response = await fetch("http://localhost:3000/applyfilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(ob),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setVendorsList(data);
    } catch (err) {
      // setError(err.message);
    }
  };

  const fillme = (email) => {
    // const obj=
    for (let index = 0; index < fullvendorData.length; index++) {
      const element = fullvendorData[index];
      const vemail = element.vendorEmail + "";
      // console.log(typeof vemail)
      if (vemail == email) {
        return fillcategories(element);
      }
    }
  };
  const fillcategories = (profile) => {
    let arr = [];
    if (profile.cowMilkSells) arr.push("Cow Milk");
    if (profile.buffaloMilkSells) arr.push("Buffalo Milk");
    if (profile.camelMilkSells) arr.push("Camel Milk");
    if (profile.donkeyMilkSells) arr.push("Donkey Milk");
    if (profile.goatMilkSells) arr.push("Goat Milk");
    if (profile.cowGheeSells) arr.push("Cow Ghee");
    if (profile.buffaloGheeSells) arr.push("Buffalo Ghee");
    if (profile.cowCurdSells) arr.push("Cow Curd");
    if (profile.buffaloCurdSells) arr.push("Buffalo Curd");

    let str = arr.join(", ");
    return str;
  };

  const handleFilterSelection = (v) => {
    //   if (typeof v === "number") {
    //     setnumparameter([v]);
    //   } else {
    //     const updatedStrParams = strparameter.includes(v)
    //       ? strparameter.filter((item) => item !== v)
    //       : [...strparameter, v];
    //     setparameters(updatedStrParams);
    //   }

    setDairySection((prev) => {
      let newSection = [...prev];
      if (newSection.indexOf(v) != -1) {
        newSection.splice(newSection.indexOf(v), 1);
      } else {
        newSection.push(v);
      }
      return newSection;
    });
  };

  const getVendors = async () => {
    const data = await fetch("http://localhost:3000/vendors");
    const vendorsData = await data.json();
    setVendorsList(vendorsData);
    setfinvendor(vendorsData);
  };
  const getVendorProductDetails = async () => {
    const data = await fetch("http://localhost:3000/vendorProductDetails");
    const fullVendorData = await data.json();
    setFullVendorData(fullVendorData);
  };
  useEffect(() => {
    getVendors();
    getVendorProductDetails();
  }, []);

  console.log("in uses effect", fullvendorData);
  console.log("in partial", vendorsList);
  const renderStars = (num) => {
    return Array.from({ length: num }, (_, index) => (
      <span style={{ fontSize: 30 }} key={index}>
        &#9733;
      </span>
    ));
  };
const gotovendor =(email)=>{

navigate(`/aboutvendor?vendoremail=${encodeURIComponent(email)}`);
// navigate(`/nextpage?username=${encodeURIComponent(username)}&rating=${rating}`);


}



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
                position: "sticky",
                top: "20px",
                alignSelf: "flex-start",
              }}
              className="filter-section sticky-sidebar"
            >
              <h4 style={{ color: "#333" }}>Filter Vendors</h4>
              {/* Filter by Rating */}
              <h5>Rating</h5>
              <label>
                <input type="radio" name="rating" onChange={() => setStar(5)} />{" "}
                5 Stars
              </label>
              <label>
                <input type="radio" name="rating" onChange={() => setStar(4)} />{" "}
                4 Stars &amp; Up
              </label>
              <label>
                <input type="radio" name="rating" onChange={() => setStar(3)} />{" "}
                3 Stars &amp; Up
              </label>
              <label>
                <input type="radio" name="rating" onChange={() => setStar(2)} />{" "}
                2 Stars &amp; Up
              </label>
              <label>
                <input type="radio" name="rating" onChange={() => setStar(1)} />{" "}
                1 Star &amp; Up
              </label>

              {/* Filter by Products Sold */}
              <h5>Products Sold</h5>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => handleFilterSelection(e.target.value)}
                  value="milk"
                />{" "}
                Milk
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => handleFilterSelection(e.target.value)}
                  value="curd"
                />{" "}
                Curd
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => handleFilterSelection(e.target.value)}
                  value="ghee"
                />{" "}
                Ghee
              </label>

              <h5>Certification</h5>
              <label>
                <input
                  type="checkbox"
                  onChange={() => setCertified((prev) => !prev)}
                />{" "}
                Certified Vendors Only
              </label>

              <button
                onClick={applyFilters}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Apply Filters
              </button>
            </div>

            {/* Vendor List Section */}
            <div
              className="vendor-list"
              style={{ overflow: "auto", width: "100%" }}
            >
              {vendorsList.length == 0 && (
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 400,
                  }}
                >
                  <img
                    src="https://askg.vercel.app/img/no-results.png"
                    alt=""
                    width={100}
                    height={100}
                  />
                  <div>No Results found...</div>{" "}
                </div>
              )}
              {vendorsList.map((vendor, index) => (
                <div
                style={{cursor:"pointer"}}
                  key={index}
                  className="vendor-card"
                  data-rating={vendor.rating}
                  onClick={()=>gotovendor(vendor.email)}
                >
                  <div className="vendor-profile">
                    <img src="user.jpg" alt="Vendor Profile" />
                  </div>
                  <div className="vendor-details">
                    <div className="vendor-name d-flex">
                      {vendor.firstname + " " + vendor.lastname}{" "}
                      {vendor.isCertified && (
                        <img
                          src="/certified.png"
                          alt=""
                          height={18}
                          width={18}
                        />
                      )}
                    </div>
                    <div className="rating">{renderStars(vendor.rating)}</div>
                    <div className="vendor-info">
                      {/* have to work */}
                      <strong>Products Sold:</strong> {fillme(vendor.email)}
                    </div>
                    <div className="location">
                      <strong>Location:</strong> {vendor.address}
                    </div>
                    <div className="phone">
                      <strong>Phone:</strong>{" "}
                      <a href={`tel:+91${vendor.phone}`}>+91 {vendor.phone}</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>Kindly login to view vendor profiles</div>
        )}
      </>
    </div>
  );
};

export default Vendor;
