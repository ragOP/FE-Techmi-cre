import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../utils/url";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!EMAIL_REGEX.test(email)) return "Please enter a valid email address";
    return "";
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: value,
      error: validateEmail(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateEmail(formData.email);
    if (error) {
      setFormData((prev) => ({ ...prev, error }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/user/forgot-password`,
        { email: formData.email }
      );

      if (response?.data?.success) {
        toast.success(
          "Password reset instructions have been sent to your email"
        );
        setFormData({ email: "", error: "" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(response?.data?.message || "Failed to process request");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred";
      toast.error(errorMessage);
      setFormData((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="mt-1 text-gray-500">
          Enter your email address to reset your password
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@gmail.com"
              className={`mt-1 w-full rounded-lg border ${
                formData.error ? "border-red-500" : "border-gray-300"
              } p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
              disabled={isLoading}
              required
            />
            {formData.error && (
              <p className="mt-1 text-sm text-red-500">{formData.error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || Boolean(formData.error)}
            className="mt-6 w-full rounded-full bg-blue-900 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
