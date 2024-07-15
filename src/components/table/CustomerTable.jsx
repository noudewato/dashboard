/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
// import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { Customers } from "../../data/customers";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import Avatar from "react-avatar";
import { GoDotFill, GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import Input from "../form/Input";
import Checkbox from "../form/Checkbox";

function CustumerTable() {
  // State variables for filtering, searching, pagination, etc.
  const [showModal, setShowModal] = useState(false);

  // const [jobFilter, setJobFilter] = useState("");
  const [active, setActive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDelete, setSelectedItemDelete] = useState(null);
  const [customers, setCustomers] = useState(Customers);

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let result = customers;

    if (active !== "") {
      result = result.filter((item) => item.active === (active === "true"));
    }
    // if (jobFilter !== "") {
    //   result = result.filter((item) => item.jobTitleName.includes(jobFilter));
    // }
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [customers, active, searchTerm]);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // const [resetForm, setResetForm] = useState(null)

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    address: "",
    active: true,
  };

  // Validation
  const userValidationSchema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .min(10, "Phone number must be at least 10 digits")
      .max(10)
      .required(),
    address: Yup.string().required(),
    active: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: selectedItem || initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      if (selectedItem) {
        // Update existing customer
        console.log(values);
        setShowModal(false);
        toast.success("Customer Updated successfully");
      } else {
        // Add new customer
        const newCustomer = {
          id: customers.length + 1,
          ...values,
        };
        setCustomers([...customers, newCustomer]);
        setShowModal(false);
        toast.success("Customer added successfully");

        console.log(newCustomer);
      }

      // Reset form and selectedItem state
      formik.resetForm();
      setSelectedItem(null);
    },
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    submitForm,
    resetForm,
  } = formik;

  const handleModalCancel = (e) => {
    e.preventDefault();
    setShowModal(false);
    resetForm();
    setSelectedItem(null);
  };

  const handleEditCustomer = (item) => {
    setShowModal(true);
    setSelectedItem(item);
    formik.setValues(item);
  };

  const handleDeleteCustomer = (item) => {
    setShowModal(true);
    setSelectedItemDelete(item);
  };

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
              new Set(customers.map((item) => item.jobTitleName))
            ).map((jobTitleName) => (
              <option className="" key={jobTitleName} value={jobTitleName}>
                {jobTitleName}
              </option>
            ))}
          </select> */}
          <input
            className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
            type="text"
            placeholder="Search by customer name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-4 font-gray400 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setActive(e.target.value)}
          >
            <option value="">Status</option>
            {Array.from(new Set(customers.map((item) => item.active))).map(
              (active) => (
                <option key={active} value={active}>
                  {active == true ? "Active" : "Inactive"}
                </option>
              )
            )}
          </select>

          {/* Search input */}
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <button className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0">
            Export
          </button>
          <button
            onClick={() => {
              setSelectedItem(null);
              setShowModal(true);
            }}
            className="transition duration-300 ease-in-out transform hover:scale-105 rounded-full bg-blue500 text-neutral py-3 px-6 font-semibold mr-2 hover:bg-blue400 hover:translate-x-0"
          >
            Add Customer
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
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>

              <th className="px-4 py-3 text-left">Status</th>

              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Map over paginated data */}
            {paginatedData.map((item) => (
              <tr
                key={item.userId}
                className="border-b  items-center border-gray300"
              >
                <td className="px-4 py-2 whitespace-nowrap flex items-center">
                  <Avatar name={item.name} size="50" round="50px" />
                  <div className="ml-2">
                    <span className="text-md font-semibold">{item.name}</span>
                    <br />
                    <span className="text-sm text-slate500">{item.email}</span>
                  </div>
                </td>

                <td className="px-4 py-2 whitespace-nowrap">{item.phone}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.address}</td>
                {item.active == true ? (
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md bg-lime200 px-2 py-1 text-xs font-medium text-lime500 ring-1 ring-inset ring-lime500">
                      <span className="pe-1 text-lime500">
                        <GoDotFill />
                      </span>
                      Active
                    </span>
                  </td>
                ) : (
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-md  bg-slate200 px-2 py-1 text-xs font-medium text-slate ring-1 ring-inset ring-slates">
                      <span className="pe-1">
                        <GoDotFill />
                      </span>
                      Inactive
                    </span>
                  </td>
                )}

                <td className="px-4 py-2 items-center whitespace-nowrap">
                  <Link
                    to={`measurements/${item.id}`}
                    className="text-lg border border-purple bg-purple px-3 py-1 rounded-lg text-gray-900 hover:text-neutral mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
                  >
                    Measurements
                  </Link>
                  <button className="text-lg text-blue500 hover:text-blue400 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEditCustomer(item)}
                    className="text-lg text-lime500 hover:text-lime500 hover:text-lime600 mr-2 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(item)}
                    className="text-lg text-red hover:text-red hover:text-red500 transition duration-300 ease-in-out transform hover:scale-105 hover:translate-x-0"
                  >
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

      <TEModal show={showModal} setShow={setShowModal} staticBackdrop>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            marginTop: "-2rem",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showModal && !selectedItemDelete ? (
            <TEModalDialog
              style={{
                width: "50%",
              }}
            >
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    {selectedItem ? "Update Customer" : "New Customer"}
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TEModalHeader>
                {/* <!--Modal body--> */}
                <form onSubmit={formik.handleSubmit}>
                  <TEModalBody>
                    <div className="mb-3  w-full sm:w-fit">
                      <Input
                        label="Name*"
                        id="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={touched.name && errors.name}
                      />
                      {touched.name && errors.name ? (
                        <div className="text-sm text-red500">{errors.name}</div>
                      ) : null}
                    </div>
                    <div className="mb-3 w-full sm:w-fit">
                      <Input
                        type="text"
                        label="Email*"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        invalid={touched.email && errors.email}
                      />
                      {touched.email && errors.email ? (
                        <div className="text-sm text-red500">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-3 w-full sm:w-fit">
                      <Input
                        type="text"
                        label="Phone Number*"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="phone"
                        invalid={touched.phone && errors.phone}
                      />
                      {touched.phone && errors.phone ? (
                        <div className="text-sm text-red500">
                          {errors.phone}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-3 w-full sm:w-fit">
                      <Input
                        type="text"
                        label="Address*"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="address"
                        invalid={touched.address && errors.address}
                      />
                      {touched.address && errors.address ? (
                        <div className="text-sm text-red500">
                          {errors.address}
                        </div>
                      ) : null}
                    </div>
                    <Checkbox
                      label="IsActive?"
                      value={formik.values.active}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.active}
                    />
                  </TEModalBody>
                  <TEModalFooter
                    style={{ display: "flex", justifyContent: "start", gap: 2 }}
                  >
                    <TERipple rippleColor="light">
                      <button
                        type="submit"
                        // disabled={!formik.isValid}
                        className="mr-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        {selectedItem ? "Update" : "Add"}
                      </button>
                    </TERipple>
                    <TERipple rippleColor="light">
                      <button
                        type="button"
                        onClick={handleModalCancel}
                        style={{
                          fontWeight: "bolder",
                          backgroundColor: "red",
                          marginRight: "2px",
                          display: "inline-block",
                          borderRadius: "0.25rem",
                          padding: "0.625rem 1.5rem",
                          fontSize: "0.75rem",
                          textTransform: "uppercase",
                          lineHeight: "1.25",
                          color: "white",
                          boxShadow:
                            "0 4px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                          transition:
                            "background-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
                          cursor: "pointer",
                          outline: "none",
                          border: "none",
                          userSelect: "none",
                          "&:hover": {
                            backgroundColor: "blue",
                            boxShadow:
                              "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                          },
                          "&:focus": {
                            backgroundColor: "blue",
                            boxShadow:
                              "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                            outline: "none",
                            ring: "0",
                          },
                          "&:active": {
                            backgroundColor: "blue",
                            boxShadow:
                              "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                          },
                        }}
                      >
                        Cancel
                      </button>
                    </TERipple>
                  </TEModalFooter>
                </form>
              </TEModalContent>
            </TEModalDialog>
          ) : (
            <TEModalDialog
              style={{
                width: "50%",
              }}
            >
              <TEModalContent>
                <TEModalHeader>
                  {/* <!--Modal title--> */}
                  <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                    Delete Customer
                  </h5>
                  {/* <!--Close button--> */}
                  <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </TEModalHeader>
                <TEModalBody>
                  Are you sure you want to delete{" "}
                  <span className="text-md font-bold text-lg">
                    {selectedItemDelete?.name}
                  </span>
                </TEModalBody>
                <TEModalFooter
                  style={{ display: "flex", justifyContent: "start", gap: 2 }}
                >
                  <TERipple rippleColor="light">
                    <button
                      type="submit"
                      // disabled={!formik.isValid}
                      className="mr-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    >
                      Yes
                    </button>
                  </TERipple>
                  <TERipple rippleColor="light">
                    <button
                      type="button"
                      onClick={handleModalCancel}
                      style={{
                        fontWeight: "bolder",
                        backgroundColor: "red",
                        marginRight: "2px",
                        display: "inline-block",
                        borderRadius: "0.25rem",
                        padding: "0.625rem 1.5rem",
                        fontSize: "0.75rem",
                        textTransform: "uppercase",
                        lineHeight: "1.25",
                        color: "white",
                        boxShadow:
                          "0 4px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                        transition:
                          "background-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
                        cursor: "pointer",
                        outline: "none",
                        border: "none",
                        userSelect: "none",
                        "&:hover": {
                          backgroundColor: "blue",
                          boxShadow:
                            "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                        },
                        "&:focus": {
                          backgroundColor: "blue",
                          boxShadow:
                            "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                          outline: "none",
                          ring: "0",
                        },
                        "&:active": {
                          backgroundColor: "blue",
                          boxShadow:
                            "0 8px 9px -4px rgba(59, 113, 202, 0.3), 0 4px 18px 0 rgba(59, 113, 202, 0.2)",
                        },
                      }}
                    >
                      No
                    </button>
                  </TERipple>
                </TEModalFooter>
              </TEModalContent>
            </TEModalDialog>
          )}
        </div>
      </TEModal>
    </div>
  );
}

export default CustumerTable;
