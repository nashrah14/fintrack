import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Step1Img from "../assets/step1.png";
import Step2Img from "../assets/step2.png";
import Step3Img from "../assets/step3.png";


export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">

      {/* HEADER */}
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h1 className="text-5xl font-extrabold text-slate-900">
          How FinTrack Works
        </h1>

        <p className="text-slate-600 mt-4 text-lg">
          A simple yet powerful workflow designed to help you
          understand, manage, and master your financial life.
        </p>
      </div>

      {/* 3 STEP PROCESS */}
      <div className="container mx-auto px-6 mt-20 max-w-5xl space-y-20">

        {/* STEP 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-emerald-600">
              1. Add Your Transactions
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              Manually enter income and expenses - or import your data.
              FinTrack instantly categorizes everything using smart rules.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Quick manual entry</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Smart category suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Easy data import (CSV/Excel)</span>
              </li>
            </ul>
          </div>

          <img src={Step1Img}
  className="w-[420px] rounded-2xl shadow-lg"
  alt="Step 1 Illustration"
/>
</div>

        {/* STEP 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-emerald-600">
              2. Visualize Your Spending
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              Instantly understand your money flow through beautiful
              visualizations — pie charts, bar graphs, and category breakdowns.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Monthly & weekly spending insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Category-based analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Set budgets and track limits</span>
              </li>
            </ul>
          </div>

          <img
  src={Step2Img}
  className="w-[420px] rounded-2xl shadow-lg"
  alt="Step 2 Illustration"
/>

        </div>

        {/* STEP 3 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-emerald-600">
              3. Get Personalized Insights
            </h2>
            <p className="mt-3 text-slate-600 text-lg">
              FinTrack monitors patterns and provides helpful suggestions to
              optimize your saving habits and financial goals.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Smart alerts & reminders</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">Goal progress monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                <span className="text-slate-700">AI-powered recommendations</span>
              </li>
            </ul>
          </div>

          <img
  src={Step3Img}
  className="w-[420px] rounded-2xl shadow-lg"
  alt="Step 3 Illustration"
/>

        </div>
      </div>
    </div>
  );
}
