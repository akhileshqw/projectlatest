import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/userContext";

const RatingList = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState("");
  const { LoginUser } = useContext(userContext);

  useEffect(() => {
    // Fetch data from the backend

    const fetchRatings = async () => {
      if (!LoginUser || !LoginUser.email) {
        return;
      }

      console.log("before above");
      console.log(LoginUser);
      // console.log("in abovee ", LoginUser, LoginUser.email);
      const give = {
        givenby: LoginUser.email,
      };
      try {
        const response = await fetch("http://localhost:3000/ratingsdata", {
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
        console.log(data);
        setRatings(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRatings();
  }, [LoginUser]);
  // console.log("in rl:",LoginUser)
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
          <div className="row">
            <div className="row">
              <div className="row">
                <div className="row">
                  <div className="row">
                    {ratings.map((rating) => (
                      <div
                        key={rating._id}
                        className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4"
                        style={{ display: "flex", justifyContent: "center" }} // Center the cards in their column
                      >
                        <div
                          className="card shadow-lg"
                          style={{
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "12px",
                            overflow: "hidden",
                          }}
                        >
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
                              }}
                            />
                          )}

                          {/* Details Section */}
                          <div
                            className="card-body"
                            style={{ padding: "20px" }}
                          >
                            <h4
                              className="card-title text-center mb-3"
                              style={{ fontWeight: "bold", color: "#333" }}
                            >
                              {rating.vendorName}
                            </h4>

                            {/* Vendor Details */}
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
                              <p
                                className="card-text"
                                style={{ fontStyle: "italic" }}
                              >
                                {rating.comments}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingList;
