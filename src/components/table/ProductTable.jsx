import React, { useState } from "react";
import { Table } from "react-table"; // Assuming this is a custom or different table component
import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel

// Generate random product data
function generateRandomProduct() {
  const categories = ["Fruits", "Vegetables", "Dairy", "Meat", "Beverages", "Snacks"];
  const names = [
    "Apple", "Banana", "Orange", "Carrot", "Broccoli", "Milk", "Cheese", "Chicken", "Beef",
    "Soda", "Chips", "Cookies", "Water", "Juice"
  ];
  const statuses = ["active", "inactive"];

  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    name: randomName,
    category: randomCategory,
    status: randomStatus
  };
}

// Create an array of 100 random products
const data = Array.from({ length: 100 }, generateRandomProduct);

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
  const filteredData = data.filter((item) =>
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
          {Array.from(new Set(data.map((item) => item.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table component */}
      <table>
        {/* Table header */}
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Status</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {/* Map over paginated data */}
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>

      {/* Export button */}
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
}

export default ProductTable;
