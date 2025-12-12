import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyChart({ transactions }) {
  const monthlyTotals = Array(12).fill(0);

  transactions.forEach((t) => {
    const month = new Date(t.date).getMonth();
    if (t.type === "expense") monthlyTotals[month] += t.amount;
  });

  const data = monthlyTotals.map((amount, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    amount,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">
        Monthly Spending Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Bar dataKey="amount" fill="#6366F1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
