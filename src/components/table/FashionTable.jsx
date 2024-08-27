/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState } from "react";
// import ExcelExport from "../../utils/ExcelExport"; // Assuming you have a utility function for exporting to Excel
import { Fashions } from "../../data/fashion";
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
import MultiSelect from "../form/MultiSelect";

function FashionTable() {
  const options = [
    { value: "Head", label: "Head" },
    { value: "Neck", label: "Neck" },
    { value: "Shoulder", label: "Shoulder" },
    { value: "Arm", label: "Arm" },
    { value: "Elbow", label: "Elbow" },
    { value: "Forearm", label: "Forearm" },
    { value: "Wrist", label: "Wrist" },
    { value: "Hand", label: "Hand" },
    { value: "Chest", label: "Chest" },
    { value: "Back", label: "Back" },
    { value: "Abdomen", label: "Abdomen" },
    { value: "Hip", label: "Hip" },
    { value: "Thigh", label: "Thigh" },
    { value: "Knee", label: "Knee" },
    { value: "Leg", label: "Leg" },
    { value: "Ankle", label: "Ankle" },
    { value: "Foot", label: "Foot" },
    { value: "Eye", label: "Eye" },
    { value: "Ear", label: "Ear" },
    { value: "Nose", label: "Nose" },
    { value: "Mouth", label: "Mouth" },
    { value: "Upper Arm", label: "Upper Arm" },
    { value: "Finger", label: "Finger" },
    { value: "Calf", label: "Calf" },
    { value: "Toe", label: "Toe" },
  ];

  // State variables for filtering, searching, pagination, etc.
  const [showModal, setShowModal] = useState(false);

  // const [jobFilter, setJobFilter] = useState("");
  const [active, setActive] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemDelete, setSelectedItemDelete] = useState(null);
  const [fashions, setFashions] = useState(Fashions);

  //Number format

  const formattedNumber = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Filtered and paginated data
  const filteredData = useMemo(() => {
    let result = fashions;

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
  }, [fashions, active, searchTerm]);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // const [resetForm, setResetForm] = useState(null)

  const initialValues = {
    name: "",
    price: 0,
    active: true,
    bodyParts: [],
  };

  // Validation
  const fashionValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name should be at least 3 characters"),
    price: Yup.string().required("Price is required"),
    active: Yup.boolean(),
    bodyParts: Yup.array().of(Yup.string()).min(1, "Body parts are required"),
  });

  const formik = useFormik({
    initialValues: selectedItem || initialValues,
    validationSchema: fashionValidationSchema,
    onSubmit: (values) => {
      if (selectedItem) {
        // Update existing customer
        console.log(values);
        setShowModal(false);
        toast.success("Fashion Style Updated successfully");
      } else {
        // Add new customer
        const newCustomer = {
          id: fashions.length + 1,
          ...values,
        };
        setFashions([...fashions, newCustomer]);
        setShowModal(false);
        toast.success("Fashion Style added successfully");

        console.log(newCustomer);
      }

      // Reset form and selectedItem state
      formik.resetForm();
      setSelectedItem(null);
    },
    enableReinitialize: true,
  });

  const handleMultiSelect = (selectedValues) => {
    formik.setFieldValue("bodyParts", selectedValues);
  };

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
    setSelectedItemDelete(null);
    setSelectedItem(null);
  };

  const handleEditCustomer = (item) => {
    setShowModal(true);
    setSelectedItem(item);
    formik.setValues(item);
  };

  console.log(selectedItem);

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
              new Set(fashions.map((item) => item.jobTitleName))
            ).map((jobTitleName) => (
              <option className="" key={jobTitleName} value={jobTitleName}>
                {jobTitleName}
              </option>
            ))}
          </select> */}
          <input
            className="p-3 border border-gray300 focus:outline-none focus:ring focus:border-blue-500 rounded-lg shadow-lg w-[100%]"
            type="text"
            placeholder="Search by fashion name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-4 font-gray400 border border-gray300 outline-none shadow-lg rounded-lg hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) => setActive(e.target.value)}
          >
            <option value="">Status</option>
            {Array.from(new Set(fashions.map((item) => item.active))).map(
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
            Add Fashion
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
              {/* <th className="px-4 py-3 text-left w-1/7">No.</th> */}
              <th className="px-4 py-3 text-left w-1/7">Name</th>
              <th className="px-4 py-3 text-left w-1/7">Price</th>
              <th className="px-4 py-3 text-left w-1/7">Status</th>
              <th className="px-4 py-3 text-left w-1/7">Body Parts</th>
              <th className="px-4 py-3 text-left w-1/7">CreatedAt</th>
              <th className="px-4 py-3 text-left w-1/7">CreatedBy</th>
              <th className="px-4 py-3 text-left w-1/7">Actions</th>
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
                {/* <td className="px-4 py-2 flex items-center whitespace-nowrap">
                  <span className="text-md font-semibold">{item.name}</span>
                </td> */}
                <td className="px-4 py-2 flex items-center whitespace-nowrap">
                  <Avatar name={item.name} size="60" round="10px" />
                  <div className="ml-2">
                    <span className="text-md font-semibold">{item.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-red500 font-bold">GHS</span>{" "}
                  <span className="font-bold">
                    {formattedNumber.format(item.price)}
                  </span>
                </td>
                <td className="py-2 whitespace-nowrap">
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
                    <td className="py-2 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md  bg-slate200 px-2 py-1 text-xs font-medium text-slate ring-1 ring-inset ring-slates">
                        <span className="pe-1">
                          <GoDotFill />
                        </span>
                        Inactive
                      </span>
                    </td>
                  )}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.bodyParts.slice(0, 3).join(", ")}...
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="font-semibold">01-Apr-2024</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-justify">Admin</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
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
                    {selectedItem ? "Update Fashion" : "New Fashion"}
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
                        type="number"
                        label="Price*"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="price"
                        invalid={touched.price && errors.price}
                      />
                      {touched.price && errors.price ? (
                        <div className="text-sm text-red500">
                          {errors.price}
                        </div>
                      ) : null}
                    </div>

                    <div className="mb-3 w-full sm:w-fit">
                      <label htmlFor="bodyParts">BodyParts</label>
                      <MultiSelect
                        options={options}
                        onSelect={handleMultiSelect}
                        selectedValues={formik.values.bodyParts}
                      />
                      {formik.touched.bodyParts && formik.errors.bodyParts ? (
                        <div className="text-sm text-red500">
                          {formik.errors.bodyParts}
                        </div>
                      ) : null}
                    </div>

                    <Checkbox
                      label="IsActive?"
                      value={formik.values.active}
                      onChange={() =>
                        formik.setFieldValue("active", !formik.values.active)
                      }
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
                    Delete Fashion
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

export default FashionTable;
