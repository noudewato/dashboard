import React, { useState } from "react";
import { Table } from "react-table"; // Assuming this is a custom or different table component
import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { FaEye } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { GoDotFill, GoTrash } from "react-icons/go";
import Avatar from "react-avatar";

// Generate random product data
function generateRandomProduct() {
  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Meat",
    "Beverages",
    "Snacks",
  ];
  const names = [
    "Apple",
    "Banana",
    "Orange",
    "Carrot",
    "Broccoli",
    "Milk",
    "Cheese",
    "Chicken",
    "Beef",
    "Soda",
    "Chips",
    "Cookies",
    "Water",
    "Juice",
  ];
  const statuses = ["active", "inactive"];

  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: randomName,
    category: randomCategory,
    status: randomStatus,
  };
}

// Create an array of 100 random products
const data = Array.from({ length: 193 }, generateRandomProduct);

function ProductTable() {
  // State variables for filtering, searching, pagination, etc.
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Function to update product status
  const updateStatus = (id, status) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status } : item
    );
    // Update the data state with the updated status
    setData(updatedData);
  };

  // Export table data to Excel
  const handleExport = () => {
    exportToExcel(data, "products.xlsx");
  };

  // Filtered and paginated data
  const filteredData = data.filter(
    (item) =>
      item.category.includes(categoryFilter) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      {/* UI elements for filtering, searching, pagination, and export */}
      <div>
        {/* Category filter dropdown */}
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {/* Map over unique product categories */}
          {Array.from(new Set(data.map((item) => item.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded-lg border border-gray300 bg-neutral">
        <table className="w-full">
          {/* Table header */}
          <thead className="bg-gray300">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map over paginated data */}
            {paginatedData.map((item) => (
              <tr key={item.id} className="border-b border-gray300">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <Avatar name={item.name} size="60" round="50px" />
                  <div className="ml-2">
                    <span className="text-md font-semibold">{item.name}</span>
                    <br />
                    <span className="text-sm text-slate500">
                      {item.category}
                    </span>
                  </div>
                </td>
                {item.status === "active" ? (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center px-4 py-1 border rounded-2xl border-lime500 text-lime500">
                      <span className="pe-1 text-lime500">
                        <GoDotFill />
                      </span>
                      Active
                    </span>
                  </td>
                ) : (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="flex items-center px-4 py-1 border rounded-2xl">
                      <span className="pe-1">
                        <GoDotFill />
                      </span>
                      Ineactive
                    </span>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-2xl text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <FaEye />
                  </button>
                  <button className="text-2xl text-lime500 hover:text-lime500 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <CiEdit />
                  </button>
                  <button className="text-2xl text-red hover:text-red transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <GoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Export button */}
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
}

export default ProductTable;
