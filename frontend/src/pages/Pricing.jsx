import React, { useState } from "react";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly"); // monthly | yearly
  const [selectedPlan, setSelectedPlan] = useState("pro");

  const prices = {
    basic: billing === "monthly" ? 0 : 0,
    pro: billing === "monthly" ? 299 : 249,
    premium: billing === "monthly" ? 599 : 499,
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h1 className="text-4xl font-extrabold text-slate-900">
          Simple, Transparent Pricing
        </h1>
        <p className="text-slate-600 mt-2">
          Choose a plan that fits your financial journey.
        </p>

        {/* Billing Toggle */}
        <div className="flex justify-center mt-8">
          <div className="bg-white p-1 rounded-full shadow flex items-center gap-1">
            <button
              className={`px-5 py-2 rounded-full font-medium transition ${
                billing === "monthly"
                  ? "bg-emerald-500 text-white"
                  : "text-slate-600"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-5 py-2 rounded-full font-medium transition ${
                billing === "yearly"
                  ? "bg-emerald-500 text-white"
                  : "text-slate-600"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* BASIC */}
          <PlanCard
            name="Basic"
            price={prices.basic}
            features={["Track Expenses", "Basic Analytics", "1 Device"]}
            selected={selectedPlan === "basic"}
            onSelect={() => setSelectedPlan("basic")}
          />

          {/* PRO - Recommended */}
          <PlanCard
            name="Pro"
            recommended
            price={prices.pro}
            features={[
              "Smart Categorization",
              "Unlimited Transactions",
              "Trends & Insights",
              "Sync Across Devices",
            ]}
            selected={selectedPlan === "pro"}
            onSelect={() => setSelectedPlan("pro")}
          />

          {/* PREMIUM */}
          <PlanCard
            name="Premium"
            price={prices.premium}
            features={[
              "Everything in Pro",
              "AI Spending Assistant",
              "Real-time Alerts",
              "Priority Support",
            ]}
            selected={selectedPlan === "premium"}
            onSelect={() => setSelectedPlan("premium")}
          />
        </div>

        {/* Selected Plan Summary */}
        <div className="mt-12 bg-white p-6 rounded-xl shadow text-left max-w-md mx-auto border-l-4 border-emerald-500">
          <h3 className="text-lg font-semibold text-slate-900">Selected Plan</h3>
          <p className="mt-2 text-slate-700 capitalize">{selectedPlan} Plan</p>
          <p className="mt-1 text-emerald-600 font-semibold">
            ₹ {prices[selectedPlan]} / {billing}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- PLAN CARD COMPONENT --------------------------- */
function PlanCard({ name, price, features, selected, onSelect, recommended }) {
  return (
    <div
      className={`relative bg-white p-8 rounded-2xl shadow transition cursor-pointer hover:shadow-lg ${
        selected ? "ring-2 ring-emerald-500" : ""
      }`}
      onClick={onSelect}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow">
          Recommended
        </span>
      )}

      <h2 className="text-2xl font-bold text-slate-900">{name}</h2>
      <p className="mt-3 text-slate-600 text-sm">Best for personal finance users</p>

      <div className="mt-6">
        <span className="text-4xl font-extrabold text-slate-900">₹{price}</span>
        <span className="text-slate-500 ml-1 text-sm">/ month</span>
      </div>

      <ul className="text-slate-600 mt-6 space-y-2 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-emerald-500 font-bold">✓</span> {f}
          </li>
        ))}
      </ul>

      <button
        className={`mt-8 w-full py-3 rounded-xl transition font-semibold ${
          selected
            ? "bg-emerald-500 text-white shadow"
            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
        }`}
      >
        {selected ? "Selected" : "Choose Plan"}
      </button>
    </div>
  );
}
