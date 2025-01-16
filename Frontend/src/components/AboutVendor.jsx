import React, { useEffect, useState, useRef, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import { userContext } from "../context/userContext";

const AboutVendor = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("vendoremail"));
  const [vendorDiaryData, setVendorDiaryData] = useState(null);
    const { LoginUser } = useContext(userContext);
  
  const [vendorProfileData, setVendorProfileData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const initializeMapWithRoute = (vendor, user) => {
    // Create the map instance and set the initial view
    const map = L.map("map").setView(
      [vendor.lat, user.lng],
      13
    );

    // Add OpenStreetMap tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Create and add marker for vendor
    const vendorMarker = L.marker([
      vendor.lat,
      vendor.lng,
    ]).addTo(map);
    vendorMarker.bindPopup("<b>Vendor Location</b>").openPopup();

    // Create and add marker for user
    const userMarker = L.marker([user.lat, user.lng]).addTo(
      map
    );
    userMarker.bindPopup("<b>User Location</b>").openPopup();

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(vendor.lat, vendor.lng),
        L.latLng(user.lat, user.lng),
      ],
      routeWhileDragging: false, // Disable dragging of route
      show: false, // Hide the routing panel
      createMarker: () => null, // Disable waypoint markers
    });

    // Listen for the 'routesfound' event and manually add the route
    routingControl.on("routesfound", (e) => {
      // Clear any existing route if present
      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      const route = e.routes[0];
      const routePolyline = L.polyline(route.coordinates, {
        color: "blue",
        weight: 5,
      }).addTo(map); // Add the new route

      // Adjust map bounds to fit the route
      map.fitBounds(routePolyline.getBounds());

      // Calculate the midpoint of the route
      const routeCoordinates = route.coordinates;
      const midpointIndex = Math.floor(routeCoordinates.length / 2); // Get the middle point of the route
      const midpoint = routeCoordinates[midpointIndex];

      // Add popup at the midpoint of the route
      const distance = vendorLatLng.distanceTo(userLatLng); // Distance in meters
      const distanceInKm = (distance / 1000).toFixed(2); // Convert meters to kilometers
      const distancePopupText = `Shortest Distance: ${distanceInKm} km`;

      const midpointPopup = L.popup({
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
      })
        .setLatLng(midpoint) // Position the popup at the midpoint
        .setContent(distancePopupText)
        .openOn(map);
    });

    // Trigger the route calculation without showing the UI
    routingControl.route();

    // Calculate the shortest distance between vendor and user
    const vendorLatLng = L.latLng(vendor.lat, vendor.lng);
    const userLatLng = L.latLng(user.lat, user.lng);

    const distance = vendorLatLng.distanceTo(userLatLng); // Distance in meters
    console.log("Shortest Distance:", distance);

    // Return the map instance in case you need to cleanup or interact with it later
    return map;
  };

  const AboutVendor = (vendor,user) => {
    // const vendor = {
    //   address: { lat: 12.9716, lng: 77.5946 }, // Vendor's address
    // };

    // const user = {
    //   address: { lat: 13.0827, lng: 83.2707 }, // User's address
    // };

    useEffect(() => {
      // Call the function to initialize the map and add the route
      const map = initializeMapWithRoute(vendor, user);

      // Cleanup when component unmounts
      return () => {
        if (map) {
          map.remove(); // Clean up the map instance
        }
      };
    }, [vendor, user]);

    return <div id="map" style={{ height: "400px", width: "100%" }}></div>;
  };

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
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/getdiaryproducts`, {
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
        console.error(err.message);
      }
    };

    const fetchProfileData = async () => {
      const give = {
        givenby: email,
      };
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASE_URL}/getnormalinfo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(give),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setVendorProfileData(data[0]);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchDiaryData();
    fetchProfileData();
  }, [email]);
  console.log(vendorProfileData)
console.log(vendorDiaryData)

  useEffect(() => {
    if (vendorDiaryData) {
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

  let vendor = {
    name: "Vendor Name",
    certified: true,
    rating: 4.5,
    email: "vendor@example.com",
    phone: "+1234567890",
    location: "Vendor Address, City, Country",
    address: {
      lat: "12.9716",
      lng: "77.5946",
    },
    userAddress: {
      lat: "13.0827",
      lng: "87.2707",
    },
  };

  if (vendorProfileData && !!LoginUser) {
    vendor = {
      name: `${vendorProfileData.firstname} ${vendorProfileData.lastname}`,
      certified: vendorProfileData.isCertified,
      rating: vendorProfileData.rating,
      email: vendorProfileData.email,
      phone: vendorProfileData.phone,
      location: vendorProfileData.address,
      address: {
        lat: vendorProfileData.lat ,
        lng: vendorProfileData.lng,
      },
      userAddress: {
        lat: LoginUser.lat,
        lng: LoginUser.lng,
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>{vendor.name}</h1>
          <p style={{ fontStyle: "italic", color: "#333", fontSize: "20px" }}>
            {vendor.certified ? "Certified Vendor" : ""}
          </p>
        </div>

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

        <div style={{ marginBottom: "30px" }}>
          <h3>Location</h3>
          {AboutVendor(vendor.address,vendor.userAddress)}
        </div>
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
