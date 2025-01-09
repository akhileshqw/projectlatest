import React, { useEffect, useState } from "react";

const Manage = () => {
  const [vendorDetails, setVendorDetails] = useState({
    email: "vendor@example.com",
    location: "123 Vendor Street, City, Country",
    phoneNumber: "123-456-7890", // Added phone number
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

  const [editing, setEditing] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleDoubleClick = (key, index = null) => {
    setEditing({ key, index });
    if (key === "dairyProductPrice") {
      setEditedValue(vendorDetails.dairyProducts[index].price);
    } else {
      setEditedValue(vendorDetails[key]);
    }
    setShowSaveButton(true);
  };

  const handleSave = () => {
    if (editing?.key === "dairyProductPrice") {
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
    const updatedProducts = [...vendorDetails.dairyProducts];
    updatedProducts[index].sells = !updatedProducts[index].sells;
    setVendorDetails({ ...vendorDetails, dairyProducts: updatedProducts });
    setShowSaveButton(true);
  };

  useEffect(() => {
    console.log("Fetched vendor details", vendorDetails);
  }, []);

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

      {/* Instruction for editing */}
      <p
        style={{
          fontStyle: "italic",
          color: "#555",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Double-click on any item to edit.
      </p>

      {/* Dairy Products Table */}
      <h4 style={{ color: "#555" }}>Dairy Products</h4>
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
          {/* Milk Section */}
          <tr>
            <th
              colSpan="4"
              style={{ textAlign: "center", backgroundColor: "#f2f2f2" }}
            >
              Milk Section
            </th>
          </tr>
          {vendorDetails.dairyProducts
            .map((product, originalIndex) => ({ ...product, originalIndex }))
            .filter((product) => product.name.includes("Milk"))
            .map((product) => (
              <tr key={product.originalIndex}>
                <td>{product.name}</td>
                <td
                  onDoubleClick={() =>
                    handleDoubleClick("dairyProductPrice", product.originalIndex)
                  }
                  style={{
                    cursor: "pointer",
                    color:
                      editing?.index === product.originalIndex
                        ? "blue"
                        : "black",
                    textDecoration:
                      editing?.index === product.originalIndex
                        ? "underline"
                        : "none",
                  }}
                >
                  {editing?.key === "dairyProductPrice" &&
                  editing?.index === product.originalIndex ? (
                    <input
                      type="number"
                      value={editedValue}
                      onChange={handleInputChange}
                      autoFocus
                      style={{
                        width: "80px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "3px",
                      }}
                    />
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td>{product.unit}</td>
                <td
                  onClick={() => toggleSells(product.originalIndex)}
                  style={{
                    cursor: "pointer",
                    color: product.sells ? "green" : "red",
                  }}
                >
                  {product.sells ? "Yes" : "No"}
                </td>
              </tr>
            ))}

          {/* Ghee Section */}
          <tr>
            <th
              colSpan="4"
              style={{ textAlign: "center", backgroundColor: "#f2f2f2" }}
            >
              Ghee Section
            </th>
          </tr>
          {vendorDetails.dairyProducts
            .map((product, originalIndex) => ({ ...product, originalIndex }))
            .filter((product) => product.name.includes("Ghee"))
            .map((product) => (
              <tr key={product.originalIndex}>
                <td>{product.name}</td>
                <td
                  onDoubleClick={() =>
                    handleDoubleClick("dairyProductPrice", product.originalIndex)
                  }
                  style={{
                    cursor: "pointer",
                    color:
                      editing?.index === product.originalIndex
                        ? "blue"
                        : "black",
                    textDecoration:
                      editing?.index === product.originalIndex
                        ? "underline"
                        : "none",
                  }}
                >
                  {editing?.key === "dairyProductPrice" &&
                  editing?.index === product.originalIndex ? (
                    <input
                      type="number"
                      value={editedValue}
                      onChange={handleInputChange}
                      autoFocus
                      style={{
                        width: "80px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "3px",
                      }}
                    />
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td>{product.unit}</td>
                <td
                  onClick={() => toggleSells(product.originalIndex)}
                  style={{
                    cursor: "pointer",
                    color: product.sells ? "green" : "red",
                  }}
                >
                  {product.sells ? "Yes" : "No"}
                </td>
              </tr>
            ))}

          {/* Curd Section */}
          <tr>
            <th
              colSpan="4"
              style={{ textAlign: "center", backgroundColor: "#f2f2f2" }}
            >
              Curd Section
            </th>
          </tr>
          {vendorDetails.dairyProducts
            .map((product, originalIndex) => ({ ...product, originalIndex }))
            .filter((product) => product.name.includes("Curd"))
            .map((product) => (
              <tr key={product.originalIndex}>
                <td>{product.name}</td>
                <td
                  onDoubleClick={() =>
                    handleDoubleClick("dairyProductPrice", product.originalIndex)
                  }
                  style={{
                    cursor: "pointer",
                    color:
                      editing?.index === product.originalIndex
                        ? "blue"
                        : "black",
                    textDecoration:
                      editing?.index === product.originalIndex
                        ? "underline"
                        : "none",
                  }}
                >
                  {editing?.key === "dairyProductPrice" &&
                  editing?.index === product.originalIndex ? (
                    <input
                      type="number"
                      value={editedValue}
                      onChange={handleInputChange}
                      autoFocus
                      style={{
                        width: "80px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        padding: "3px",
                      }}
                    />
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td>{product.unit}</td>
                <td
                  onClick={() => toggleSells(product.originalIndex)}
                  style={{
                    cursor: "pointer",
                    color: product.sells ? "green" : "red",
                  }}
                >
                  {product.sells ? "Yes" : "No"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
