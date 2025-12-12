import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password || form.password.length < 6) e.password = "Password min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setErrors({ server: (err.response && err.response.data.msg) || 'Server error' });
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
            placeholder="Name" className="w-full border p-2 rounded" />
          {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
        </div>

        <div>
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})}
            placeholder="Email" className="w-full border p-2 rounded" />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>

        <div>
          <input value={form.password} type="password" onChange={e=>setForm({...form, password:e.target.value})}
            placeholder="Password" className="w-full border p-2 rounded" />
          {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
        </div>

        {errors.server && <div className="text-red-600 text-sm">{errors.server}</div>}

        <button disabled={loading} className="w-full bg-emerald-500 text-white py-2 rounded">
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </div>
  );
}
