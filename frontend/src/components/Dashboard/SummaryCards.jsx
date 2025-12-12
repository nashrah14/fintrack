import React from "react";

export default function SummaryCards({ income, expense, balance }) {
  const cards = [
    {
      title: "Total Income",
      value: `₹${income}`,
      color: "from-emerald-400 to-emerald-500",
    },
    {
      title: "Total Expense",
      value: `₹${expense}`,
      color: "from-red-400 to-red-500",
    },
    {
      title: "Net Balance",
      value: `₹${balance}`,
      color: "from-indigo-400 to-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className={`p-6 bg-gradient-to-r ${c.color} text-white rounded-xl shadow-lg transform hover:scale-[1.02] transition`}
        >
          <h3 className="text-sm opacity-90">{c.title}</h3>
          <p className="text-3xl font-semibold mt-2">{c.value}</p>
        </div>
      ))}
    </div>
  );
}
