import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../utils/url";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    error: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password, confirmPassword) => {
    if (!password) return "Password is required";
    if (!PASSWORD_REGEX.test(password)) {
      return "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (confirmPassword && password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      return {
        ...newData,
        error: validatePassword(
          newData.password,
          name === "confirmPassword" ? value : newData.confirmPassword
        ),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset token");
      return;
    }

    const error = validatePassword(formData.password, formData.confirmPassword);
    if (error) {
      setFormData((prev) => ({ ...prev, error }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/user/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      if (response?.data?.success) {
        toast.success("Password has been reset successfully");
        setFormData({ password: "", confirmPassword: "", error: "" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(response?.data?.message || "Failed to reset password");
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
        <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="mt-1 text-gray-500">
          Enter your new password to reset your account
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border ${
                formData.error ? "border-red-500" : "border-gray-300"
              } p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
              disabled={isLoading}
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 w-full rounded-lg border ${
                formData.error ? "border-red-500" : "border-gray-300"
              } p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500`}
              disabled={isLoading}
              required
            />
          </div>

          {formData.error && (
            <p className="mt-2 text-sm text-red-500">{formData.error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || Boolean(formData.error)}
            className="mt-6 w-full rounded-full bg-blue-900 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
