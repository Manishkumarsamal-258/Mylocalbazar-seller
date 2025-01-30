import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "../context/SellerContext";

const List = ({ token }) => {
  const { sellerId } = useContext(ShopContext); // This correctly fetches sellerId from the context
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      const products = response.data.products;

      const filteredProducts = products.filter(
        (product) => product.sellerId === sellerId
      );

      if (response.data.success) {
        setList(filteredProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch list");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product removed successfully");
        await fetchList();
      } else {
        toast.error("Failed to remove product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product");
    }
  };

  useEffect(() => {
    fetchList();
  }, [sellerId]);

  return (
    <>
      <p className="mb-2 font-bold text-lg">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm "
          >
            <img
              src={item.image?.[0] || "/placeholder-image.png"}
              alt={item.name}
              className="w-12 "
            />
            <p className="">{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
