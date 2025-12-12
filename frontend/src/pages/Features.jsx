import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import financeImg from "../assets/finance.png";

export default function Features() {
  const features = [
    {
      title: "Smart Expense Categorization",
      desc: "Automatically groups your transactions using AI-powered pattern recognition.",
    },
    {
      title: "Multi-Device Sync",
      desc: "Your data stays consistent and secure across all devices with real-time syncing.",
    },
    {
      title: "Advanced Insights & Trends",
      desc: "Visualize spending patterns with beautiful charts, graphs, and breakdowns.",
    },
    {
      title: "Goal-Based Budgeting",
      desc: "Set monthly goals and track progress with motivational insights.",
    },
    {
      title: "Bank-Level Security",
      desc: "Your financial data is encrypted with industry-grade protection.",
    },
    {
      title: "Export & Backup",
      desc: "Download your transactions as CSV, PDF, or Excel for bookkeeping.",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-slate-900">Powerful Features</h1>
          <p className="text-slate-600 mt-4 text-lg">
            Everything you need to take control of your financial life - beautifully crafted and incredibly easy to use.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {features.map((f, index) => (
            <div key={index} className="p-6 bg-slate-50 rounded-2xl shadow hover:shadow-lg transition">
              <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
              <h3 className="mt-4 text-xl font-semibold text-slate-800">{f.title}</h3>
              <p className="mt-2 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ILLUSTRATION SECTION */}
        <div className="mt-20 flex justify-center">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-10 rounded-3xl shadow-xl">
            <img
              src={financeImg}
              alt="Features View"
              className="w-[500px] rounded-2xl shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
