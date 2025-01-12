import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

const Manage = () => {
  const [editing, setEditing] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const { LoginUser } = useContext(userContext);
  const [products, setProducts] = useState(null);
  const [vendorDetails, setVendorDetails] = useState({
    email: "abc@gmail.com",
    location: "123 Vendor Street, City, Country",
    phoneNumber: "123-456-7890",
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
        const response = await fetch("http://localhost:3000/getdiaryproducts", {
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

        console.log("products", products);
      } catch (err) {
        // setError(err.message);
      }
    };
    fetchRatings();
  }, [LoginUser]);

  useEffect(() => {
    if (products) {
      console.log(products.cowMilkSells);
      setVendorDetails({
        email: products.vendorEmail || "akhileshchikatla6@gmail.com",
        location: products.vendorLocation || "123 Vendor Street, City, Country",
        phoneNumber: products.phone || "123-456-7890",
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
              sells: products.buffaloMikSells,
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
              sells: products.bufffaloGheeSells,
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

  const handleSave = () => {
    console.log("Saving:", editing, "Edited Value:", editedValue);
    if (editing?.key === "dairyProductPrice") {
      if (isNaN(parseFloat(editedValue))) {
        alert("Invalid price value. Please enter a valid number.");
        return;
      }
      const updatedProducts = [...vendorDetails.dairyProducts];
      updatedProducts[editing.index].price = parseFloat(editedValue);
      setVendorDetails({ ...vendorDetails, dairyProducts: updatedProducts });
    } else {
      setVendorDetails({ ...vendorDetails, [editing.key]: editedValue });
    }
    setEditing(null);
    setShowSaveButton(false);
  };

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const toggleSells = (index) => {
    console.log("Toggling sells for index:", index);
    const updatedProducts = [...vendorDetails.dairyProducts];
    updatedProducts[index].sells = !updatedProducts[index].sells;
    setVendorDetails({ ...vendorDetails, dairyProducts: updatedProducts });
    setShowSaveButton(true);
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
            onDoubleClick={() => handleDoubleClick("email")}
            style={{
              cursor: "pointer",
              color: editing?.key === "email" ? "blue" : "black",
              textDecoration: editing?.key === "email" ? "underline" : "none",
            }}
          >
            {editing?.key === "email" ? (
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
              vendorDetails.email
            )}
          </span>
        </p>
        <p>
          <strong>Location: </strong>
          <span
            onDoubleClick={() => handleDoubleClick("location")}
            style={{
              cursor: "pointer",
              color: editing?.key === "location" ? "blue" : "black",
              textDecoration:
                editing?.key === "location" ? "underline" : "none",
            }}
          >
            {editing?.key === "location" ? (
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
              vendorDetails.location
            )}
          </span>
        </p>
        <p>
          <strong>Phone Number: </strong>
          <span
            onDoubleClick={() => handleDoubleClick("phoneNumber")}
            style={{
              cursor: "pointer",
              color: editing?.key === "phoneNumber" ? "blue" : "black",
              textDecoration:
                editing?.key === "phoneNumber" ? "underline" : "none",
            }}
          >
            {editing?.key === "phoneNumber" ? (
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
              vendorDetails.phoneNumber
            )}
          </span>
        </p>
      </div>

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
