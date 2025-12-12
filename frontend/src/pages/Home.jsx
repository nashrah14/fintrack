import React from "react";
import { Link } from "react-router-dom";
import financeImg from "../assets/finance.png"; 
import Logo from "../assets/logo.png"; 

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white">
        <div className="container mx-auto px-6 py-20 md:py-24 flex flex-col md:flex-row items-center gap-8">

          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Take Control of Your{" "}
              <span className="text-emerald-600">Finances</span>
            </h1>

            <p className="mt-5 text-lg text-slate-600">
              Track expenses, manage income, analyze spending patterns, and improve financial habits - all in one powerful dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg hover:scale-[1.01] transition"
              >
                Get Started
              </Link>

              <Link to="/how-it-works" className="text-sm text-slate-600 hover:text-slate-800">
                How it works →
              </Link>
            </div>
            <div className="mt-8 hidden sm:flex gap-10">
              <div>
                <div className="text-xl font-semibold text-slate-900">₹48K+</div>
                <div className="text-sm text-slate-500">Total tracked</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">2.3K</div>
                <div className="text-sm text-slate-500">Active users</div>
              </div>
              <div>
                <div className="text-xl font-semibold text-slate-900">4.9</div>
                <div className="text-sm text-slate-500">Avg rating</div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <div
              className="relative hero-card rounded-3xl overflow-hidden bg-white"
              style={{ width: 520, height: 450}}
            >
              <div className="absolute -left-10 -top-12 w-55 h-56 rounded-full bg-gradient-to-tr from-emerald-100 to-teal-50 opacity-80 blur-3xl -z-10"></div>

              <div className="absolute -right-6 -top-6 w-28 h-20 rounded-xl bg-white/80 shadow-md flex items-center justify-center text-sm text-slate-700 font-medium transform rotate-3">
                Insights
              </div>
              <div className="absolute -right-6 bottom-6 w-28 h-16 rounded-xl bg-white/80 shadow-sm flex items-center justify-center text-sm text-slate-700 transform -rotate-2">
                Trends
              </div>
              <div className="p-8">
                <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-4">
                  <img
                    src={financeImg}
                    alt="Finance illustration"
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/60 -z-0"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl p-10 shadow-lg">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Master your money, grow your future</h2>
              <p className="mt-3 text-slate-600">
                FinTrack brings clarity to your spending, helps you build good habits, and gives data-driven insights so your money works for you.
              </p>

              <div className="mt-6 flex gap-3">
                <Link to="/register" className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-sm">Create account</Link>
                <Link to="/features" className="text-slate-600 hover:text-slate-800">See features</Link>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="w-56 h-40 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-900">Net Balance</div>
                  <div className="text-2xl font-bold text-emerald-600 mt-2">₹12,450</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-slate-800 text-center">Why Choose FinTrack?</h3>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-slate-900">Automatic Categorization</h4>
            <p className="mt-2 text-slate-600">Smart rules to classify transactions automatically, saving you time.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-slate-900">Beautiful Insights</h4>
            <p className="mt-2 text-slate-600">Charts & trends to help you discover where your money goes.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h4 className="text-lg font-semibold text-slate-900">Secure & Private</h4>
            <p className="mt-2 text-slate-600">JWT-based auth and secure storage for your financial data.</p>
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-slate-100 mt-12">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={Logo} alt="FinTrack" className="w-[165px] h-auto object-contain" />
            <div className="text-slate-600 text-sm">© {new Date().getFullYear()} FinTrack. All rights reserved.</div>
          </div>

          <div className="mt-4 md:mt-0 text-slate-600 text-sm">Built with ♥ for personal finance</div>
        </div>
      </footer>
    </div>
  );
}
