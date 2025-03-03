import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./helpers/loginUser";
import { toast } from "react-toastify";
import { setItem } from "../../utils/local_storage";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const response = data?.response;
      if (response?.success) {
        const data = response?.data;
        const tokenData = data?.token;
        const refreshToken = data?.refreshToken;
        const userId = data?.id;

        if (tokenData) {
          const localStoragePayload = {
            token: tokenData,
            userId: userId,
            refreshToken,
          };
          setItem(localStoragePayload);
          
          navigate("/");
          toast.success("Login successful!");
        } else {
          toast.error("Token not found");
        }
      } else {
        toast.error(response.message || "Login failed");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        <p className="text-gray-500 mt-1">
          Login to access your TravelWise account
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@gmail.com"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            {/* Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-6 w-full rounded-full bg-blue-900 py-3 text-white font-medium text-lg hover:bg-blue-800 disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-red-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
