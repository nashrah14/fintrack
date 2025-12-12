import React from "react";

export default function TransactionTable({ transactions }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-10">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">
        Recent Transactions
      </h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-slate-500">
            <th className="p-3">Title</th>
            <th className="p-3">Category</th>
            <th className="p-3">Type</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <tr
              key={t._id}
              className="border-b hover:bg-slate-50 transition"
            >
              <td className="p-3">{t.title}</td>
              <td className="p-3">{t.category}</td>
              <td className="p-3 capitalize">
                <span
                  className={`px-3 py-1 rounded-full text-white text-sm ${
                    t.type === "income"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                >
                  {t.type}
                </span>
              </td>
              <td className="p-3 font-semibold text-slate-700">
                ₹{t.amount}
              </td>
              <td className="p-3">
                {new Date(t.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
