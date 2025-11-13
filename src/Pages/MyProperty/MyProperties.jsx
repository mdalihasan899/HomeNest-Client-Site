import React, { useEffect, useState } from "react";
import { auth } from '../../Firebase/firebase.config';
import { onAuthStateChanged, } from 'firebase/auth';
import { TbCurrencyTaka, TbEdit, TbEye, TbHome, TbMapPin, TbStar, TbTrash } from "react-icons/tb";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyProperties = () => {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  ); 


  // Fetch data from API
  useEffect(() => {
    fetch("https://book-management-server-psi.vercel.app/properties")
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

  const deleteProperty = (_id) => {
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
        fetch(`https://book-management-server-psi.vercel.app/properties/${_id}`, {
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
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <h1 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>My Properties</h1>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <div className={`max-w-md mx-auto p-8 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <TbHome className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>No Properties Found</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>You haven't listed any properties yet.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className={`group rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border ${darkMode
                  ? 'bg-gray-800 border-gray-700 hover:border-blue-600'
                  : 'bg-white border-gray-100 hover:border-blue-200'
                }`}
            >
              {/* Image Section with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <img
                    src={property.Image}
                    alt={property.Property_Name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    {property.Category}
                  </span>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Property Title and Rating */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-xl font-bold line-clamp-1 flex-1 mr-4 ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {property.Property_Name}
                  </h3>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                    }`}>
                    <TbStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm font-bold ${darkMode ? 'text-blue-300' : 'text-blue-700'
                      }`}>
                      {property.Rating || 0}
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <TbMapPin className={`w-4 h-4 mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-500'
                    }`} />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {property.Location}
                  </span>
                </div>

                {/* Description and Price */}
                <div className="flex justify-between items-start mb-6">
                  <p className={`text-sm line-clamp-2 leading-relaxed w-2/3 ${darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    {property.Description}
                  </p>
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      Starting From
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                      BDT {property.Price}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700 gap-3">
                  {/* Update Button */}
                  <Link to={`/update-property/${property._id}`} className="flex-1">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <TbEdit className="w-4 h-4" />
                      Update
                    </button>
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProperty(property._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <TbTrash className="w-4 h-4" />
                    Delete
                  </button>

                  {/* View Details Button */}
                  <Link to={`/property/${property._id}`} className="flex-1">
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
