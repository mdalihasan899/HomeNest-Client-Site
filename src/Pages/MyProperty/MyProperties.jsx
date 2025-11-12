import React, { useEffect, useState } from "react";
import { auth } from '../../Firebase/firebase.config';
import { onAuthStateChanged, } from 'firebase/auth';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyProperties = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch data from API
  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Force refresh to get latest user data
        try {
          await currentUser.reload();
          const updatedUser = auth.currentUser;
          setUser({
            uid: updatedUser.uid,
            email: updatedUser.email,
            displayName: updatedUser.displayName,
            photoURL: updatedUser.photoURL,
            emailVerified: updatedUser.emailVerified,
          });
        } catch (error) {
          console.error('Error refreshing user:', error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  const filteredProperties = properties?.filter(prop => prop.seller_email === user?.email)

  const delateProperty = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/properties/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });

              // 
              const remainingProperties = properties.filter(property => property._id !== _id);
              setProperties(remainingProperties);
            }
          })

      }
    });
  };



  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">My Properties</h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="border rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
            >
              <img
                src={property.Image}
                alt={property.Property_Name}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">
                {property.Property_Name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{property.Category}</p>
              <p className="font-medium text-gray-800 mb-1 flex items-center">
                💰 Price: <span className=" flex items-center ml-1"> <FaBangladeshiTakaSign />{property.Price} </span>
              </p>
              <p className="text-gray-600 mb-2">📍 {property.Location}</p>
              <p className="text-sm text-gray-500">
                Seller: {property.seller_name}
              </p>

              <div className=" flex justify-between">
                <Link to={`/update-property/:id`}>
                  <button className="btn">Update</button></Link>

                <button onClick={() => delateProperty(property._id)} className="btn">Delate</button>

                <Link to={`/property/:id`}>
                  <button className="btn">See Details</button>
                </Link>
              </div>
            </div>


          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
