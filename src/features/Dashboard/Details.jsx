import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useSubmitEmployeeMutation } from '../../leads';

const Details = () => {
  const [profilePreview, setProfilePreview] = useState(null);
  const [docPreview, setDocPreview] = useState([]);
  const [submitEmployee] = useSubmitEmployeeMutation();
  const userId = useSelector(state => state.auth.user._id); // Adjust based on your Redux structure

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    dateOfBirth: Yup.date().required('Date of birth is required').max(new Date(), 'Date cannot be in the future'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    emergencyContactName: Yup.string().required('Emergency contact name is required'),
    emergencyContactRelation: Yup.string().required('Relationship is required'),
    emergencyContactPhone: Yup.string().required('Emergency contact phone is required').matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  });

  const handleProfileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('profilePhoto', file);

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
    setFieldValue('identificationDocs', files);

    const newPreviews = [];
    files.forEach(file => {
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
          fullName: '',
          dateOfBirth: '',
          gender: '',
          address: '',
          phone: '',
          email: '',
          emergencyContactName: '',
          emergencyContactRelation: '',
          emergencyContactPhone: '',
          profilePhoto: null,
          identificationDocs: []
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const formData = new FormData();

          Object.keys(values).forEach(key => {
            if (key === 'identificationDocs') {
              values[key].forEach(file => {
                formData.append('identificationDocs', file);
              });
            } else if (key === 'profilePhoto') {
              formData.append('profilePhoto', values[key]);
            } else {
              formData.append(key, values[key]);
            }
          });

          try {
            await submitEmployee({ userId, formData }).unwrap();
            alert('Form submitted successfully!');
            resetForm();
            setProfilePreview(null);
            setDocPreview([]);
          } catch (error) {
            console.error('Submission failed:', error);
            alert('Failed to submit form');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="needs-validation">
            {/* ...keep form fields as provided earlier... */}

            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Details;
