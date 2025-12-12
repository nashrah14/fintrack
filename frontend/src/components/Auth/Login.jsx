import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Fill email and password");
      return;
    }
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError((err.response && err.response.data.msg) || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
          placeholder="Email" className="w-full border p-2 rounded" />
        <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})}
          type="password" placeholder="Password" className="w-full border p-2 rounded" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="w-full bg-emerald-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
