import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2"; // Import Line chart here
import "chart.js/auto";
import { ShoppingCart, Home, User } from "lucide-react"; // Specific icons from lucide-react

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/list")
      .then((response) => {
        const fetchedData = Array.isArray(response.data.products)
          ? response.data.products
          : [];
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Process the data into charts and stats
  const productCategories = data.reduce((acc, product) => {
    const category = product.category;
    if (acc[category]) {
      acc[category]++;
    } else {
      acc[category] = 1;
    }
    return acc;
  }, {});

  const categoryLabels = Object.keys(productCategories);
  const categoryValues = Object.values(productCategories);

  // Bar chart data
  const barChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Product Categories",
        data: categoryValues,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line chart data (for example, price trend over time)
  const lineChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Price Trend",
        data: categoryValues.map(() => Math.floor(Math.random() * 100) + 20), // Random data for demonstration
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-5 bg-gray-100">
      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pie Chart Section */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Product Categories (Pie)
              </h3>
              <Pie data={barChartData} />
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Product Categories (Bar)
              </h3>
              <Bar data={barChartData} />
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Price Trend (Line)
              </h3>
              <Line data={lineChartData} /> {/* Line chart is rendered here */}
            </div>
          </div>

          {/* Product List Section */}
          <div className="col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Product List
              </h3>
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-gray-700">Name</th>
                    <th className="py-2 px-4 border-b text-gray-700">
                      Category
                    </th>
                    <th className="py-2 px-4 border-b text-gray-700">Price</th>
                    <th className="py-2 px-4 border-b text-gray-700">
                      Market Name
                    </th>
                    <th className="py-2 px-4 border-b text-gray-700">
                      Store Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="py-2 px-4 border-b">{product.name}</td>
                      <td className="py-2 px-4 border-b">{product.category}</td>
                      <td className="py-2 px-4 border-b">{product.price}</td>
                      <td className="py-2 px-4 border-b">
                        {product.marketName}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {product.storeAddress.street}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
