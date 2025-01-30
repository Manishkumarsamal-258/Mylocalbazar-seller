import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Initialize sellerId from localStorage or set it to null if not available
  const [sellerId, setSellerId] = useState(
    localStorage.getItem("sellerId") || null
  );

  // Effect to update localStorage when sellerId changes
  useEffect(() => {
    if (sellerId) {
      localStorage.setItem("sellerId", sellerId); // Save sellerId to localStorage
    } else {
      localStorage.removeItem("sellerId"); // Remove sellerId from localStorage if null
    }
  }, [sellerId]); // Only update localStorage when sellerId changes

  const value = {
    sellerId, // Expose sellerId
    setSellerId, // Expose the setter to update sellerId
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
