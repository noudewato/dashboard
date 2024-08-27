//  {/* UI elements for filtering, searching, pagination, and export */}
//  <div className="flex items-center justify-between gap-x-4">
//  <div className="flex items-center pb-4 gap-x-4">
//    {/* <select
//      className="ml-1 p-4 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
//      onChange={(e) => setJobFilter(e.target.value)}
//    >
//      <option value="">All Categories</option>
//      {Array.from(
//        new Set(MeasurementTypes.map((item) => item.jobTitleName))
//      ).map((jobTitleName) => (
//        <option className="" key={jobTitleName} value={jobTitleName}>
//          {jobTitleName}
//        </option>
//      ))}
//    </select> */}
//    <input
//      className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
//      type="text"
//      placeholder="Search by product name"
//      value={searchTerm}
//      onChange={(e) => setSearchTerm(e.target.value)}
//    />

//    {/* <select
//      className="p-4 font-gray400 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
//      onChange={(e) => setStatus(e.target.value)}
//    >
//      <option value="">Status</option>
//      {Array.from(new Set(MeasurementTypes.map((item) => item.status))).map(
//        (status) => (
//          <option key={status} value={status}>
//            {status}
//          </option>
//        )
//      )}
//    </select> */}

//    {/* Search input */}
//  </div>
//  <div className="flex items-center justify-end gap-x-2">
//    <button className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0">
//      Export
//    </button>
//    <button
//      onClick={() => setShowModal(true)}
//      className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0"
//    >
//      Add Measure
//    </button>
//  </div>
//  {/* Category filter dropdown */}
// </div>

// {/* Table component */}
// <div className="overflow-auto rounded-lg border-gray300 bg-neutral border-2">
//  <table className="w-full">
//    {/* Table header */}
//    <thead className="bg-gray300">
//      <tr>
//        <th className="px-4 py-3 text-left w-1/6">Measure</th>
//        <th className="px-4 py-3 text-left w-1/6">No.</th>
//        <th className="px-4 py-3 text-left w-1/6">Name</th>
//        <th className="px-4 py-3 text-left w-1/6">CreatedAt</th>
//        <th className="px-4 py-3 text-left w-1/6">CreatedBy</th>
//        <th className="px-4 py-3 text-center w-1/6">Actions</th>
//      </tr>
//    </thead>
//    {/* Table body */}
//    <tbody>
//      {/* Map over paginated data */}
//      {/* {paginatedData.map((item) => (
//        <tr
//          key={item.id}
//          className="border-b  items-center border-gray300"
//        >
//          <td className="px-4 py-2 whitespace-nowrap flex items-center">
//            <button
//              className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//              onClick={() => toggleRow(item.id)}
//            >
//              {expandedRows.includes(item.id) ? "Hide" : "Show"}
//            </button>
//          </td>
//          {expandedRows.includes(item.id) && (
//            <tr>
//              <td colSpan="5" className="p-4 bg-gray200">
              
//                <div>Additional details for {item.name}</div>
//              </td>
//            </tr>
//          )}

//          <td className="px-4 py-2 whitespace-nowrap"> {item.id}</td>
//          <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
//          <td className="px-4 py-2 whitespace-nowrap">
//            <span className="font-semibold">24-Jul-2024</span>
//          </td>

//          <td className="px-4 py-2 whitespace-nowrap flex items-center">
//            {item.createdBy}
//          </td>
//          {expandedRows.includes(item.id) && (
//            <tr>
//              <td colSpan="5" className="p-4 bg-gray200">
//                {/* Expanded row content
//                <div>Additional details for {item.name}</div>
//              </td>
//            </tr>
//          )}
//          <td className="px-4 py-2 text-center whitespace-nowrap">
//            <button className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//              <FaEye />
//            </button>
//            <button className="text-lg text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//              <CiEdit />
//            </button>
//            <button className="text-lg text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//              <GoTrash />
//            </button>
//          </td>
//        </tr>
      
//        //  {expandedRows.includes(item.id) && (
//        //   <tr className="bg-gray200">
//        //     <td colSpan="6" className="p-4">
//        //       <table className="w-full bg-gray100">
//        //         <thead>
//        //           <tr>
//        //             <th className="px-4 py-2">Detail No.</th>
//        //             <th className="px-4 py-2">Detail Name</th>
//        //             <th className="px-4 py-2">Detail Info</th>
//        //           </tr>
//        //         </thead>
//        //         <tbody>
//        //           <tr>
//        //             <td className="px-4 py-2">1</td>
//        //             <td className="px-4 py-2">Detail A</td>
//        //             <td className="px-4 py-2">Info about Detail A</td>
//        //           </tr>
//        //           <tr>
//        //             <td className="px-4 py-2">2</td>
//        //             <td className="px-4 py-2">Detail B</td>
//        //             <td className="px-4 py-2">Info about Detail B</td>
//        //           </tr>
//        //         </tbody>
//        //       </table>
//        //     </td>
//        //   </tr>
//        // )}
//      ))} */}
//      {paginatedData.map((item) => (
//        <React.Fragment key={item.id}>
//          <tr className="border-b items-center border-gray300">
//            <td className="px-4 py-2 whitespace-nowrap flex items-center">
//              <button
//                className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//                onClick={() => toggleRow(item.id)}
//              >
//                {expandedRows.includes(item.id) ? (
//                  <span className="text-red500">Hide</span>
//                ) : (
//                  "Show"
//                )}
//              </button>
//            </td>
//            <td className="px-4 py-2 whitespace-nowrap"> {item.id}</td>
//            <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
//            <td className="px-4 py-2 whitespace-nowrap">
//              <span className="font-semibold">24-Jul-2024</span>
//            </td>
//            <td className="px-4 py-2 whitespace-nowrap flex items-center">
//              {item.createdBy}
//            </td>
//            <td className="px-4 py-2 text-center whitespace-nowrap">
//              <button className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//                <FaEye />
//              </button>
//              <button className="text-lg text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//                <CiEdit />
//              </button>
//              <button className="text-lg text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
//                <GoTrash />
//              </button>
//            </td>
//          </tr>
//          {expandedRows.includes(item.id) && (
//            <tr className="bg-gray200">
//              <td colSpan="6" className="p-4">
//                <table className="w-full bg-gray100">
//                  <thead>
//                    <tr>
//                      <th className="px-4 py-2 text-left">Detail No.</th>
//                      <th className="px-4 py-2 text-left">Detail Name</th>
//                      <th className="px-4 py-2 text-left">Detail Info</th>
//                    </tr>
//                  </thead>
//                  <tbody>
//                    <tr>
//                      <td className="px-4 py-2">1</td>
//                      <td className="px-4 py-2">Detail A</td>
//                      <td className="px-4 py-2">Info about Detail A</td>
//                    </tr>
//                    <tr>
//                      <td className="px-4 py-2">2</td>
//                      <td className="px-4 py-2">Detail B</td>
//                      <td className="px-4 py-2">Info about Detail B</td>
//                    </tr>
//                  </tbody>
//                </table>
//              </td>
//            </tr>
//          )}
//        </React.Fragment>
//      ))}
//    </tbody>
//  </table>
// </div>

// {/* Pagination controls */}
// <div className="flex items-center justify-end mt-4 gap-x-2">
//  <button
//    className={`${
//      currentPage === 1
//        ? "bg-gray300"
//        : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//    } p-2 text-2xl  rounded-full`}
//    disabled={currentPage === 1}
//    onClick={() => setCurrentPage(currentPage - 1)}
//  >
//    <MdNavigateBefore />
//  </button>
//  <span>
//    {currentPage} / {totalPages}
//  </span>
//  <button
//    className={`${
//      currentPage === totalPages
//        ? "bg-gray300"
//        : "bg-blue500 text-neutral hover:bg-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
//    } p-2 text-2xl  rounded-full mr-2`}
//    disabled={currentPage === totalPages}
//    onClick={() => setCurrentPage(currentPage + 1)}
//  >
//    <MdNavigateNext />
//  </button>
// </div>

// <Modal showModal={showModal} setShowModal={setShowModal} />