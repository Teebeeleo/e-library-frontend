import React, { useState, useEffect } from "react";
import { IoBookOutline } from "react-icons/io5";
import {
  FiBookOpen, FiSearch, FiDownload, FiHeart, FiShield,
  FiUsers, FiBarChart2, FiMenu, FiX, FiArrowRight,
  FiCheckCircle, FiStar, FiFilter
} from "react-icons/fi";

export default function LandingPage({ setView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const features = [
    { icon: <FiUsers size={22} />,     title: "User Registration & Login",          desc: "Students can create accounts with their name, email, password and academic level."        },
    { icon: <FiShield size={22} />,    title: "Secure Authentication",              desc: "Passwords are encrypted and user sessions are securely stored."                           },
    { icon: <FiBookOpen size={22} />,  title: "Browse Digital Books",               desc: "Access a full catalogue of academic books organized by level."                            },
    { icon: <FiSearch size={22} />,    title: "Search by Title or Author",          desc: "Instantly find any book using the real-time search bar."                                  },
    { icon: <FiFilter size={22} />,    title: "Filter by Level (100L–500L)",        desc: "Students can filter books relevant to their academic level."                              },
    { icon: <FiBookOpen size={22} />,  title: "Read Books Online",                  desc: "Open and read PDF books directly in the browser."                                        },
    { icon: <FiDownload size={22} />,  title: "Download PDF Books",                 desc: "Download books for offline reading at any time."                                         },
    { icon: <FiHeart size={22} />,     title: "Add Books to Favorites",             desc: "Save your favourite books for quick access later."                                       },
    { icon: <FiStar size={22} />,      title: "Admin Book Management",              desc: "Admins can add, edit, and delete books with cover images and PDF links."                 },
    { icon: <FiUsers size={22} />,     title: "Admin Student Management",           desc: "View all registered students with their name, email, level and join date."               },
    { icon: <FiBarChart2 size={22} />, title: "Library Statistics & Analytics",     desc: "Admin dashboard shows total students, books and downloads at a glance."                  },
    { icon: <FiShield size={22} />,    title: "Responsive Design",                  desc: "Works perfectly on desktop, tablet and mobile devices."                                  },
  ];

  const steps = [
    { step: "01", title: "Register",      desc: "Create your account with your name, email and academic level."   },
    { step: "02", title: "Sign In",       desc: "Log in securely with your email and password."                   },
    { step: "03", title: "Browse Books",  desc: "Explore the full digital library catalogue."                     },
    { step: "04", title: "Search",        desc: "Find any book instantly by title or author."                     },
    { step: "05", title: "Read Online",   desc: "Open and read PDF books directly in your browser."               },
    { step: "06", title: "Download",      desc: "Save books to your device for offline reading."                  },
    { step: "07", title: "Favorite",      desc: "Save your favourite books to your personal list."                },
  ];

  const highlights = [
    { title: "Eliminates Paperwork",          desc: "No more manual record keeping. Everything is digital and organized." },
    { title: "24/7 Access",                   desc: "Students can access books anytime, anywhere, from any device."       },
    { title: "Improved Book Management",      desc: "Admins manage the entire library from one clean dashboard."          },
    { title: "Powerful Search & Filter",      desc: "Find the right book in seconds using search and level filters."      },
    { title: "Secure Authentication",         desc: "Every account is protected with encrypted passwords."                },
    { title: "Modern Responsive Interface",   desc: "A clean, professional UI that works on all screen sizes."            },
  ];

  const academicInfo = [
    { label: "Project Title",      value: "Smart E-Library Management System" },
    { label: "Developed By",       value: "[Leave Placeholder]"               },
    { label: "Institution",        value: "[Leave Placeholder]"               },
    { label: "Department",         value: "[Leave Placeholder]"               },
    { label: "Supervisor",         value: "[Leave Placeholder]"               },
    { label: "Academic Session",   value: "2025/2026"                         },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white shadow shadow-[#c0a062]/30">
              <IoBookOutline size={18} />
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              SMART <span className="text-[#c0a062]">E-LIBRARY</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {["features", "how-it-works", "about", "academic"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-gray-500 hover:text-[#c0a062] text-sm font-medium transition-colors capitalize"
              >
                {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setView("login")}
              className="text-sm font-semibold text-gray-700 hover:text-[#c0a062] transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setView("register")}
              className="text-sm font-semibold bg-[#c0a062] hover:bg-[#b18f4f] text-white px-5 py-2 rounded-xl transition-colors shadow shadow-[#c0a062]/30"
            >
              Register
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
            {["features", "how-it-works", "about", "academic"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="block text-gray-600 hover:text-[#c0a062] text-sm font-medium transition-colors capitalize w-full text-left"
              >
                {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setView("login")} className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-xl">Sign In</button>
              <button type="button" onClick={() => setView("register")} className="flex-1 bg-[#c0a062] text-white text-sm font-semibold py-2 rounded-xl">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 bg-linear-to-br from-white via-amber-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
              Smart E-Library Management System
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Your Digital Library,{" "}
              <span className="text-[#c0a062]">Anytime Anywhere</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              A modern web-based library system that gives students instant access to academic books
              while empowering administrators to manage the library with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setView("register")}
                className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2"
              >
                Get Started Free <FiArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setView("login")}
                className="border border-gray-300 hover:border-[#c0a062] text-gray-700 hover:text-[#c0a062] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-16 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
            <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 bg-white rounded-lg h-6 mx-4 border border-gray-200 flex items-center px-3">
                <span className="text-gray-400 text-xs">smart-elibrary.vercel.app</span>
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              {/* Mock header */}
              <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#c0a062] rounded-lg" />
                  <span className="text-xs font-bold text-gray-900">SMART <span className="text-[#c0a062]">E-LIBRARY</span></span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500 font-medium">📚 Books</div>
                  <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500 font-medium">🤍 Favorites</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500">Sign out</div>
              </div>
              {/* Mock search */}
              <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 shadow-sm">
                <div className="bg-gray-50 rounded-lg px-4 py-2 text-xs text-gray-400 border border-gray-200">🔍 Search by title or author…</div>
              </div>
              {/* Mock level filters */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {["All", "100L", "200L", "300L", "400L", "500L"].map((l, i) => (
                  <span key={l} className={`text-xs px-3 py-1 rounded-full font-medium border ${i === 0 ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-500 border-gray-200"}`}>{l}</span>
                ))}
              </div>
              {/* Mock book cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { title: "Introduction to Computing", author: "J. Smith", level: "100L" },
                  { title: "Engineering Mathematics", author: "A. Brown", level: "200L" },
                  { title: "Data Structures", author: "C. Davis", level: "300L" },
                ].map((book) => (
                  <div key={book.title} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3">
                    <div className="w-10 h-14 bg-teal-500 rounded-lg shrink-0 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold text-center leading-tight px-1">BOOK</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-[10px] font-semibold leading-tight truncate">{book.title}</p>
                      <p className="text-gray-400 text-[9px] mt-0.5">{book.author}</p>
                      <span className="inline-block mt-1 bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded-full font-semibold">Available</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              The Smart E-Library is packed with features designed for both students and administrators.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#c0a062]/30 transition-all group">
                <div className="w-11 h-11 bg-amber-50 text-[#c0a062] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c0a062] group-hover:text-white transition-colors">
                  {icon}
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 bg-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Your Journey in 7 Simple Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Getting started with the Smart E-Library is quick and easy.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
                <span className="text-4xl font-extrabold text-gray-100 absolute top-4 right-4">{step}</span>
                <div className="w-10 h-10 bg-[#c0a062] rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4 shadow shadow-[#c0a062]/30">
                  {step}
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">About</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Modernizing Library Operations for the Digital Age
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                The Smart E-Library Management System is a web-based application developed to modernize
                traditional library operations by providing students with easy access to digital academic
                resources while enabling administrators to efficiently manage books, users, and library activities.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                By replacing physical library processes with a modern digital platform, the system eliminates
                paperwork, reduces manual operations, and ensures students have 24/7 access to the academic
                resources they need to succeed.
              </p>
              <button
                type="button"
                onClick={() => setView("register")}
                className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors shadow shadow-[#c0a062]/30 flex items-center gap-2 w-fit"
              >
                Start Using the Library <FiArrowRight size={15} />
              </button>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map(({ title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <FiCheckCircle className="text-[#c0a062] mb-3" size={20} />
                  <h3 className="text-gray-900 font-bold text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC PROJECT ── */}
      <section id="academic" className="py-20 px-6 bg-amber-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Academic Project</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Final Year Project
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              This system was developed as a final year academic project to solve real-world library management challenges.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Card header */}
              <div className="bg-linear-to-r from-[#c0a062] to-[#b18f4f] px-8 py-6 text-center">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <IoBookOutline size={28} className="text-white" />
                </div>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Final Year Project</p>
                <h3 className="text-white text-xl font-extrabold">Smart E-Library Management System</h3>
              </div>

              {/* Card body */}
              <div className="px-8 py-6 divide-y divide-gray-50">
                {academicInfo.slice(1).map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-3.5">
                    <span className="text-gray-400 text-sm font-medium">{label}</span>
                    <span className={`text-sm font-semibold ${value === "[Leave Placeholder]" ? "text-gray-300 italic" : "text-gray-900"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 bg-linear-to-br from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
            Ready to Access Your Digital Library?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Join thousands of students already using the Smart E-Library to access academic resources anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setView("register")}
              className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2"
            >
              Create Free Account <FiArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => setView("login")}
              className="border border-gray-600 hover:border-[#c0a062] text-gray-300 hover:text-[#c0a062] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 border-t border-gray-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white">
                  <IoBookOutline size={18} />
                </div>
                <span className="font-bold text-white text-sm">SMART <span className="text-[#c0a062]">E-LIBRARY</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                A modern web-based library management system providing students with 24/7 access to digital academic resources.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["features", "how-it-works", "about", "academic"].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="block text-gray-500 hover:text-[#c0a062] text-sm transition-colors capitalize"
                  >
                    {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal & Contact */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Use", "Contact Us"].map((item) => (
                  <p key={item} className="text-gray-500 text-sm">{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">© 2026 Smart E-Library. All rights reserved.</p>
            <div className="flex gap-4">
              <button type="button" onClick={() => setView("login")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Sign In</button>
              <button type="button" onClick={() => setView("register")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Register</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
