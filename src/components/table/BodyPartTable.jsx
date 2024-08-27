import { useMemo, useState } from "react";
// import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { MeasurementTypes } from "../../data/measurementType";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";

function BodyPartTable() {
  // State variables for filtering, searching, pagination, etc.
  const [showModal, setShowModal] = useState(false);
  // const [jobFilter, setJobFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let result = MeasurementTypes;
    // if (status !== "") {
    //   result = result.filter((item) => item.status === status);
    // }
    // if (jobFilter !== "") {
    //   result = result.filter((item) => item.jobTitleName.includes(jobFilter));
    // }
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [searchTerm]);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container p-5 mx-auto rounded-2xl overflow-hidden border-2">
      {/* UI elements for filtering, searching, pagination, and export */}
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center pb-4 gap-x-4">
          {/* <select
            className="ml-1 p-4 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setJobFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {Array.from(
              new Set(MeasurementTypes.map((item) => item.jobTitleName))
            ).map((jobTitleName) => (
              <option className="" key={jobTitleName} value={jobTitleName}>
                {jobTitleName}
              </option>
            ))}
          </select> */}
          <input
            className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* <select
            className="p-4 font-gray400 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            {Array.from(new Set(MeasurementTypes.map((item) => item.status))).map(
              (status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              )
            )}
          </select> */}

          {/* Search input */}
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <button className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0">
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0"
          >
            Add Fashion Type
          </button>
        </div>
        {/* Category filter dropdown */}
      </div>

      {/* Table component */}
      <div className="overflow-auto rounded-lg border-gray300 bg-neutral border-2">
        <table className="w-full">
          {/* Table header */}
          <thead className="bg-gray300">
            <tr>
              <th className="px-6 py-3 text-left">No.</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Note</th>
              <th className="px-4 py-3 text-left">CreatedBy</th>

              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map over paginated data */}
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-b  items-center border-gray300"
              >
                <td className="px-4 py-2 whitespace-nowrap flex items-center">
                  {item.id}
                </td>

                <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.note}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.createdBy}
                </td>

                <td className="px-4 py-2 items-center whitespace-nowrap">
                  <Link
                    to={`measurements/${item.id}`}
                    className="text-lg border border-purple bg-purple px-3 py-1 rounded-lg text-gray-900 hover:text-neutral mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
                  >
                    Measures
                  </Link>
                  <button className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <FaEye />
                  </button>
                  <button className="text-lg text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <CiEdit />
                  </button>
                  <button className="text-lg text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
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

export default BodyPartTable;
