import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Manage = () => {
  const [editing, setEditing] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { LoginUser } = useContext(userContext);
  const [products, setProducts] = useState(null);
  const notify = (msg) =>
    toast(msg, {
      position: "top-center",
    });
  const [vendorDetails, setVendorDetails] = useState({
    vendorEmail: "abc@gmail.com",
    vendorLocation: "123 Vendor Street, City, Country",
    phone: "123-456-7890",
    dairyProducts: [
      { name: "Cow Milk", price: 50, unit: "per liter", sells: true },
      { name: "Buffalo Milk", price: 50, unit: "per liter", sells: true },
      { name: "Camel Milk", price: 50, unit: "per liter", sells: true },
      { name: "Donkey Milk", price: 50, unit: "per liter", sells: true },
      { name: "Goat Milk", price: 50, unit: "per liter", sells: true },
      { name: "Cow Ghee", price: 500, unit: "per kg", sells: true },
      { name: "Buffalo Ghee", price: 500, unit: "per kg", sells: true },
      { name: "Cow Curd", price: 40, unit: "per kg", sells: true },
      { name: "Buffalo Curd", price: 40, unit: "per kg", sells: true },
    ],
  });

  useEffect(() => {
    const fetchRatings = async () => {
      if (!LoginUser || !LoginUser.email) {
        return;
      }
      const give = {
        givenby: LoginUser.email,
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/getdiaryproducts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(give),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data[0]);
      } catch (err) {
        // setError(err.message);
      }
    };
    fetchRatings();
  }, [LoginUser]);

  useEffect(() => {
    if (products) {
      console.log(products, "products");
      setVendorDetails({
        vendorEmail: products.vendorEmail || "akhileshchikatla6@gmail.com",
        vendorLocation:
          products.vendorLocation || "123 Vendor Street, City, Country",
        phone: products.phone || "123-456-7890",
        dairyProducts:
          [
            {
              name: "Cow Milk",
              price: products.cowMilkPrice,
              unit: "per liter",
              sells: products.cowMilkSells,
            },
            {
              name: "Buffalo Milk",
              price: products.buffaloMilkPrice,
              unit: "per liter",
              sells: products.buffaloMilkSells,
            },
            {
              name: "Camel Milk",
              price: products.camelMilkPrice,
              unit: "per liter",
              sells: products.camelMilkSells,
            },
            {
              name: "Donkey Milk",
              price: products.donkeyMilkPrice,
              unit: "per liter",
              sells: products.donkeyMilkSells,
            },
            {
              name: "Goat Milk",
              price: products.goatMilkPrice,
              unit: "per liter",
              sells: products.goatMilkSells,
            },
            {
              name: "Cow Ghee",
              price: products.cowGheePrice,
              unit: "per kg",
              sells: products.cowGheeSells,
            },
            {
              name: "Buffalo Ghee",
              price: products.buffaloGheePrice,
              unit: "per kg",
              sells: products.buffaloGheeSells,
            },
            {
              name: "Cow Curd",
              price: products.cowCurdPrice,
              unit: "per kg",
              sells: products.cowCurdSells,
            },
            {
              name: "Buffalo Curd",
              price: products.buffaloCurdPrice,
              unit: "per kg",
              sells: products.buffaloCurdSells,
            },
          ] || [],
      });
    }
  }, [products]);

  const handleDoubleClick = (key, originalIndex = null) => {
    console.log("Double-clicked:", key, "Index:", originalIndex);
    setEditing({ key, index: originalIndex });
    if (key === "dairyProductPrice") {
      setEditedValue(
        vendorDetails.dairyProducts[originalIndex].price.toString()
      );
    } else {
      setEditedValue(vendorDetails[key]);
    }
    setShowSaveButton(true);
  };

  const handleSave = async () => {
    console.log("Saving:", editing, "Edited Value:", editedValue);
    async function rep() {
      console.log("in rep", vendorDetails);
      const updatedData = {
        host: LoginUser.email,
        _id: products._id,
        vendorEmail: vendorDetails.vendorEmail,
        vendorLocation: vendorDetails.vendorLocation,
        phone: vendorDetails.phone,
        dairyProducts: vendorDetails.dairyProducts.map((product) => ({
          price: product.price,
          sells: product.sells,
        })),
      };
      console.log("hello");
      console.log("Updated Data:", updatedData);

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/updateVendor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Failed to update vendor details.");
        }

        const result = await response.json();
        console.log("Update successful:", result);
        // Handle successful update (e.g., show a success message)
      } catch (err) {
        console.error("Error updating vendor details:", err);
        // alert("There was an error updating the details.");
        notify("There was an error updating the details.")
      }
    }

    if (editing?.key === "dairyProductPrice") {
      if (isNaN(parseFloat(editedValue))) {
        // alert("Invalid price value. Please enter a valid number.");
        notify("Invalid price value. Please enter a valid number.");
        return;
      }
      const updatedProducts = [...vendorDetails.dairyProducts];
      updatedProducts[editing.index].price = parseFloat(editedValue);
      setVendorDetails({ ...vendorDetails, dairyProducts: updatedProducts });

      await rep();
    } else if (
      ["vendorEmail", "vendorLocation", "phone"].includes(editing?.key)
    ) {
      const updatedVendorDetails = {
        ...vendorDetails,
        [editing.key]: editedValue,
      };
      const updatedData = {
        activate: true,
        host: LoginUser.email,
        _id: products._id,
        vendorEmail: updatedVendorDetails.vendorEmail,
        vendorLocation: updatedVendorDetails.vendorLocation,
        phone: updatedVendorDetails.phone,
        dairyProducts: updatedVendorDetails.dairyProducts.map((product) => ({
          price: product.price,
          sells: product.sells,
        })),
      };
      console.log("hello");
      console.log("Updated Data:", updatedData);

      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/updateVendor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Failed to update vendor details.");
        }

        const result = await response.json();
        console.log("Update successful:", result);
        // Handle successful update (e.g., show a success message)
        setVendorDetails(updatedVendorDetails);
      } catch (err) {
        console.error("Error updating vendor details:", err);
        // alert("There was an error updating the details.");
        notify("There was an error updating the details.");
      }
      if (editing.key === "vendorEmail" || editing.key === "phone") notify("please re-login for better experience...");
    }
    setEditing(null);
    setShowSaveButton(false);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };
  const toggleSells = async (index) => {
    console.log("Toggling sells for index:", index);

    // Update the local state
    const updatedProducts = [...vendorDetails.dairyProducts];
    updatedProducts[index].sells = !updatedProducts[index].sells;
    setVendorDetails({ ...vendorDetails, dairyProducts: updatedProducts });

    // Prepare the updated data for the backend
    const updatedData = {
      _id: products._id, // Use the product's _id to identify which record to update
      vendorEmail: vendorDetails.vendorEmail,
      host: LoginUser.email,
      vendorLocation: vendorDetails.vendorLocation,
      phone: vendorDetails.phone,
      dairyProducts: updatedProducts.map((product) => ({
        price: product.price,
        sells: product.sells,
      })),
    };

    console.log("Updated Data for Sells:", updatedData);

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/updateVendor`, {
        method: "POST", // Use PUT or PATCH based on your backend
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials if required
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update vendor details.");
      }

      const result = await response.json();
      console.log("Sells update successful:", result);
      // Optionally display a success message
    } catch (err) {
      console.error(err);
      // alert("There was an error updating the sells status.");
      notify("There was an error updating the details.")
    }
  };

  const groupProducts = (category) =>
    vendorDetails.dairyProducts
      .map((product, originalIndex) => ({ ...product, originalIndex }))
      .filter((product) =>
        category === "Milk"
          ? product.name.includes("Milk")
          : category === "Ghee"
          ? product.name.includes("Ghee")
          : product.name.includes("Curd")
      );

  return (
    <div
      className="container"
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ToastContainer position="top-center" transition={Bounce} />

      <h2
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#333" }}
      >
        Manage Products and Cost
      </h2>

      {/* Vendor Information */}
      <div className="mb-4">
        <p>
          <strong>Email: </strong>
          <span
            onDoubleClick={() => handleDoubleClick("vendorEmail")}
            style={{
              cursor: "pointer",
              color: editing?.key === "vendorEmail" ? "blue" : "black",
              textDecoration:
                editing?.key === "vendorEmail" ? "underline" : "none",
            }}
          >
            {editing?.key === "vendorEmail" ? (
              <input
                type="text"
                value={editedValue}
                onChange={handleInputChange}
                autoFocus
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "5px",
                  width: "300px",
                }}
              />
            ) : (
              vendorDetails.vendorEmail
            )}
          </span>
        </p>
        <p>
          <strong>Location: </strong>
          <span
            onDoubleClick={() => handleDoubleClick("vendorLocation")}
            style={{
              cursor: "pointer",
              color: editing?.key === "vendorLocation" ? "blue" : "black",
              textDecoration:
                editing?.key === "vendorLocation" ? "underline" : "none",
            }}
          >
            {editing?.key === "vendorLocation" ? (
              <input
                type="text"
                value={editedValue}
                onChange={handleInputChange}
                autoFocus
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "5px",
                  width: "300px",
                }}
              />
            ) : (
              vendorDetails.vendorLocation
            )}
          </span>
        </p>
        <p>
          <strong>Phone Number: </strong>
          <span
            onDoubleClick={() => handleDoubleClick("phone")}
            style={{
              cursor: "pointer",
              color: editing?.key === "phone" ? "blue" : "black",
              textDecoration: editing?.key === "phone" ? "underline" : "none",
            }}
          >
            {editing?.key === "phone" ? (
              <input
                type="text"
                value={editedValue}
                onChange={handleInputChange}
                autoFocus
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  padding: "5px",
                  width: "300px",
                }}
              />
            ) : (
              vendorDetails.phone
            )}
          </span>
        </p>
      </div>
      <p style={{ textAlign: "center", fontStyle: "italic", fontSize: "18px" }}>
        Double click to edit
      </p>
      {/* Dairy Products Section */}
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
            <tbody>
              {groupProducts(category).map((product) => (
                <tr key={product.originalIndex}>
                  <td>{product.name}</td>
                  <td>
                    {editing?.key === "dairyProductPrice" &&
                    editing.index === product.originalIndex ? (
                      <input
                        type="number"
                        value={editedValue}
                        onChange={handleInputChange}
                        autoFocus
                      />
                    ) : (
                      <span
                        onDoubleClick={() =>
                          handleDoubleClick(
                            "dairyProductPrice",
                            product.originalIndex
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {product.price}
                      </span>
                    )}
                  </td>
                  <td>{product.unit}</td>
                  <td>
                    <button
                      onClick={() => toggleSells(product.originalIndex)}
                      className={`btn ${
                        product.sells ? "btn-success" : "btn-danger"
                      }`}
                      style={{
                        borderRadius: "50px",
                        padding: "5px 15px",
                        fontWeight: "bold",
                      }}
                    >
                      {product.sells ? "Yes" : "No"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {showSaveButton && (
        <div className="text-center">
          <button
            className="btn btn-success"
            onClick={handleSave}
            style={{ width: "150px", fontWeight: "bold" }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default Manage;
