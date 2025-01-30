import React, { useEffect, useState, useContext } from "react";
import { User, MapPin, Phone, Mail } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../App"; // Adjust backendUrl as needed
import { ShopContext } from "../context/SellerContext";

const Profile = ({ token }) => {
  const { sellerId } = useContext(ShopContext); // Getting sellerId from context
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    address: "",
    bio: "",
    image: "", // For profile image
  });

  // Fetch profile data from API and localStorage if available
  useEffect(() => {
    const fetchProfile = async () => {
      const savedProfile = localStorage.getItem("profile");
      if (savedProfile) {
        // If profile is saved in localStorage, use it
        setProfile(JSON.parse(savedProfile));
        setFormData(JSON.parse(savedProfile));
      } else {
        // Otherwise fetch profile from API
        try {
          const response = await axios.get(
            `${backendUrl}/api/seller/sellerlist`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const matchedProfile = response.data.products.find(
            (seller) => seller.sellerId === sellerId
          );
          if (matchedProfile) {
            setProfile(matchedProfile);
            setFormData({
              name: matchedProfile.name,
              email: matchedProfile.email,
              contactNumber: matchedProfile.contactNumber || "",
              address: matchedProfile.address || "",
              bio: matchedProfile.bio || "",
              image: matchedProfile.image || "", // Placeholder for image
            });
          } else {
            console.log("Seller not found");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
  }, [sellerId]);

  // Handle form changes (editing fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevState) => ({
          ...prevState,
          image: reader.result, // Save the image as a base64 string
        }));
      };
      reader.readAsDataURL(file); // Read the file as base64
    }
  };

  // Handle saving profile to local storage
  const handleSaveProfile = () => {
    // Save the updated profile to localStorage
    localStorage.setItem("profile", JSON.stringify(formData));
    setProfile(formData); // Update profile state
    setIsEditing(false); // Stop editing
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {/* Display the uploaded or default image */}
              <img
                src={formData.image || "/default-image.png"} // Use uploaded image or fallback
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-800">
              {formData.name || "No name"}
            </h2>
          </div>
        </div>
        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="text-gray-700 border-b-2 border-gray-300 p-1 w-full"
              />
            ) : (
              <span className="text-gray-700">{formData.email}</span>
            )}
          </div>

          {/* Contact Number */}
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-500 mr-2" />
            {isEditing ? (
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="text-gray-700 border-b-2 border-gray-300 p-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {formData.contactNumber || "Not provided"}
              </span>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="text-gray-700 border-b-2 border-gray-300 p-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {formData.address || "Not provided"}
              </span>
            )}
          </div>

          {/* Bio */}
          <div className="flex items-start">
            <User className="w-5 h-5 text-gray-500 mr-2 mt-1" />
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="text-gray-700 border-b-2 border-gray-300 p-1 w-full"
              />
            ) : (
              <span className="text-gray-700">
                {formData.bio || "Not provided"}
              </span>
            )}
          </div>

          {/* Image Upload */}
          {isEditing && (
            <div>
              <label className="block text-gray-600">
                Upload Profile Image
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="mt-2"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
