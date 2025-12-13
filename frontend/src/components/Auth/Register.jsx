import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 2)
      e.name = "Name must be at least 2 characters";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.password || form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setErrors({
        server: err.response?.data?.msg || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Name"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.name && (
              <div className="text-red-600 text-sm mt-1">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              placeholder="Email"
              type="email"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {errors.email}
              </div>
            )}
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <input
              value={form.password}
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              placeholder="Password"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          {errors.password && (
            <div className="text-red-600 text-sm mt-1">
              {errors.password}
            </div>
          )}

          {errors.server && (
            <div className="text-red-600 text-sm">
              {errors.server}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
