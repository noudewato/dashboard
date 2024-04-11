// import from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";

const FormComponent = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    currency: Yup.string().required("Currency is required"),
    category: Yup.string().required("Category is required"),
    brand: Yup.string().required("Brand is required"),
    images: Yup.array().min(1, "At least one image is required"),
    stock: Yup.number().required("Stock is required"),
    attributes: Yup.array().of(
      Yup.object().shape({
        key: Yup.string().required("Attribute key is required"),
        value: Yup.string().required("Attribute value is required"),
      })
    ),
  });

  const initialValues = {
    name: "",
    description: "",
    price: "",
    currency: "",
    category: "",
    brand: "",
    images: [],
    stock: "",
    attributes: [{ key: "", value: "" }],
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />

          <label>Description:</label>
          <ReactQuill
            value={values.description}
            onChange={(value) => setFieldValue("description", value)}
          />
          <ErrorMessage name="description" component="div" />

          <label>Price:</label>
          <Field type="text" name="price" />
          <ErrorMessage name="price" component="div" />

          <label>Currency:</label>
          <Field type="text" name="currency" />
          <ErrorMessage name="currency" component="div" />

          <label>Category:</label>
          <Field type="text" name="category" />
          <ErrorMessage name="category" component="div" />

          <label>Brand:</label>
          <Field type="text" name="brand" />
          <ErrorMessage name="brand" component="div" />

          <label>Images:</label>
          <Dropzone
            onDrop={(acceptedFiles) => setFieldValue("images", acceptedFiles)}
            accept="image/*"
            multiple={true}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <p>Drag and drop some images here, or click to select images</p>
              </div>
            )}
          </Dropzone>
          <ErrorMessage name="images" component="div" />

          <label>Stock:</label>
          <Field type="text" name="stock" />
          <ErrorMessage name="stock" component="div" />

          <label>Attributes:</label>
          {values.attributes.map((attribute, index) => (
            <div key={index}>
              <Field type="text" name={`attributes[${index}].key`} />
              <Field type="text" name={`attributes[${index}].value`} />
              <ErrorMessage name={`attributes[${index}].key`} component="div" />
              <ErrorMessage
                name={`attributes[${index}].value`}
                component="div"
              />
            </div>
          ))}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginBottom: "10px",
};

export default FormComponent;
