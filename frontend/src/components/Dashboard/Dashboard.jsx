import React, { useEffect, useState } from "react";
import API from "../../api/api";
import SummaryCards from "./SummaryCards";
import ExpenseChart from "./ExpenseChart";
import MonthlyChart from "./MonthlyChart";
import TransactionTable from "../Transactions/TransactionTable";
import TransactionModal from "../Transactions/TransactionModal";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const expenseByCategory = Object.entries(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-slate-50 pb-20">

      <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-10 rounded-b-3xl shadow">
        <h1 className="text-3xl font-bold">Your Finance Dashboard</h1>
        <p className="mt-2 text-sm opacity-90">
          Track your spending patterns and take control of your money.
        </p>
      </div>

      <div className="container mx-auto px-6 -mt-10">

        <SummaryCards income={income} expense={expense} balance={balance} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ExpenseChart data={expenseByCategory} />
          <MonthlyChart transactions={transactions} />
        </div>

        <TransactionTable transactions={transactions} />

        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 bg-teal-500 hover:bg-teal-600 text-white text-3xl w-16 h-16 flex items-center justify-center rounded-full shadow-xl transition"
        >
          +
        </button>

        <TransactionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSuccess={fetchData}
        />
      </div>
    </div>
  );
}
