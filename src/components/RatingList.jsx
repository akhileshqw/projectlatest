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
          {ratings.map((rating) => (
            <div key={rating._id} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                {/* Image */}
                {rating.imageUrl && (
                  <img
                    src={rating.imageUrl} // Adjust based on your backend's file serving logic
                    alt="Vendor"
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  {/* Vendor Name */}
                  <h5 className="card-title">{rating.vendorName}</h5>

                  {/* Vendor Email */}
                  <p className="card-text">
                    <strong>Email:</strong> {rating.vendorEmail}
                  </p>

                  {/* Rating */}
                  <p className="card-text">
                    <strong>Rating:</strong> {rating.rating} / 5
                  </p>

                  {/* Comments */}
                  <p className="card-text">
                    <strong>Comments:</strong> {rating.comments}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RatingList;
