import { Link, useLocation } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { useState } from "react";
import logo from "../../logo/logo.png";

const NavigationBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: "HOME" },
    { to: "/events", label: "EVENTOS" },
    { to: "/tickets", label: "TICKETS" },
    { to: "/productores", label: "PRODUCTORES" },
    { to: "/contacto", label: "CONTACTO" },
    { to: "/preguntas", label: "PREGUNTAS" },
  ];

  return (
    <nav className="bg-brand-navbar text-brand-white mx-0 py-0 mb-4 flex items-center justify-between sticky top-0 z-20">
      <div className="flex md:hidden items-center mx-2 px-4 py-2 ">
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-brand-white"
        >
          <Menu size={28} />
        </button>
      </div>

      <div className="flex-1 flex justify-center md:justify-start">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
        >
          <img src={logo} alt="Logo" className="h-10 sm:h-10 w-auto " />
        </Link>
      </div>

      <div
        className={`${
          menuOpen
            ? "absolute top-full left-0 w-full bg-black flex flex-col items-center gap-4 py-6"
            : "hidden"
        } md:flex md:static md:flex-row md:gap-6 md:items-center md:ml-8`}
      >
        {navItems.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-1 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-brand-lightGray text-brand-darkerText font-semibold"
                  : "hover:bg-brand-lightGray hover:text-brand-darkerText"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center px-6 py-2 ">
        <Link
          to="/login"
          className="hover:text-brand-lightGray"
          title="Usuario"
          onClick={() => setMenuOpen(false)}
        >
          <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
