// import React, { useState, useEffect } from "react";
// import { IoBookOutline } from "react-icons/io5";
// import {
//   FiBookOpen, FiSearch, FiDownload, FiHeart, FiShield,
//   FiUsers, FiBarChart2, FiMenu, FiX, FiArrowRight,
//   FiCheckCircle, FiStar, FiFilter
// } from "react-icons/fi";

// export default function LandingPage({ setView }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   function scrollTo(id) {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     setMenuOpen(false);
//   }

//   const features = [
//     { icon: <FiUsers size={22} />,     title: "User Registration & Login",          desc: "Students can create accounts with their name, email, password and academic level."        },
//     { icon: <FiShield size={22} />,    title: "Secure Authentication",              desc: "Passwords are encrypted and user sessions are securely stored."                           },
//     { icon: <FiBookOpen size={22} />,  title: "Browse Digital Books",               desc: "Access a full catalogue of academic books organized by level."                            },
//     { icon: <FiSearch size={22} />,    title: "Search by Title or Author",          desc: "Instantly find any book using the real-time search bar."                                  },
//     { icon: <FiFilter size={22} />,    title: "Filter by Level (100L–500L)",        desc: "Students can filter books relevant to their academic level."                              },
//     { icon: <FiBookOpen size={22} />,  title: "Read Books Online",                  desc: "Open and read PDF books directly in the browser."                                        },
//     { icon: <FiDownload size={22} />,  title: "Download PDF Books",                 desc: "Download books for offline reading at any time."                                         },
//     { icon: <FiHeart size={22} />,     title: "Add Books to Favorites",             desc: "Save your favourite books for quick access later."                                       },
//     { icon: <FiStar size={22} />,      title: "Admin Book Management",              desc: "Admins can add, edit, and delete books with cover images and PDF links."                 },
//     { icon: <FiUsers size={22} />,     title: "Admin Student Management",           desc: "View all registered students with their name, email, level and join date."               },
//     { icon: <FiBarChart2 size={22} />, title: "Library Statistics & Analytics",     desc: "Admin dashboard shows total students, books and downloads at a glance."                  },
//     { icon: <FiShield size={22} />,    title: "Responsive Design",                  desc: "Works perfectly on desktop, tablet and mobile devices."                                  },
//   ];

//   const steps = [
//     { step: "01", title: "Register",      desc: "Create your account with your name, email and academic level."   },
//     { step: "02", title: "Sign In",       desc: "Log in securely with your email and password."                   },
//     { step: "03", title: "Browse Books",  desc: "Explore the full digital library catalogue."                     },
//     { step: "04", title: "Search",        desc: "Find any book instantly by title or author."                     },
//     { step: "05", title: "Read Online",   desc: "Open and read PDF books directly in your browser."               },
//     { step: "06", title: "Download",      desc: "Save books to your device for offline reading."                  },
//     { step: "07", title: "Favorite",      desc: "Save your favourite books to your personal list."                },
//   ];

//   const highlights = [
//     { title: "Eliminates Paperwork",          desc: "No more manual record keeping. Everything is digital and organized." },
//     { title: "24/7 Access",                   desc: "Students can access books anytime, anywhere, from any device."       },
//     { title: "Improved Book Management",      desc: "Admins manage the entire library from one clean dashboard."          },
//     { title: "Powerful Search & Filter",      desc: "Find the right book in seconds using search and level filters."      },
//     { title: "Secure Authentication",         desc: "Every account is protected with encrypted passwords."                },
//     { title: "Modern Responsive Interface",   desc: "A clean, professional UI that works on all screen sizes."            },
//   ];

//   const academicInfo = [
//     { label: "Project Title",      value: "Smart E-Library Management System" },
//     { label: "Developed By",       value: "[Leave Placeholder]"               },
//     { label: "Institution",        value: "[Leave Placeholder]"               },
//     { label: "Department",         value: "[Leave Placeholder]"               },
//     { label: "Supervisor",         value: "[Leave Placeholder]"               },
//     { label: "Academic Session",   value: "2025/2026"                         },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">

//       {/* ── NAVBAR ── */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
//       }`}>
//         <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white shadow shadow-[#c0a062]/30">
//               <IoBookOutline size={18} />
//             </div>
//             <span className="font-bold text-gray-900 text-sm tracking-tight">
//               SMART <span className="text-[#c0a062]">E-LIBRARY</span>
//             </span>
//           </div>

//           {/* Desktop nav */}
//           <div className="hidden md:flex items-center gap-8">
//             {["features", "how-it-works", "about", "academic"].map((id) => (
//               <button
//                 key={id}
//                 type="button"
//                 onClick={() => scrollTo(id)}
//                 className="text-gray-500 hover:text-[#c0a062] text-sm font-medium transition-colors capitalize"
//               >
//                 {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Auth buttons */}
//           <div className="hidden md:flex items-center gap-3">
//             <button
//               type="button"
//               onClick={() => setView("login")}
//               className="text-sm font-semibold text-gray-700 hover:text-[#c0a062] transition-colors px-4 py-2"
//             >
//               Sign In
//             </button>
//             <button
//               type="button"
//               onClick={() => setView("register")}
//               className="text-sm font-semibold bg-[#c0a062] hover:bg-[#b18f4f] text-white px-5 py-2 rounded-xl transition-colors shadow shadow-[#c0a062]/30"
//             >
//               Register
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             type="button"
//             className="md:hidden text-gray-600"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//           </button>
//         </div>

//         {/* Mobile menu */}
//         {menuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3">
//             {["features", "how-it-works", "about", "academic"].map((id) => (
//               <button
//                 key={id}
//                 type="button"
//                 onClick={() => scrollTo(id)}
//                 className="block text-gray-600 hover:text-[#c0a062] text-sm font-medium transition-colors capitalize w-full text-left"
//               >
//                 {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//               </button>
//             ))}
//             <div className="flex gap-3 pt-2">
//               <button type="button" onClick={() => setView("login")} className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2 rounded-xl">Sign In</button>
//               <button type="button" onClick={() => setView("register")} className="flex-1 bg-[#c0a062] text-white text-sm font-semibold py-2 rounded-xl">Register</button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* ── HERO ── */}
//       <section className="pt-32 pb-20 px-6 bg-linear-to-br from-white via-amber-50/30 to-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="max-w-3xl mx-auto text-center">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">
//               Smart E-Library Management System
//             </span>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
//               Your Digital Library,{" "}
//               <span className="text-[#c0a062]">Anytime Anywhere</span>
//             </h1>
//             <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
//               A modern web-based library system that gives students instant access to academic books
//               while empowering administrators to manage the library with ease.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 type="button"
//                 onClick={() => setView("register")}
//                 className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2"
//               >
//                 Get Started Free <FiArrowRight size={16} />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setView("login")}
//                 className="border border-gray-300 hover:border-[#c0a062] text-gray-700 hover:text-[#c0a062] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
//               >
//                 Sign In
//               </button>
//             </div>
//           </div>

//           {/* Dashboard preview */}
//           <div className="mt-16 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
//             <div className="bg-gray-50 border-b border-gray-100 px-5 py-3 flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full bg-red-400" />
//               <div className="w-3 h-3 rounded-full bg-yellow-400" />
//               <div className="w-3 h-3 rounded-full bg-green-400" />
//               <div className="flex-1 bg-white rounded-lg h-6 mx-4 border border-gray-200 flex items-center px-3">
//                 <span className="text-gray-400 text-xs">smart-elibrary.vercel.app</span>
//               </div>
//             </div>
//             <div className="p-6 bg-gray-50">
//               {/* Mock header */}
//               <div className="bg-white rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm border border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-[#c0a062] rounded-lg" />
//                   <span className="text-xs font-bold text-gray-900">SMART <span className="text-[#c0a062]">E-LIBRARY</span></span>
//                 </div>
//                 <div className="flex gap-2">
//                   <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500 font-medium">📚 Books</div>
//                   <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500 font-medium">🤍 Favorites</div>
//                 </div>
//                 <div className="bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-500">Sign out</div>
//               </div>
//               {/* Mock search */}
//               <div className="bg-white rounded-xl p-3 mb-4 border border-gray-100 shadow-sm">
//                 <div className="bg-gray-50 rounded-lg px-4 py-2 text-xs text-gray-400 border border-gray-200">🔍 Search by title or author…</div>
//               </div>
//               {/* Mock level filters */}
//               <div className="flex gap-2 mb-4 flex-wrap">
//                 {["All", "100L", "200L", "300L", "400L", "500L"].map((l, i) => (
//                   <span key={l} className={`text-xs px-3 py-1 rounded-full font-medium border ${i === 0 ? "bg-teal-600 text-white border-teal-600" : "bg-white text-gray-500 border-gray-200"}`}>{l}</span>
//                 ))}
//               </div>
//               {/* Mock book cards */}
//               <div className="grid grid-cols-3 gap-3">
//                 {[
//                   { title: "Introduction to Computing", author: "J. Smith", level: "100L" },
//                   { title: "Engineering Mathematics", author: "A. Brown", level: "200L" },
//                   { title: "Data Structures", author: "C. Davis", level: "300L" },
//                 ].map((book) => (
//                   <div key={book.title} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3">
//                     <div className="w-10 h-14 bg-teal-500 rounded-lg shrink-0 flex items-center justify-center">
//                       <span className="text-white text-[8px] font-bold text-center leading-tight px-1">BOOK</span>
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-gray-900 text-[10px] font-semibold leading-tight truncate">{book.title}</p>
//                       <p className="text-gray-400 text-[9px] mt-0.5">{book.author}</p>
//                       <span className="inline-block mt-1 bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded-full font-semibold">Available</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURES ── */}
//       <section id="features" className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-14">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Features</span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
//               Everything You Need in One Place
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               The Smart E-Library is packed with features designed for both students and administrators.
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {features.map(({ icon, title, desc }) => (
//               <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-[#c0a062]/30 transition-all group">
//                 <div className="w-11 h-11 bg-amber-50 text-[#c0a062] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#c0a062] group-hover:text-white transition-colors">
//                   {icon}
//                 </div>
//                 <h3 className="text-gray-900 font-bold text-sm mb-2">{title}</h3>
//                 <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── HOW IT WORKS ── */}
//       <section id="how-it-works" className="py-20 px-6 bg-amber-50/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-14">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">How It Works</span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
//               Your Journey in 7 Simple Steps
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               Getting started with the Smart E-Library is quick and easy.
//             </p>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {steps.map(({ step, title, desc }) => (
//               <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative">
//                 <span className="text-4xl font-extrabold text-gray-100 absolute top-4 right-4">{step}</span>
//                 <div className="w-10 h-10 bg-[#c0a062] rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4 shadow shadow-[#c0a062]/30">
//                   {step}
//                 </div>
//                 <h3 className="text-gray-900 font-bold text-sm mb-2">{title}</h3>
//                 <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ABOUT ── */}
//       <section id="about" className="py-20 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-wider uppercase">About</span>
//               <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
//                 Modernizing Library Operations for the Digital Age
//               </h2>
//               <p className="text-gray-500 leading-relaxed mb-6">
//                 The Smart E-Library Management System is a web-based application developed to modernize
//                 traditional library operations by providing students with easy access to digital academic
//                 resources while enabling administrators to efficiently manage books, users, and library activities.
//               </p>
//               <p className="text-gray-500 leading-relaxed mb-8">
//                 By replacing physical library processes with a modern digital platform, the system eliminates
//                 paperwork, reduces manual operations, and ensures students have 24/7 access to the academic
//                 resources they need to succeed.
//               </p>
//               <button
//                 type="button"
//                 onClick={() => setView("register")}
//                 className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-7 py-3 rounded-xl text-sm transition-colors shadow shadow-[#c0a062]/30 flex items-center gap-2 w-fit"
//               >
//                 Start Using the Library <FiArrowRight size={15} />
//               </button>
//             </div>

//             {/* Highlights */}
//             <div className="grid grid-cols-2 gap-4">
//               {highlights.map(({ title, desc }) => (
//                 <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
//                   <FiCheckCircle className="text-[#c0a062] mb-3" size={20} />
//                   <h3 className="text-gray-900 font-bold text-sm mb-1">{title}</h3>
//                   <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── ACADEMIC PROJECT ── */}
//       <section id="academic" className="py-20 px-6 bg-amber-50/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Academic Project</span>
//             <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
//               Final Year Project
//             </h2>
//             <p className="text-gray-500 max-w-xl mx-auto">
//               This system was developed as a final year academic project to solve real-world library management challenges.
//             </p>
//           </div>

//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//               {/* Card header */}
//               <div className="bg-linear-to-r from-[#c0a062] to-[#b18f4f] px-8 py-6 text-center">
//                 <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                   <IoBookOutline size={28} className="text-white" />
//                 </div>
//                 <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Final Year Project</p>
//                 <h3 className="text-white text-xl font-extrabold">Smart E-Library Management System</h3>
//               </div>

//               {/* Card body */}
//               <div className="px-8 py-6 divide-y divide-gray-50">
//                 {academicInfo.slice(1).map(({ label, value }) => (
//                   <div key={label} className="flex justify-between items-center py-3.5">
//                     <span className="text-gray-400 text-sm font-medium">{label}</span>
//                     <span className={`text-sm font-semibold ${value === "[Leave Placeholder]" ? "text-gray-300 italic" : "text-gray-900"}`}>
//                       {value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="py-20 px-6 bg-linear-to-br from-gray-900 to-gray-800">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
//             Ready to Access Your Digital Library?
//           </h2>
//           <p className="text-gray-400 text-lg mb-10 leading-relaxed">
//             Join thousands of students already using the Smart E-Library to access academic resources anytime, anywhere.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               type="button"
//               onClick={() => setView("register")}
//               className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2"
//             >
//               Create Free Account <FiArrowRight size={16} />
//             </button>
//             <button
//               type="button"
//               onClick={() => setView("login")}
//               className="border border-gray-600 hover:border-[#c0a062] text-gray-300 hover:text-[#c0a062] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer className="bg-gray-900 border-t border-gray-800 px-6 py-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
//             {/* Brand */}
//             <div className="lg:col-span-2">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white">
//                   <IoBookOutline size={18} />
//                 </div>
//                 <span className="font-bold text-white text-sm">SMART <span className="text-[#c0a062]">E-LIBRARY</span></span>
//               </div>
//               <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
//                 A modern web-based library management system providing students with 24/7 access to digital academic resources.
//               </p>
//             </div>

//             {/* Quick links */}
//             <div>
//               <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
//               <div className="space-y-2">
//                 {["features", "how-it-works", "about", "academic"].map((id) => (
//                   <button
//                     key={id}
//                     type="button"
//                     onClick={() => scrollTo(id)}
//                     className="block text-gray-500 hover:text-[#c0a062] text-sm transition-colors capitalize"
//                   >
//                     {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Legal & Contact */}
//             <div>
//               <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
//               <div className="space-y-2">
//                 {["Privacy Policy", "Terms of Use", "Contact Us"].map((item) => (
//                   <p key={item} className="text-gray-500 text-sm">{item}</p>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
//             <p className="text-gray-600 text-xs">© 2026 Smart E-Library. All rights reserved.</p>
//             <div className="flex gap-4">
//               <button type="button" onClick={() => setView("login")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Sign In</button>
//               <button type="button" onClick={() => setView("register")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Register</button>
//             </div>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { IoBookOutline } from "react-icons/io5";
// import {
//   FiBookOpen, FiSearch, FiDownload, FiHeart, FiShield,
//   FiUsers, FiBarChart2, FiMenu, FiX, FiArrowRight,
//   FiCheckCircle, FiStar, FiFilter
// } from "react-icons/fi";

// export default function LandingPage({ setView }) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   function scrollTo(id) {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//     setMenuOpen(false);
//   }

//   const features = [
//     { icon: <FiUsers size={22} />,     title: "User Registration & Login",       desc: "Students create accounts with name, email, password and academic level."        },
//     { icon: <FiShield size={22} />,    title: "Secure Authentication",           desc: "Passwords are encrypted and sessions are securely stored."                      },
//     { icon: <FiBookOpen size={22} />,  title: "Browse Digital Books",            desc: "Access a full catalogue of academic books organised by level."                  },
//     { icon: <FiSearch size={22} />,    title: "Search by Title or Author",       desc: "Instantly find any book using the real-time search bar."                        },
//     { icon: <FiFilter size={22} />,    title: "Filter by Level (100L–500L)",     desc: "Students filter books relevant to their academic level."                        },
//     { icon: <FiBookOpen size={22} />,  title: "Read Books Online",               desc: "Open and read PDF books directly in the browser."                               },
//     { icon: <FiDownload size={22} />,  title: "Download PDF Books",              desc: "Download books for offline reading at any time."                                },
//     { icon: <FiHeart size={22} />,     title: "Add Books to Favorites",          desc: "Save favourite books for quick access later."                                   },
//     { icon: <FiStar size={22} />,      title: "Admin Book Management",           desc: "Admins add, edit and delete books with cover images and PDF links."             },
//     { icon: <FiUsers size={22} />,     title: "Admin Student Management",        desc: "View all registered students with name, email, level and join date."            },
//     { icon: <FiBarChart2 size={22} />, title: "Library Statistics & Analytics",  desc: "Admin dashboard shows total students, books and downloads at a glance."         },
//     { icon: <FiShield size={22} />,    title: "Responsive Design",               desc: "Works perfectly on desktop, tablet and mobile devices."                         },
//   ];

//   const steps = [
//     { step: "01", title: "Register",     desc: "Create your account with your name, email and academic level." },
//     { step: "02", title: "Sign In",      desc: "Log in securely with your email and password."                 },
//     { step: "03", title: "Browse Books", desc: "Explore the full digital library catalogue."                   },
//     { step: "04", title: "Search",       desc: "Find any book instantly by title or author."                   },
//     { step: "05", title: "Read Online",  desc: "Open and read PDF books directly in your browser."             },
//     { step: "06", title: "Download",     desc: "Save books to your device for offline reading."                },
//     { step: "07", title: "Favorite",     desc: "Save your favourite books to your personal list."              },
//   ];

//   const highlights = [
//     { title: "Eliminates Paperwork",        desc: "No more manual record keeping. Everything is digital and organised." },
//     { title: "24/7 Access",                 desc: "Students access books anytime, anywhere, from any device."           },
//     { title: "Improved Book Management",    desc: "Admins manage the entire library from one clean dashboard."          },
//     { title: "Powerful Search & Filter",    desc: "Find the right book in seconds using search and level filters."      },
//     { title: "Secure Authentication",       desc: "Every account is protected with encrypted passwords."                },
//     { title: "Modern Responsive Interface", desc: "A clean, professional UI that works on all screen sizes."            },
//   ];

//   const academicInfo = [
//     { label: "Developed By",     value: "[Leave Placeholder]" },
//     { label: "Institution",      value: "[Leave Placeholder]" },
//     { label: "Department",       value: "[Leave Placeholder]" },
//     { label: "Supervisor",       value: "[Leave Placeholder]" },
//     { label: "Academic Session", value: "2025/2026"           },
//   ];

//   const mockBooks = [
//     { title: "Introduction to Computing", author: "J. Smith",  level: "100L" },
//     { title: "Engineering Mathematics",   author: "A. Brown",  level: "200L" },
//     { title: "Data Structures & Algo",    author: "C. Davis",  level: "300L" },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans">

//       {/* ── NAVBAR ── */}
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"
//       }`}>
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white shadow shadow-[#c0a062]/30">
//               <IoBookOutline size={18} />
//             </div>
//             <span className="font-bold text-gray-900 text-sm tracking-tight">
//               SMART <span className="text-[#c0a062]">E-LIBRARY</span>
//             </span>
//           </div>

//           <div className="hidden md:flex items-center gap-8">
//             {["features", "how-it-works", "about", "academic"].map((id) => (
//               <button key={id} type="button" onClick={() => scrollTo(id)}
//                 className="text-gray-500 hover:text-[#c0a062] text-sm font-medium transition-colors">
//                 {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//               </button>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-3">
//             <button type="button" onClick={() => setView("login")}
//               className="text-sm font-semibold text-gray-700 hover:text-[#c0a062] transition-colors px-4 py-2">
//               Sign In
//             </button>
//             <button type="button" onClick={() => setView("register")}
//               className="text-sm font-semibold bg-[#c0a062] hover:bg-[#b18f4f] text-white px-5 py-2 rounded-xl transition-colors shadow shadow-[#c0a062]/30">
//               Register
//             </button>
//           </div>

//           <button type="button" className="md:hidden text-gray-600 p-1" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
//           </button>
//         </div>

//         {menuOpen && (
//           <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3">
//             {["features", "how-it-works", "about", "academic"].map((id) => (
//               <button key={id} type="button" onClick={() => scrollTo(id)}
//                 className="block text-gray-600 hover:text-[#c0a062] text-sm font-medium w-full text-left py-1">
//                 {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//               </button>
//             ))}
//             <div className="flex gap-3 pt-2">
//               <button type="button" onClick={() => setView("login")} className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl">Sign In</button>
//               <button type="button" onClick={() => setView("register")} className="flex-1 bg-[#c0a062] text-white text-sm font-semibold py-2.5 rounded-xl">Register</button>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* ── HERO ── */}
//       <section className="pt-28 pb-16 px-4 sm:px-6 bg-linear-to-br from-white via-amber-50/30 to-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="max-w-3xl mx-auto text-center">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
//               Smart E-Library Management System
//             </span>
//             <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
//               Your Digital Library,{" "}
//               <span className="text-[#c0a062]">Anytime Anywhere</span>
//             </h1>
//             <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
//               A modern web-based library system that gives students instant access to academic books
//               while empowering administrators to manage the library with ease.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <button type="button" onClick={() => setView("register")}
//                 className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2">
//                 Get Started Free <FiArrowRight size={16} />
//               </button>
//               <button type="button" onClick={() => setView("login")}
//                 className="border border-gray-300 hover:border-[#c0a062] text-gray-700 hover:text-[#c0a062] font-bold px-7 py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
//                 Sign In
//               </button>
//             </div>
//           </div>

//           {/* ── DASHBOARD PREVIEW — matches screenshot 1 ── */}
//           <div className="mt-12 max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
//             <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">

//               {/* Mock top header — logo + sign out */}
//               <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 bg-[#c0a062] rounded-lg flex items-center justify-center">
//                     <IoBookOutline size={13} className="text-white" />
//                   </div>
//                   <span className="text-[11px] font-bold text-gray-900">
//                     SMART <span className="text-[#c0a062]">E-LIBRARY</span>
//                   </span>
//                 </div>
//                 <div className="text-[10px] text-gray-400 border border-gray-200 rounded-lg px-2 py-1 flex items-center gap-1">
//                   ↪ Sign out
//                 </div>
//               </div>

//               {/* Mock Books / Favorites pill tabs — exactly like screenshot 1 */}
//               <div className="bg-white px-4 pt-3 pb-2 flex justify-center">
//                 <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
//                   <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white shadow-sm text-[11px] font-semibold text-gray-900">
//                     <FiBookOpen size={12} /> Books
//                   </div>
//                   <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-medium text-gray-500">
//                     <FiHeart size={12} /> Favorites
//                   </div>
//                 </div>
//               </div>

//               {/* Mock search */}
//               <div className="px-4 pb-2">
//                 <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2">
//                   <FiSearch size={12} className="text-gray-400" />
//                   <span className="text-[10px] text-gray-400">Search by title or author…</span>
//                 </div>
//               </div>

//               {/* Mock level filters — exactly like screenshot 1 layout */}
//               <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
//                 {["All", "100L", "200L", "300L", "400L", "500L"].map((l, i) => (
//                   <span key={l} className={`text-[10px] px-3 py-1 rounded-full font-semibold border ${
//                     i === 0
//                       ? "bg-teal-600 text-white border-teal-600"
//                       : "bg-white text-gray-600 border-gray-300"
//                   }`}>
//                     {l}
//                   </span>
//                 ))}
//               </div>

//               {/* Showing count */}
//               <div className="px-4 pb-2">
//                 <p className="text-[10px] text-gray-500">
//                   Showing <span className="font-bold text-gray-800">3</span> books
//                 </p>
//               </div>

//               {/* Mock book cards — match screenshot 1 card style exactly */}
//               <div className="px-4 pb-4 grid grid-cols-1 gap-2">
//                 {mockBooks.map((book) => (
//                   <div key={book.title} className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-3 shadow-sm">
//                     {/* Teal book cover */}
//                     <div className="w-10 h-14 bg-teal-500 rounded-lg shrink-0 flex items-center justify-center shadow-sm">
//                       <span className="text-white text-[7px] font-bold text-center leading-tight px-1">BOOK</span>
//                     </div>
//                     {/* Book info */}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-gray-900 text-[11px] font-semibold leading-tight">{book.title}</p>
//                       <p className="text-gray-500 text-[10px] mt-0.5">by {book.author}</p>
//                       <p className="text-gray-400 text-[9px] mt-0.5">{book.level}</p>
//                       <span className="inline-block mt-1.5 bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-semibold">
//                         Available
//                       </span>
//                     </div>
//                     {/* Action buttons */}
//                     <div className="flex flex-col gap-1.5 justify-center">
//                       <span className="text-[9px] text-teal-600 font-medium flex items-center gap-0.5 bg-teal-50 px-2 py-1 rounded-lg">
//                         <FiDownload size={9} /> PDF
//                       </span>
//                       <span className="text-[9px] text-gray-400 font-medium flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded-lg">
//                         <FiHeart size={9} /> Save
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Floating badges below preview */}
//             <div className="flex justify-center gap-2 mt-4 flex-wrap">
//               {["📚 Digital Books", "🔍 Smart Search", "⬇ PDF Download", "❤️ Favorites"].map((badge) => (
//                 <span key={badge} className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
//                   {badge}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── FEATURES ── */}
//       <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Features</span>
//             <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">Everything You Need in One Place</h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
//               The Smart E-Library is packed with features designed for both students and administrators.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {features.map(({ icon, title, desc }) => (
//               <div key={title} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-[#c0a062]/30 transition-all group">
//                 <div className="w-10 h-10 bg-amber-50 text-[#c0a062] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#c0a062] group-hover:text-white transition-colors">
//                   {icon}
//                 </div>
//                 <h3 className="text-gray-900 font-bold text-sm mb-1.5">{title}</h3>
//                 <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── HOW IT WORKS ── */}
//       <section id="how-it-works" className="py-16 sm:py-20 px-4 sm:px-6 bg-amber-50/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-12">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">How It Works</span>
//             <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">Your Journey in 7 Simple Steps</h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">Getting started with the Smart E-Library is quick and easy.</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {steps.map(({ step, title, desc }) => (
//               <div key={step} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
//                 <span className="text-5xl font-extrabold text-gray-100 absolute top-2 right-3 leading-none">{step}</span>
//                 <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white font-bold text-xs mb-3 shadow shadow-[#c0a062]/30 relative z-10">{step}</div>
//                 <h3 className="text-gray-900 font-bold text-sm mb-1.5 relative z-10">{title}</h3>
//                 <p className="text-gray-500 text-xs leading-relaxed relative z-10">{desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── ABOUT ── */}
//       <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-10 items-center">
//             <div>
//               <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">About</span>
//               <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
//                 Modernizing Library Operations for the Digital Age
//               </h2>
//               <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base">
//                 The Smart E-Library Management System is a web-based application developed to modernize
//                 traditional library operations by providing students with easy access to digital academic
//                 resources while enabling administrators to efficiently manage books, users, and library activities.
//               </p>
//               <p className="text-gray-500 leading-relaxed mb-7 text-sm sm:text-base">
//                 By replacing physical library processes with a modern digital platform, the system eliminates
//                 paperwork, reduces manual operations, and ensures students have 24/7 access to the academic
//                 resources they need to succeed.
//               </p>
//               <button type="button" onClick={() => setView("register")}
//                 className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors shadow shadow-[#c0a062]/30 flex items-center gap-2 w-fit">
//                 Start Using the Library <FiArrowRight size={15} />
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               {highlights.map(({ title, desc }) => (
//                 <div key={title} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
//                   <FiCheckCircle className="text-[#c0a062] mb-2.5" size={18} />
//                   <h3 className="text-gray-900 font-bold text-xs sm:text-sm mb-1">{title}</h3>
//                   <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── ACADEMIC PROJECT ── */}
//       <section id="academic" className="py-16 sm:py-20 px-4 sm:px-6 bg-amber-50/30">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-10">
//             <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Academic Project</span>
//             <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">Final Year Project</h2>
//             <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
//               This system was developed as a final year academic project to solve real-world library management challenges.
//             </p>
//           </div>
//           <div className="max-w-2xl mx-auto">
//             <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
//               <div className="bg-linear-to-r from-[#c0a062] to-[#b18f4f] px-6 sm:px-8 py-6 text-center">
//                 <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
//                   <IoBookOutline size={24} className="text-white" />
//                 </div>
//                 <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Final Year Project</p>
//                 <h3 className="text-white text-lg sm:text-xl font-extrabold">Smart E-Library Management System</h3>
//               </div>
//               <div className="px-6 sm:px-8 py-4 divide-y divide-gray-50">
//                 {academicInfo.map(({ label, value }) => (
//                   <div key={label} className="flex justify-between items-center py-3.5">
//                     <span className="text-gray-400 text-sm font-medium">{label}</span>
//                     <span className={`text-sm font-semibold ${value === "[Leave Placeholder]" ? "text-gray-300 italic" : "text-gray-900"}`}>
//                       {value}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="py-16 sm:py-20 px-4 sm:px-6 bg-linear-to-br from-gray-900 to-gray-800">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
//             Ready to Access Your Digital Library?
//           </h2>
//           <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
//             Join students already using the Smart E-Library to access academic resources anytime, anywhere.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-3 justify-center">
//             <button type="button" onClick={() => setView("register")}
//               className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2">
//               Create Free Account <FiArrowRight size={16} />
//             </button>
//             <button type="button" onClick={() => setView("login")}
//               className="border border-gray-600 hover:border-[#c0a062] text-gray-300 hover:text-[#c0a062] font-bold px-7 py-3.5 rounded-xl text-sm transition-colors">
//               Sign In
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer className="bg-gray-900 border-t border-gray-800 px-4 sm:px-6 py-10 sm:py-12">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
//             <div className="col-span-2">
//               <div className="flex items-center gap-2 mb-3">
//                 <div className="w-8 h-8 bg-[#c0a062] rounded-xl flex items-center justify-center text-white">
//                   <IoBookOutline size={16} />
//                 </div>
//                 <span className="font-bold text-white text-sm">SMART <span className="text-[#c0a062]">E-LIBRARY</span></span>
//               </div>
//               <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
//                 A modern web-based library management system providing students with 24/7 access to digital academic resources.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
//               <div className="space-y-2">
//                 {["features", "how-it-works", "about", "academic"].map((id) => (
//                   <button key={id} type="button" onClick={() => scrollTo(id)}
//                     className="block text-gray-500 hover:text-[#c0a062] text-xs sm:text-sm transition-colors capitalize">
//                     {id === "how-it-works" ? "How It Works" : id === "academic" ? "Academic" : id.charAt(0).toUpperCase() + id.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-white font-bold text-sm mb-3">Legal</h4>
//               <div className="space-y-2">
//                 {["Privacy Policy", "Terms of Use", "Contact Us"].map((item) => (
//                   <p key={item} className="text-gray-500 text-xs sm:text-sm">{item}</p>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
//             <p className="text-gray-600 text-xs">© 2026 Smart E-Library. All rights reserved.</p>
//             <div className="flex gap-4">
//               <button type="button" onClick={() => setView("login")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Sign In</button>
//               <button type="button" onClick={() => setView("register")} className="text-gray-600 hover:text-[#c0a062] text-xs transition-colors">Register</button>
//             </div>
//           </div>
//         </div>
//       </footer>

//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { IoBookOutline } from "react-icons/io5";
import {
  FiBookOpen,
  FiSearch,
  FiDownload,
  FiHeart,
  FiShield,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiArrowRight,
  FiCheckCircle,
  FiStar,
  FiFilter,
} from "react-icons/fi";
import { motion, useInView, useAnimation } from "framer-motion";

// ─── Reusable animation variants ───────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

// ─── Hook: trigger animation once when element enters viewport ──
function useFadeUp(threshold = 0.15) {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return { ref, controls };
}

// ─── Section wrapper ────────────────────────────────────────
function Section({ id, className, children }) {
  const { ref, controls } = useFadeUp();
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export default function LandingPage({ setView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const features = [
    {
      icon: <FiUsers size={22} />,
      title: "User Registration & Login",
      desc: "Students create accounts with name, email, password and academic level.",
    },
    {
      icon: <FiShield size={22} />,
      title: "Secure Authentication",
      desc: "Passwords are encrypted and sessions are securely stored.",
    },
    {
      icon: <FiBookOpen size={22} />,
      title: "Browse Digital Books",
      desc: "Access a full catalogue of academic books organised by level.",
    },
    {
      icon: <FiSearch size={22} />,
      title: "Search by Title or Author",
      desc: "Instantly find any book using the real-time search bar.",
    },
    {
      icon: <FiFilter size={22} />,
      title: "Filter by Level (100L–500L)",
      desc: "Students filter books relevant to their academic level.",
    },
    {
      icon: <FiBookOpen size={22} />,
      title: "Read Books Online",
      desc: "Open and read PDF books directly in the browser.",
    },
    {
      icon: <FiDownload size={22} />,
      title: "Download PDF Books",
      desc: "Download books for offline reading at any time.",
    },
    {
      icon: <FiHeart size={22} />,
      title: "Add Books to Favorites",
      desc: "Save favourite books for quick access later.",
    },
    {
      icon: <FiStar size={22} />,
      title: "Admin Book Management",
      desc: "Admins add, edit and delete books with cover images and PDF links.",
    },
    {
      icon: <FiUsers size={22} />,
      title: "Admin Student Management",
      desc: "View all registered students with name, email, level and join date.",
    },
    {
      icon: <FiBarChart2 size={22} />,
      title: "Library Statistics & Analytics",
      desc: "Admin dashboard shows total students, books and downloads at a glance.",
    },
    {
      icon: <FiShield size={22} />,
      title: "Responsive Design",
      desc: "Works perfectly on desktop, tablet and mobile devices.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Register",
      desc: "Create your account with your name, email and academic level.",
    },
    {
      step: "02",
      title: "Sign In",
      desc: "Log in securely with your email and password.",
    },
    {
      step: "03",
      title: "Browse Books",
      desc: "Explore the full digital library catalogue.",
    },
    {
      step: "04",
      title: "Search",
      desc: "Find any book instantly by title or author.",
    },
    {
      step: "05",
      title: "Read Online",
      desc: "Open and read PDF books directly in your browser.",
    },
    {
      step: "06",
      title: "Download",
      desc: "Save books to your device for offline reading.",
    },
    {
      step: "07",
      title: "Favorite",
      desc: "Save your favourite books to your personal list.",
    },
  ];

  const highlights = [
    {
      title: "Eliminates Paperwork",
      desc: "No more manual record keeping. Everything is digital and organised.",
    },
    {
      title: "24/7 Access",
      desc: "Students access books anytime, anywhere, from any device.",
    },
    {
      title: "Improved Book Management",
      desc: "Admins manage the entire library from one clean dashboard.",
    },
    {
      title: "Powerful Search & Filter",
      desc: "Find the right book in seconds using search and level filters.",
    },
    {
      title: "Secure Authentication",
      desc: "Every account is protected with encrypted passwords.",
    },
    {
      title: "Modern Responsive Interface",
      desc: "A clean, professional UI that works on all screen sizes.",
    },
  ];

  const academicInfo = [
    { label: "Developed By", value: "A.O. Toyeeb &  A.A. Adebayo" },
    { label: "Institution", value: "LAUTECH." },
    { label: "Department", value: "Computer Science" },
    { label: "Supervisor", value: "Prof W.O. Ismaila" },
    { label: "Academic Session", value: "2025/2026" },
  ];

  const mockBooks = [
    { title: "Introduction to Computing", author: "J. Smith", level: "100L" },
    {
      title: "Special Topic In Software",
      author: "Prof W.O. Ismaila",
      level: "500L",
    },
    {
      title: "Net Centric Networking",
      author: "Prof W.O Ismaila",
      level: "500L",
    },
  ];

  // ── Feature cards with stagger ──
  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 });
  const featuresControls = useAnimation();
  useEffect(() => {
    if (featuresInView) featuresControls.start("visible");
  }, [featuresInView, featuresControls]);

  // ── Steps with stagger ──
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, amount: 0.1 });
  const stepsControls = useAnimation();
  useEffect(() => {
    if (stepsInView) stepsControls.start("visible");
  }, [stepsInView, stepsControls]);

  // ── Highlights with stagger ──
  const highlightsRef = useRef(null);
  const highlightsInView = useInView(highlightsRef, {
    once: true,
    amount: 0.1,
  });
  const highlightsControls = useAnimation();
  useEffect(() => {
    if (highlightsInView) highlightsControls.start("visible");
  }, [highlightsInView, highlightsControls]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white shadow shadow-[#c0a062]/30">
              <IoBookOutline size={18} />
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">
              SMART <span className="text-[#c0a062]">E-LIBRARY</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["features", "how-it-works", "about", "academic"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-gray-500 cursor-pointer hover:text-[#c0a062] text-sm font-medium transition-colors duration-200"
              >
                {id === "how-it-works"
                  ? "How It Works"
                  : id === "academic"
                    ? "Academic"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <motion.button
              type="button"
              onClick={() => setView("login")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm font-semibold text-gray-700 hover:text-[#c0a062] transition-colors duration-200 px-4 py-2 cursor-pointer"
            >
              Sign In
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setView("register")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-sm font-semibold bg-[#c0a062] hover:bg-[#b18f4f] text-white px-5 py-2 rounded-xl transition-colors duration-200 shadow cursor-pointer shadow-[#c0a062]/30"
            >
              Register
            </motion.button>
          </div>

          <button
            type="button"
            className="md:hidden text-gray-600 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3"
          >
            {["features", "how-it-works", "about", "academic"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="block text-gray-600 hover:text-[#c0a062] text-sm font-medium w-full text-left py-1 transition-colors duration-200"
              >
                {id === "how-it-works"
                  ? "How It Works"
                  : id === "academic"
                    ? "Academic"
                    : id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setView("login")}
                className="flex-1 border border-gray-300 text-gray-700 text-sm font-semibold py-2.5 rounded-xl transition-colors hover:border-[#c0a062] hover:text-[#c0a062] duration-200"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className="flex-1 bg-[#c0a062] hover:bg-[#b18f4f] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── HERO — fade up once on load ── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 bg-linear-to-br from-white via-amber-50/30 to-white">
        <div className="max-w-6xl mx-auto">
          {/* Text content */}
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase"
            >
              Smart E-Library Management System
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5"
            >
              Your Digital Library,{" "}
              <span className="text-[#c0a062]">Anytime Anywhere</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              A modern web-based library system that gives students instant
              access to academic books while empowering administrators to manage
              the library with ease.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                type="button"
                onClick={() => setView("register")}
                whileHover={{ scale: 1.02, backgroundColor: "#b18f4f" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#c0a062] cursor-pointer text-white font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Get Started Free <FiArrowRight size={16} />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setView("login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border cursor-pointer border-gray-300 hover:border-[#c0a062] text-gray-700 hover:text-[#c0a062] font-bold px-7 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Sign In
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Dashboard preview */}
          <motion.div
            className="mt-12 max-w-xs sm:max-w-sm md:max-w-lg mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.35 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Mock header */}
              <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#c0a062] rounded-lg flex items-center justify-center">
                    <IoBookOutline size={13} className="text-white" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-900">
                    SMART <span className="text-[#c0a062]">E-LIBRARY</span>
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 border border-gray-200 rounded-lg px-2 py-1">
                  Sign out
                </div>
              </div>

              {/* Books / Favorites tabs */}
              <div className="bg-white px-4 pt-3 pb-2 flex justify-center">
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white shadow-sm text-[11px] font-semibold text-gray-900">
                    <FiBookOpen size={12} /> Books
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[11px] font-medium text-gray-500">
                    <FiHeart size={12} /> Favorites
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="px-4 pb-2">
                <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 flex items-center gap-2">
                  <FiSearch size={12} className="text-gray-400" />
                  <span className="text-[10px] text-gray-400">
                    Search by title or author…
                  </span>
                </div>
              </div>

              {/* Level filters */}
              <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
                {["All", "100L", "200L", "300L", "400L", "500L"].map((l, i) => (
                  <span
                    key={l}
                    className={`text-[10px] px-3 py-1 rounded-full font-semibold border ${
                      i === 0
                        ? "bg-[#beab85] text-white border-[#beab85]"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    {l}
                  </span>
                ))}
              </div>

              {/* Count */}
              <div className="px-4 pb-2">
                <p className="text-[10px] text-gray-500">
                  Showing <span className="font-bold text-gray-800">3</span>{" "}
                  books
                </p>
              </div>

              {/* Book cards */}
              <div className="px-4 pb-4 grid grid-cols-1 gap-2">
                {mockBooks.map((book) => (
                  <div
                    key={book.title}
                    className="bg-white border border-gray-100 rounded-2xl p-3 flex gap-3 shadow-sm"
                  >
                    <div className="w-10 h-14 bg-[#beab85] rounded-lg shrink-0 flex items-center justify-center shadow-sm">
                      <span className="text-white text-[7px] font-bold text-center leading-tight px-1">
                        BOOK
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-[11px] font-semibold leading-tight">
                        {book.title}
                      </p>
                      <p className="text-gray-500 text-[10px] mt-0.5">
                        by {book.author}
                      </p>
                      <p className="text-gray-400 text-[9px] mt-0.5">
                        {book.level}
                      </p>
                      <span className="inline-block mt-1.5 bg-green-100 text-green-700 text-[9px] px-2 py-0.5 rounded-full font-semibold">
                        Available
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 justify-center">
                      <span className="text-[9px] text-teal-600 font-medium flex items-center gap-0.5 bg-teal-50 px-2 py-1 rounded-lg">
                        <FiDownload size={9} /> PDF
                      </span>
                      <span className="text-[9px] text-gray-400 font-medium flex items-center gap-0.5 bg-gray-50 px-2 py-1 rounded-lg">
                        <FiHeart size={9} /> Save
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="flex justify-center gap-2 mt-4 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {[
                "📚 Digital Books",
                "🔍 Smart Search",
                "⬇ PDF Download",
                "❤️ Favorites",
              ].map((badge) => (
                <span
                  key={badge}
                  className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES — staggered cards ── */}
      <section id="features" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Section className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              The Smart E-Library is packed with features designed for both
              students and administrators.
            </p>
          </Section>

          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresControls}
            variants={staggerContainer(0.07)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 group cursor-default"
              >
                <div className="w-10 h-10 bg-amber-50 text-[#c0a062] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#c0a062] group-hover:text-white transition-colors duration-200">
                  {icon}
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-1.5">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS — staggered ── */}
      <section
        id="how-it-works"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-amber-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <Section className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Your Journey in 7 Simple Steps
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Getting started with the Smart E-Library is quick and easy.
            </p>
          </Section>

          <motion.div
            ref={stepsRef}
            initial="hidden"
            animate={stepsControls}
            variants={staggerContainer(0.08)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {steps.map(({ step, title, desc }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                whileHover={{ y: -4, boxShadow: "0 6px 20px rgba(0,0,0,0.07)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative overflow-hidden cursor-default"
              >
                <span className="text-5xl font-extrabold text-gray-100 absolute top-2 right-3 leading-none select-none">
                  {step}
                </span>
                <div className="w-9 h-9 bg-[#c0a062] rounded-xl flex items-center justify-center text-white font-bold text-xs mb-3 shadow shadow-[#c0a062]/30 relative z-10">
                  {step}
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-1.5 relative z-10">
                  {title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed relative z-10">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <Section className="">
              <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
                About
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                Modernizing Library Operations for the Digital Age
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4 text-sm sm:text-base">
                The Smart E-Library Management System is a web-based application
                developed to modernize traditional library operations by
                providing students with easy access to digital academic
                resources while enabling administrators to efficiently manage
                books, users, and library activities.
              </p>
              <p className="text-gray-500 leading-relaxed mb-7 text-sm sm:text-base">
                By replacing physical library processes with a modern digital
                platform, the system eliminates paperwork, reduces manual
                operations, and ensures students have 24/7 access to the
                academic resources they need to succeed.
              </p>
              <motion.button
                type="button"
                onClick={() => setView("register")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#c0a062] hover:bg-[#b18f4f] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors duration-200 shadow shadow-[#c0a062]/30 flex items-center gap-2 w-fit"
              >
                Start Using the Library <FiArrowRight size={15} />
              </motion.button>
            </Section>

            <motion.div
              ref={highlightsRef}
              initial="hidden"
              animate={highlightsControls}
              variants={staggerContainer(0.08)}
              className="grid grid-cols-2 gap-3"
            >
              {highlights.map(({ title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-100 cursor-default"
                >
                  <FiCheckCircle className="text-[#c0a062] mb-2.5" size={18} />
                  <h3 className="text-gray-900 font-bold text-xs sm:text-sm mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC PROJECT ── */}
      <Section
        id="academic"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-amber-50/30"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-[#c0a062] text-xs font-bold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Academic Project
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Final Year Project
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              This system was developed as a final year academic project to
              solve real-world library management challenges.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#c0a062] to-[#b18f4f] px-6 sm:px-8 py-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <IoBookOutline size={24} className="text-white" />
                </div>
                <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">
                  Final Year Project
                </p>
                <h3 className="text-white text-lg sm:text-xl font-extrabold">
                  Smart E-Library Management System
                </h3>
              </div>
              <div className="px-6 sm:px-8 py-4 divide-y divide-gray-50">
                {academicInfo.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-3.5"
                  >
                    <span className="text-gray-400 text-sm font-medium">
                      {label}
                    </span>
                    <span
                      className={`text-sm font-semibold ${value === "[Leave Placeholder]" ? "text-gray-300 italic" : "text-gray-900"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section className="py-16 sm:py-20 px-4 sm:px-6 bg-linear-to-br from-gray-900 to-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-5 leading-tight">
            Ready to Access Your Digital Library?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
            Join students already using the Smart E-Library to access academic
            resources anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              type="button"
              onClick={() => setView("register")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#c0a062] cursor-pointer hover:bg-[#b18f4f] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-[#c0a062]/30 flex items-center justify-center gap-2"
            >
              Create Free Account <FiArrowRight size={16} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setView("login")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-gray-600 cursor-pointer hover:border-[#c0a062] text-gray-300 hover:text-[#c0a062] font-bold px-7 py-3.5 rounded-xl text-sm transition-colors duration-200"
            >
              Sign In
            </motion.button>
          </div>
        </div>
      </Section>

      {/* ── FOOTER — static, no animation ── */}
      <footer className="bg-gray-900 border-t border-gray-800 px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#c0a062] rounded-xl flex items-center justify-center text-white">
                  <IoBookOutline size={16} />
                </div>
                <span className="font-bold text-white text-sm">
                  SMART <span className="text-[#c0a062]">E-LIBRARY</span>
                </span>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-xs">
                A modern web-based library management system providing students
                with 24/7 access to digital academic resources.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
              <div className="space-y-2">
                {["features", "how-it-works", "about", "academic"].map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => scrollTo(id)}
                    className="block text-gray-500 hover:text-[#c0a062] text-xs sm:text-sm transition-colors duration-200 capitalize cursor-pointer"
                  >
                    {id === "how-it-works"
                      ? "How It Works"
                      : id === "academic"
                        ? "Academic"
                        : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-3">Legal</h4>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Use", "Contact Us"].map(
                  (item) => (
                    <p key={item} className="text-gray-500 text-xs sm:text-sm">
                      {item}
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-xs">
              © 2026 Smart E-Library. All rights reserved.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setView("login")}
                className="text-gray-600 cursor-pointer hover:text-[#c0a062] text-xs transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className="text-gray-600 cursor-pointer hover:text-[#c0a062] text-xs transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
