import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { signupUser } from "./helpers/signupUser";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    console.log(">>>formData", formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const response = await signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            if (response.response.success) {
                toast.success("Account created successfully!");
                navigate("/login");
            } else {
                toast.error(response.response?.message || "Signup failed");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
                <p className="text-gray-500 mt-1">Create your account</p>

                <form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john.doe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mt-4 relative">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="•••••••••••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4 relative">
                        <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="•••••••••••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-9 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full rounded-full bg-blue-900 py-3 text-white font-medium text-lg hover:bg-blue-800 disabled:bg-blue-500"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* Login Link */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
