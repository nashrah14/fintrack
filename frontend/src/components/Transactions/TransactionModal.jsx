import React, { useState } from "react";
import API from "../../api/api";

export default function TransactionModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({ title: "", amount: "", category: "", type: "expense", date: "" });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.title) e.title = "Title required";
    if (!form.amount || isNaN(Number(form.amount))) e.amount = "Enter a valid amount";
    if (!form.category) e.category = "Category required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    await API.post("/transactions", {
      ...form,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString()
    });
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end">
      <div className="w-full max-w-md bg-white p-6 shadow-xl rounded-l-2xl">
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <input className="w-full border p-2 rounded" placeholder="Title" value={form.title}
              onChange={e=>setForm({...form, title:e.target.value})} />
            {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
          </div>

          <div>
            <input className="w-full border p-2 rounded" placeholder="Amount" value={form.amount}
              onChange={e=>setForm({...form, amount:e.target.value})} />
            {errors.amount && <div className="text-red-600 text-sm">{errors.amount}</div>}
          </div>

          <div>
            <input className="w-full border p-2 rounded" placeholder="Category" value={form.category}
              onChange={e=>setForm({...form, category:e.target.value})} />
            {errors.category && <div className="text-red-600 text-sm">{errors.category}</div>}
          </div>

          <select className="w-full border p-2 rounded" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input className="w-full border p-2 rounded" type="date" value={form.date}
            onChange={e=>setForm({...form, date:e.target.value})} />

          <button className="w-full bg-emerald-500 text-white py-2 rounded">Add</button>
          <button type="button" onClick={onClose} className="w-full bg-slate-200 py-2 rounded mt-2">Cancel</button>
        </form>
      </div>
    </div>
  );
}
