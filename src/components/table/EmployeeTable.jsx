import { useMemo, useState } from "react";
// import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { Employees } from "../../data/employee";
import Avatar from "react-avatar";
import { GoDotFill, GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Modal from "../modal/Modal";

function EmployeeTable() {
  // State variables for filtering, searching, pagination, etc.
  const [showModal, setShowModal] = useState(false);
  const [jobFilter, setJobFilter] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let result = Employees;
    if (status !== "") {
      result = result.filter((item) => item.status === status);
    }
    if (jobFilter !== "") {
      result = result.filter((item) => item.jobTitleName.includes(jobFilter));
    }
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.preferredFullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [jobFilter, status, searchTerm]);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto">
      {/* UI elements for filtering, searching, pagination, and export */}
      <div className="flex items-center justify-between py-2 gap-x-4">
        <div className="flex items-center py-5 gap-x-4">
          <select
            className="ml-1 p-4 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setJobFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {Array.from(
              new Set(Employees.map((item) => item.jobTitleName))
            ).map((jobTitleName) => (
              <option className="" key={jobTitleName} value={jobTitleName}>
                {jobTitleName}
              </option>
            ))}
          </select>

          <select
            className="p-4 font-gray400 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            {Array.from(new Set(Employees.map((item) => item.status))).map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select>

          {/* Search input */}
          <input
            className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <button className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0">
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0"
          >
            New User
          </button>
        </div>
        {/* Category filter dropdown */}
      </div>

      {/* Table component */}
      <div className="overflow-auto rounded-lg border border-gray300 bg-neutral">
        <table className="w-full">
          {/* Table header */}
          <thead className="bg-gray300">
            <tr>
              <th className="px-6 py-3 text-left">FullName</th>
              <th className="px-6 py-3 text-left">Job Title</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left whitespace-nowrap">
                Region Code
              </th>
              <th className="px-6 py-3 text-left whitespace-nowrap">
                User Code
              </th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map over paginated data */}
            {paginatedData.map((item) => (
              <tr key={item.userId} className="border-b border-gray300">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <Avatar name={item.firstName} size="60" round="50px" />
                  <div className="ml-2">
                    <span className="text-md font-semibold">
                      {item.preferredFullName}
                    </span>
                    <br />
                    <span className="text-sm text-slate500">
                      {item.emailAddress}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.jobTitleName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.phoneNumber}
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

                <td className="px-6 py-4 whitespace-nowrap">{item.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.employeeCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-2xl text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <FaEye />
                  </button>
                  <button className="text-2xl text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <CiEdit />
                  </button>
                  <button className="text-2xl text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <GoTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-end mt-4 gap-x-2">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray300"
              : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
          } p-2 text-2xl  rounded-full`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <MdNavigateBefore />
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          className={`${
            currentPage === totalPages
              ? "bg-gray300"
              : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
          } p-2 text-2xl  rounded-full mr-2`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <MdNavigateNext />
        </button>
      </div>

      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default EmployeeTable;
