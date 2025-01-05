import React, { useState } from "react";

const BecomeCertifiedVendor = () => {
  const [imageUrl, setImageUrl] = useState();

  const handleImageUpload = (event) => {
    console.log("in method want");

    const file = event.target.files[0];
    console.log("file", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        // console.log(base64String);
        setImageUrl(base64String); // Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessAddress: "",
    hasOtherBusiness: false, // Boolean
    dairyReport: null,
  });

  const [message, setMessage] = useState("");

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "radio" && name === "hasOtherBusiness"
          ? checked && value === "true"
          : value,
    });
  };

  // Handle file upload
  // const handleFileChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     dairyReport: e.target.files[0],
  //   });
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.businessAddress ||
      formData.hasOtherBusiness === undefined
    ) {
      setMessage("Please fill out all fields and upload the required report.");
      return;
    }
    formData.imageUrl = imageUrl;
    console.log(formData);
    try {
      let response = await fetch("http://localhost:3000/certifyvendor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      let content = await response.json();
      console.log("Server response:", content);

      if (content.success) {
        alert(content.msg);
      } else {
        alert("Application failed to submit");
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#333" }}
      >
        Become a Certified Vendor
      </h2>
      <p
        className="text-center mb-4"
        style={{ color: "#555", fontSize: "16px" }}
      >
        Fill out the form below to apply for certification as a trusted vendor.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={{ padding: "10px", fontSize: "15px" }}
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            style={{ padding: "10px", fontSize: "15px" }}
          />
        </div>

        {/* Phone Field */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            style={{ padding: "10px", fontSize: "15px" }}
          />
        </div>

        {/* Business Address */}
        <div className="mb-3">
          <label htmlFor="businessAddress" className="form-label">
            Business Address
          </label>
          <textarea
            className="form-control"
            id="businessAddress"
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
            placeholder="Enter your business address"
            rows="3"
            required
            style={{ padding: "10px", fontSize: "15px" }}
          ></textarea>
        </div>

        {/* Other Business Radio Buttons */}
        <div className="mb-3">
          <label className="form-label">Do you have another business?</label>
          <div>
            <label className="form-check-label me-3">
              <input
                type="radio"
                className="form-check-input"
                name="hasOtherBusiness"
                value={true}
                checked={formData.hasOtherBusiness === true}
                onChange={handleChange}
                required
              />{" "}
              Yes
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                className="form-check-input"
                name="hasOtherBusiness"
                value={false}
                checked={formData.hasOtherBusiness === false}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* Dairy Report Upload */}
        <div className="mb-3">
          <label htmlFor="dairyReport" className="form-label">
            Upload Dairy Report
          </label>
          <input
            type="file"
            className="form-control"
            id="dairyReport"
            onChange={(e) => handleImageUpload(e)}
            required
            style={{ padding: "10px", fontSize: "15px" }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              padding: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#007bff",
            }}
          >
            Submit Application
          </button>
        </div>
      </form>

      {/* Submission Message */}
      {message && (
        <div
          className="text-center mt-4"
          style={{
            color: message.includes("successfully") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BecomeCertifiedVendor;
