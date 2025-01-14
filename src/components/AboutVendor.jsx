import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
const AboutVendor = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("vendoremail"));
  const [vendorDiaryData, setVendorDiaryData] = useState(null);
  const [vendorProfileData, setVendorProfileData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const groupProducts = (category) =>
    tableData.dairyProducts
      .map((product, originalIndex) => ({ ...product, originalIndex }))
      .filter((product) =>
        category === "Milk"
          ? product.name.includes("Milk")
          : category === "Ghee"
          ? product.name.includes("Ghee")
          : product.name.includes("Curd")
      );
  useEffect(() => {
    const fetchDiaryData = async () => {
      const give = {
        givenby: email,
      };
      try {
        const response = await fetch("http://localhost:3000/getdiaryproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(give),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }
        const data = await response.json();
        setVendorDiaryData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    const fetchProfileData = async () => {
      const give = {
        givenby: email,
      };
      try {
        const response = await fetch("http://localhost:3000/getnormalinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(give),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }
        const data = await response.json();
        setVendorProfileData(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDiaryData();
    fetchProfileData();
  }, [email]);

  useEffect(() => {
    if (vendorDiaryData) {
      console.log("in use effect", vendorDiaryData[0]);
      setTableData({
        dairyProducts:
          [
            {
              name: "Cow Milk",
              price: vendorDiaryData[0].cowMilkPrice,
              unit: "per liter",
              sells: vendorDiaryData[0].cowMilkSells,
            },
            {
              name: "Buffalo Milk",
              price: vendorDiaryData[0].buffaloMilkPrice,
              unit: "per liter",
              sells: vendorDiaryData[0].buffaloMilkSells,
            },
            {
              name: "Camel Milk",
              price: vendorDiaryData[0].camelMilkPrice,
              unit: "per liter",
              sells: vendorDiaryData[0].camelMilkSells,
            },
            {
              name: "Donkey Milk",
              price: vendorDiaryData[0].donkeyMilkPrice,
              unit: "per liter",
              sells: vendorDiaryData[0].donkeyMilkSells,
            },
            {
              name: "Goat Milk",
              price: vendorDiaryData[0].goatMilkPrice,
              unit: "per liter",
              sells: vendorDiaryData[0].goatMilkSells,
            },
            {
              name: "Cow Ghee",
              price: vendorDiaryData[0].cowGheePrice,
              unit: "per kg",
              sells: vendorDiaryData[0].cowGheeSells,
            },
            {
              name: "Buffalo Ghee",
              price: vendorDiaryData[0].buffaloGheePrice,
              unit: "per kg",
              sells: vendorDiaryData[0].buffaloGheeSells,
            },
            {
              name: "Cow Curd",
              price: vendorDiaryData[0].cowCurdPrice,
              unit: "per kg",
              sells: vendorDiaryData[0].cowCurdSells,
            },
            {
              name: "Buffalo Curd",
              price: vendorDiaryData[0].buffaloCurdPrice,
              unit: "per kg",
              sells: vendorDiaryData[0].buffaloCurdSells,
            },
          ] || [],
      });
    }
  }, [vendorDiaryData]);

  let vendor;
  if (vendorProfileData == null) {
    vendor = {
      name: "Vendor Name",
      certified: true,
      rating: 4.5,
      email: "vendor@example.com",
      phone: "+1234567890",
      location: "Vendor Address, City, Country",

      address: {
        lat: 12.9716,
        lng: 77.5946,
      },
      userAddress: {
        lat: 13.0827,
        lng: 80.2707,
      },
    };
  } else {
    vendor = {
      name: vendorProfileData.firstname + " " + vendorProfileData.lastname,
      certified: vendorProfileData.isCertified,
      rating: vendorProfileData.rating,
      email: vendorProfileData.email,
      phone: vendorProfileData.phone,
      location: vendorProfileData.address,

      address: {
        lat: 12.9716,
        lng: 77.5946,
      },
      userAddress: {
        lat: 13.0827,
        lng: 80.2707,
      },
    };
  }
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? "#ffbc00" : "#e0e0e0" }}>
          &#9733;
        </span>
      );
    }
    return stars;
  };
  console.log("td", tableData);
  console.log("vdd", vendorDiaryData);
  console.log("vpd", vendorProfileData);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        {/* Vendor Name and Certification */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>{vendor.name}</h1>
          <p style={{ fontStyle: "italic", color: "#333", fontSize: "20px" }}>
            {vendor.certified ? "Certified Vendor" : ""}
          </p>
        </div>

        {/* Vendor Rating */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "20px",
          }}
        >
          <div>{renderStars(vendor.rating)}</div>
          <p>{vendor.rating} out of 5</p>
        </div>

        {/* Contact Details */}
        <div style={{ marginBottom: "30px", fontSize: "1.2rem" }}>
          <h3>Contact Details</h3>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <MdOutlineMail style={{ width: "25px", height: "30px" }} />{" "}
            {vendor.email}
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <FaPhoneAlt style={{ width: "18px", height: "25px" }} />{" "}
            {vendor.phone}
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <IoLocationOutline style={{ width: "22px", height: "25px" }} />{" "}
            {vendor.location}
          </p>
        </div>

        {/* Map View */}
        <div style={{ marginBottom: "30px" }}>
          <h3>Vendor Address</h3>
          <iframe
            width="100%"
            height="400"
            src={`https://www.google.com/maps?q=${vendor.address.lat},${vendor.address.lng}&output=embed`}
            title="Vendor Location"
            style={{ width: "100%", border: "none" }}
          />
        </div>

        {/* Dairy Stats */}
        {["Milk", "Ghee", "Curd"].map((category) => (
          <div key={category} className="mb-4">
            <h4
              style={{
                fontWeight: "bold",
                color: "#555",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              {category} Section
            </h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Sells</th>
                </tr>
              </thead>
              {tableData && (
                <tbody>
                  {groupProducts(category).map((product) => (
                    <tr key={product.originalIndex}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.unit}</td>
                      <td>
                        <div
                          className={`btn ${
                            product.sells ? "btn-success" : "btn-danger"
                          }`}
                          style={{
                            borderRadius: "50px",
                            padding: "5px 15px",
                            fontWeight: "bold",
                            cursor: "default",
                          }}
                        >
                          {product.sells ? "Yes" : "No"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutVendor;
