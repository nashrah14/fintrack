import React, { useState } from "react";
import API from "../../api/api";

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/transactions", form);
      onAdd(res.data);

      setForm({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding transaction");
    }
  };

  return (
    <form className="bg-white shadow p-5 rounded-lg mt-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

        <input className="border p-2 rounded" placeholder="Title"
          value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />

        <input className="border p-2 rounded" placeholder="Amount" type="number"
          value={form.amount} onChange={(e)=>setForm({...form, amount:e.target.value})} />

        <select className="border p-2 rounded"
          value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input className="border p-2 rounded" placeholder="Category"
          value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} />

        <input className="border p-2 rounded" type="date"
          value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} />

      </div>

      <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Add Transaction
      </button>
    </form>
  );
}
