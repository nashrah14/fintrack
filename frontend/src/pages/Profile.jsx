
import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get("/auth/me");
        if (!mounted) return;
        const user = res.data;
        setForm({ name: user.name || "", email: user.email || "", currentPassword: "", newPassword: "" });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate("/login");
          return;
        }
        setServerError("Failed to load profile. Try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [navigate]);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";

    // If user wants to change password, both fields are required
    if (form.currentPassword || form.newPassword) {
      if (!form.currentPassword) e.currentPassword = "Enter your current password";
      if (!form.newPassword) e.newPassword = "Enter a new password";
      if (form.newPassword && form.newPassword.length > 0 && form.newPassword.length < 6) e.newPassword = "New password must be at least 6 characters";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
    setServerError("");
    setSuccessMsg("");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerError("");
    setSuccessMsg("");
    if (!validate()) return;

    setSaving(true);
    try {
      // 1) Update name/email
      const payload = { name: form.name.trim(), email: form.email.trim() };
      await API.put("/auth/me", payload);
      setSuccessMsg("Profile updated successfully.");

      // 2) If password fields provided, call change-password endpoint
      if (form.currentPassword && form.newPassword) {
        try {
          await API.post("/auth/change-password", {
            currentPassword: form.currentPassword,
            newPassword: form.newPassword
          });
          // On success, clear password fields and optionally notify user
          setSuccessMsg("Profile and password updated successfully.");
          setForm(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
          // Optionally, you may want to log the user out after password change:
          // localStorage.removeItem("token"); navigate("/login");
        } catch (pwErr) {
          // If password change fails, show that error (but keep profile changes)
          if (pwErr.response && pwErr.response.data) {
            const data = pwErr.response.data;
            if (data.msg) setServerError(data.msg);
            else if (data.errors && Array.isArray(data.errors)) {
              const fieldErrs = {};
              data.errors.forEach(x => { if (x.param) fieldErrs[x.param] = x.msg; });
              setErrors(fieldErrs);
              setServerError("Fix the highlighted fields.");
            } else setServerError("Password change failed. Please check current password.");
          } else {
            setServerError("Network error while changing password.");
          }
        }
      }

      // Auto-hide success after a short time
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.msg) setServerError(data.msg);
        else if (data.errors && Array.isArray(data.errors)) {
          const fieldErrs = {};
          data.errors.forEach(x => { if (x.param) fieldErrs[x.param] = x.msg; });
          setErrors(fieldErrs);
          setServerError("Fix the highlighted fields.");
        } else setServerError("Failed to update profile. Try again.");
      } else {
        setServerError("Network error. Check your backend.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-slate-600">Loading profile…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
          <p className="text-sm text-slate-600 mt-1">Update your display name, email and password.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {serverError && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{serverError}</div>
            )}

            {successMsg && (
              <div className="text-sm text-emerald-700 bg-emerald-50 p-3 rounded">{successMsg}</div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700">Full name</label>
              <input
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                className={`mt-1 block w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.name ? "border-red-300" : "border-slate-200"}`}
                placeholder="Your name"
              />
              {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name}</div>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input
                value={form.email}
                onChange={e => handleChange("email", e.target.value)}
                className={`mt-1 block w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.email ? "border-red-300" : "border-slate-200"}`}
                placeholder="you@example.com"
              />
              {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Current password <span className="text-slate-400 text-xs">(required to change password)</span></label>
              <input
                value={form.currentPassword}
                onChange={e => handleChange("currentPassword", e.target.value)}
                type="password"
                className={`mt-1 block w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.currentPassword ? "border-red-300" : "border-slate-200"}`}
                placeholder="Enter current password"
              />
              {errors.currentPassword && <div className="text-sm text-red-600 mt-1">{errors.currentPassword}</div>}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">New password <span className="text-slate-400 text-xs">(optional)</span></label>
              <input
                value={form.newPassword}
                onChange={e => handleChange("newPassword", e.target.value)}
                type="password"
                className={`mt-1 block w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300 ${errors.newPassword ? "border-red-300" : "border-slate-200"}`}
                placeholder="Enter new password (min 6 chars)"
              />
              {errors.newPassword && <div className="text-sm text-red-600 mt-1">{errors.newPassword}</div>}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
