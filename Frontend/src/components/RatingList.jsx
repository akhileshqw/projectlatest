import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");
  const { LoginUser } = useContext(userContext);

  // State for image viewer
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Fetch data from the backend
    const fetchRatings = async () => {
      if (!LoginUser || !LoginUser.email) {
        return;
      }

      const give = {
        givenby: LoginUser.email,
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/ratingsdata`, {
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
        setRatings(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRatings();
  }, [LoginUser]);

  // Open the image viewer
  const openImageViewer = (src) => {
    setImageSrc(src);
    setIsViewerOpen(true);
  };

  // Close the image viewer
  const closeImageViewer = () => {
    setIsViewerOpen(false);
    setImageSrc("");
  };

  if (!LoginUser) {
    return <div className="text-center mt-4">Loading user data...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">View your Ratings</h2>
      {ratings.length === 0 ? (
        <div className="text-center">No ratings available</div>
      ) : (
        <div className="row">
          {ratings.map((rating) => (
            <div
              key={rating._id}
              className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                className="card shadow-lg"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Top-left Heading */}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#ff4500",
                    color: "#fff",
                    padding: "5px 10px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  Payment Proof
                </span>

                {/* Image Section */}
                {rating.imageUrl && (
                  <img
                    src={rating.imageUrl}
                    alt="Vendor"
                    className="card-img-top"
                    style={{
                      height: "250px",
                      objectFit: "cover",
                      borderBottom: "2px solid #f1f1f1",
                      cursor: "pointer",
                    }}
                    onClick={() => openImageViewer(rating.imageUrl)}
                  />
                )}

                <div className="card-body" style={{ padding: "20px" }}>
                  <h5
                    className="card-title text-center mb-3"
                    style={{ fontWeight: "bold", color: "#333" }}
                  >
                    Vendor Name: {rating.vendorName}
                  </h5>

                  <p
                    className="card-text text-center mb-3"
                    style={{ fontSize: "15px", color: "#555" }}
                  >
                    <strong>Email:</strong> {rating.vendorEmail}
                  </p>

                  <hr style={{ borderColor: "#ddd" }} />

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p
                      className="card-text"
                      style={{ marginBottom: "0", color: "#444" }}
                    >
                      <strong>Rating:</strong> {rating.rating} / 5
                    </p>
                    <p
                      className="card-text"
                      style={{ marginBottom: "0", color: "#888" }}
                    >
                      <small>
                        {rating.createdAt &&
                          `Reviewed on ${new Date(
                            rating.createdAt
                          ).toLocaleDateString()}`}
                      </small>
                    </p>
                  </div>

                  <div style={{ marginTop: "10px", color: "#555" }}>
                    <p className="card-text">
                      <strong>Comments:</strong>
                    </p>
                    <p className="card-text" style={{ fontStyle: "italic" }}>
                      {rating.comments}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {isViewerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <img
            src={imageSrc}
            alt="Fullscreen"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "20px",
              right: "30px",
              fontSize: "40px",
              color: "#fff",
              cursor: "pointer",
              width: "50px",
              height: "50px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              transition: "background-color 0.3s",
            }}
            onClick={closeImageViewer}
          >
            ×
          </span>
        </div>
      )}
    </div>
  );
};

export default RatingList;
