import React, { useMemo, useState } from "react";
// import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { MeasurementTypes } from "../../data/measurementType";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import Modal from "../modal/Modal";
// import { Link } from "react-router-dom";

function MeasurementTypeTable() {
  // State variables for filtering, searching, pagination, etc.
  const [showModal, setShowModal] = useState(false);
  // const [jobFilter, setJobFilter] = useState("");
  // const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);

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

  const toggleRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  return (
    <div className="container p-5 mx-auto">
      <div className="container p-5 mx-auto overflow-hidden border-b-2 rounded-2xl">
        {" "}
        <div className="flex justify-left items-center">
          <div className="border-2 rounded-2xl p-2 my-2 w-[150px] bg-neutral">
            <img
              className="rounded-lg"
              src="https://alexis.lindaikejisblog.com/photos/shares/20240413_180741_1713028409.jpg"
              alt="saed"
              width="150px"
              height="100px"
            />
          </div>

          <div>
            <div className="px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    John Doe
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Phone number
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    (123) 456-7890
                  </dd>
                </div>
                <div className="py-3 sm:py-5 items-center sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    123 Main St Anytown, USA 12345
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div>
            <div className="px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Measurement Date
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    20-Jun-2023
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Measurement Time
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    11:30:90 AM
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Measurement Unit
                  </dt>
                  <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Inches (In)
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral">
        <div className="px-4 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-md font-bold text-gray-500">Measurement</dt>
              <dd className="text-md font-bold text-gray-500">Size</dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Date
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                20-Jun-2023
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Time
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                11:30:90 AM
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Unit
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Inches (In)
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Unit
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Inches (In)
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Unit
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Inches (In)
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Measurement Unit
              </dt>
              <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Inches (In)
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

// export default MeasurementTypeTable;
// import { useMemo, useState } from "react";
// import { GoDotFill, GoTrash } from "react-icons/go";
// import { MeasurementTypes } from "../../data/measurementType";
// import { CiEdit } from "react-icons/ci";
// import { FaEye } from "react-icons/fa6";
// import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
// import Modal from "../modal/Modal";
// import { Link } from "react-router-dom";

// function MeasurementTypeTable() {
//   const [showModal, setShowModal] = useState(false);
//   const [status, setStatus] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedRows, setExpandedRows] = useState([]);

//   const filteredData = useMemo(() => {
//     let result = MeasurementTypes;
//     if (searchTerm !== "") {
//       result = result.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     return result;
//   }, [searchTerm]);

//   const pageSize = 10;
//   const totalPages = Math.ceil(filteredData.length / pageSize);
//   const paginatedData = filteredData.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   const toggleRow = (id) => {
//     if (expandedRows.includes(id)) {
//       setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
//     } else {
//       setExpandedRows([...expandedRows, id]);
//     }
//   };

//   return (
//     <div className="container p-5 mx-auto rounded-2xl overflow-hidden border-2">
//       <div className="flex items-center justify-between gap-x-4">
//         <div className="flex items-center pb-4 gap-x-4">
//           <input
//             className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
//             type="text"
//             placeholder="Search by product name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center justify-end gap-x-2">
//           <button className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0">
//             Export
//           </button>
//           <button
//             onClick={() => setShowModal(true)}
//             className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0"
//           >
//             Add Measure
//           </button>
//         </div>
//       </div>

//       <div className="overflow-auto rounded-lg border-gray300 bg-neutral border-2">
//         <table className="w-full">
//           <thead className="bg-gray300">
//             <tr>
//               <th className="px-4 py-3 text-left w-1/4">No.</th>
//               <th className="px-4 py-3 text-left w-1/4">Name</th>
//               <th className="px-4 py-3 text-left w-1/4">CreatedAt</th>
//               <th className="px-4 py-3 text-left w-1/4">CreatedBy</th>
//               <th className="px-4 py-3 text-left w-1/4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item) => (
//               <div key={item.id}>
//                 <tr className="border-b items-center border-gray300">
//                   <td className="px-4 py-2 whitespace-nowrap flex items-center">
//                     {item.id}
//                   </td>
//                   <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
//                   <td className="px-4 py-2 whitespace-nowrap"><span className="font-semibold">24-Jul-2024</span></td>
//                   <td className="px-4 py-2 whitespace-nowrap">{item.createdBy}</td>
//                   <td className="px-4 py-2 items-center whitespace-nowrap">
//                     <button
//                       className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//                       onClick={() => toggleRow(item.id)}
//                     >
//                       {expandedRows.includes(item.id) ? "Hide" : "Show"}
//                     </button>
//                     <button className="text-lg text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//                       <CiEdit />
//                     </button>
//                     <button className="text-lg text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//                       <GoTrash />
//                     </button>
//                   </td>
//                 </tr>
//                 {expandedRows.includes(item.id) && (
//                   <tr>
//                     <td colSpan="5" className="p-4 bg-gray200">
//                       {/* Expanded row content */}
//                       <div>Additional details for {item.name}</div>
//                     </td>
//                   </tr>
//                 )}
//               </div>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex items-center justify-end mt-4 gap-x-2">
//         <button
//           className={`${
//             currentPage === 1
//               ? "bg-gray300"
//               : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//           } p-2 text-2xl rounded-full`}
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//         >
//           <MdNavigateBefore />
//         </button>
//         <span>
//           {currentPage} / {totalPages}
//         </span>
//         <button
//           className={`${
//             currentPage === totalPages
//               ? "bg-gray300"
//               : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//           } p-2 text-2xl rounded-full mr-2`}
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//         >
//           <MdNavigateNext />
//         </button>
//       </div>

//       <Modal showModal={showModal} setShowModal={setShowModal} />
//     </div>
//   );
// }

export default MeasurementTypeTable;
