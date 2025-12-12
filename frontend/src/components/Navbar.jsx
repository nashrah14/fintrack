import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import API from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); 
  const [token] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUser = async () => {
      if (!token) return;
      setLoadingUser(true);
      try {
        const res = await API.get("/auth/me");
        if (!mounted) return;
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        if (mounted) setLoadingUser(false);
      }
    };
    fetchUser();
    return () => { mounted = false; };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative px-1 py-1 text-slate-700 hover:text-emerald-600 font-medium transition group"
      onClick={() => setOpen(false)}
    >
      <span className="inline-block">{children}</span>
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  
  const initials = user && user.name
    ? user.name.split(" ").map(n => n[0]).slice(0,2).join("").toUpperCase()
    : "";

  return (
    <header className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
        
          <div className="flex items-center gap-4">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3">
              <img src={Logo} alt="FinTrack" className="h-12 w-auto object-contain" />
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/features">Features</NavLink>
              <NavLink to="/pricing">Pricing</NavLink>
              <NavLink to="/how-it-works">How it works</NavLink>
            </nav>
          </div>

         
          <div className="flex items-center gap-4">
        
            <div className="hidden md:flex items-center gap-3">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    className="text-slate-700 hover:text-emerald-600 font-medium"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-full shadow hover:bg-emerald-600 transition"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="text-slate-700 hover:text-emerald-600 font-medium"
                  >
                    Dashboard
                  </Link>

                  <div className="relative">
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/profile");
                      }}
                      className="h-10 w-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-semibold"
                      title={user ? user.name : "Profile"}
                    >
                      {loadingUser ? "…" : (initials || "U")}
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 bg-slate-100 rounded hover:bg-slate-200 text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100"
              onClick={() => setOpen(prev => !prev)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden transition-max-height duration-300 overflow-hidden ${open ? "max-h-[500px] py-4" : "max-h-0"}`}>
          <nav className="flex flex-col gap-2 pb-4">
            <Link to="/" className="px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/features" className="px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Features</Link>
            <Link to="/pricing" className="px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Pricing</Link>
            <Link to="/how-it-works" className="px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>How it works</Link>

            <div className="border-t border-slate-100 mt-3 pt-3">
              {!token ? (
                <>
                  <Link to="/login" className="block px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Login</Link>
                  <Link to="/register" className="block px-2 py-2 bg-emerald-500 text-white text-center rounded">Get started</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="block px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Dashboard</Link>
                  <Link to="/profile" className="block px-2 py-2 text-slate-700 hover:text-emerald-600" onClick={() => setOpen(false)}>Profile</Link>
                  <button onClick={() => { handleLogout(); setOpen(false); }} className="w-full text-left px-2 py-2 text-red-600">Logout</button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
