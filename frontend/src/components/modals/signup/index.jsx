import React, { useState } from "react";
import axiosInstance from "../../../config/axiosInstance.js";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
  if (!isOpen) return null;

  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState();
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState(false);

  const APIURL = import.meta.env.VITE_API_URL;

  const handleImageFileUpload = async (imageFile) => {
    if (imageFile) {
      setImageUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);
      try {
        const response = await axiosInstance.post(
          `${APIURL}/upload/image`,
          formData
        );
        setImage(response.data.url);
        setImageFile(null);
        setImageUploading(false);
        console.log(response.data.url);
      } catch (error) {
        console.error("Error uploading file:", error);
        setImageUploading(false);
      }
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z0-9_ ]*$/, "Name should not contain special characters")
      .min(3, "Name must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      ...values,
      image,
    };
    try {
      const response = await axiosInstance.post(`${APIURL}/users`, payload);
      setError(null);
      toast.success("Registration successful!");
      onLoginClick();
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      toast.error("Registration failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-shadow text-primary_text p-6 rounded-lg shadow-lg w-full max-w-md transform transition-transform duration-300 scale-105">
        <h2 className="text-2xl font-montserrat font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-secondary_text">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border rounded-lg bg-background1 text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
                  autoComplete="username"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary_text">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg bg-background1 text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
                  autoComplete="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary_text">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg bg-background1 text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
                  autoComplete="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary_text">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg bg-background1 text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
                  autoComplete="password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary_text">
                  Profile Image
                </label>
                <div className="flex flex-row gap-3 items-center">
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setFieldValue("image", e.target.files[0]);
                    }}
                    className="w-full text-primary_text px-3 py-2 border rounded bg-background1"
                  />
                  {image && (
                    <img className="h-12 w-12 rounded-full" src={image} />
                  )}
                  {imageUploading ? (
                    <button
                      type="button"
                      className="text-secondary_text cursor-not-allowed"
                    >
                      Uploading...
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-highlight hover:text-highlight_hover"
                      onClick={() => handleImageFileUpload(imageFile)}
                    >
                      <u>Upload</u>
                    </button>
                  )}
                </div>
              </div>
              {error && (
                <div className="alert alert-danger text-red-500" role="alert">
                  {error}!
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-primary_text px-4 py-2 rounded mr-2 transition-all duration-300"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
              <div className="mt-4 text-center text-secondary_text">
                Already a user?{" "}
                <button
                  type="button"
                  onClick={onLoginClick}
                  className="text-highlight hover:text-highlight_hover underline"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpModal;
