import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useSubmitEmployeeMutation } from "../../service/leads"; // Adjust path as per your project structure

const Details = () => {
  const [profilePreview, setProfilePreview] = useState(null);
  const [docPreview, setDocPreview] = useState([]);
  const [submitEmployee] = useSubmitEmployeeMutation();
  const userId = useSelector((state) => state.auth?.user?._id); // Safely accessing user ID

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date cannot be in the future"),
    gender: Yup.string().required("Gender is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    emergencyContactName: Yup.string().required("Emergency contact name is required"),
    emergencyContactRelation: Yup.string().required("Relationship is required"),
    emergencyContactPhone: Yup.string()
      .required("Emergency contact phone is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  });

  const handleProfileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("profilePhoto", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue("identificationDocs", files);

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setDocPreview(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Employee Registration Form</h2>

      <Formik
        initialValues={{
          fullName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          emergencyContactName: "",
          emergencyContactRelation: "",
          emergencyContactPhone: "",
          profilePhoto: null,
          identificationDocs: [],
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();

          Object.keys(values).forEach((key) => {
            if (key === "identificationDocs") {
              values[key].forEach((file) => {
                formData.append("identificationDocs", file);
              });
            } else if (key === "profilePhoto") {
              formData.append("profilePhoto", values[key]);
            } else {
              formData.append(key, values[key]);
            }
          });

          console.log("FormData before submission:", Object.fromEntries(formData.entries())); // Debugging

          try {
            await submitEmployee({ userId, formData }).unwrap();
            alert("Form submitted successfully!");
            resetForm();
            setProfilePreview(null);
            setDocPreview([]);
          } catch (error) {
            console.error("Submission failed:", error);
            alert("Failed to submit form");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="fullName">Full Name</label>
              <Field name="fullName" type="text" className="form-control" />
              <ErrorMessage name="fullName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field name="dateOfBirth" type="date" className="form-control" />
              <ErrorMessage name="dateOfBirth" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="gender">Gender</label>
              <Field name="gender" as="select" className="form-control">
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="gender" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <Field name="address" type="text" className="form-control" />
              <ErrorMessage name="address" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <Field name="phone" type="text" className="form-control" />
              <ErrorMessage name="phone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="emergencyContactName">Emergency Contact Name</label>
              <Field name="emergencyContactName" type="text" className="form-control" />
              <ErrorMessage name="emergencyContactName" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="emergencyContactRelation">Relationship</label>
              <Field name="emergencyContactRelation" type="text" className="form-control" />
              <ErrorMessage name="emergencyContactRelation" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="emergencyContactPhone">Emergency Contact Phone</label>
              <Field name="emergencyContactPhone" type="text" className="form-control" />
              <ErrorMessage name="emergencyContactPhone" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="profilePhoto">Profile Photo</label>
              <input
                name="profilePhoto"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(event) => handleProfileChange(event, setFieldValue)}
              />
              {profilePreview && <img src={profilePreview} alt="Preview" className="img-thumbnail mt-2" />}
            </div>

            <div className="mb-3">
              <label htmlFor="identificationDocs">Identification Documents</label>
              <input
                name="identificationDocs"
                type="file"
                className="form-control"
                accept="image/*,application/pdf"
                multiple
                onChange={(event) => handleDocChange(event, setFieldValue)}
              />
              {docPreview.map((preview, index) => (
                <img key={index} src={preview} alt={`Doc ${index + 1}`} className="img-thumbnail mt-2" />
              ))}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Details;