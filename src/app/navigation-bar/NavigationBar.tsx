import { Link, useLocation } from "react-router-dom";
import { User, Menu } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/logo/logo.png";

const NavigationBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/events", label: "EVENTOS" },
    { to: "/cartelera", label: "CARTELERA" },
  ];

  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-8">
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={28} />
        </button>
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </Link>
      </div>

      <div
        className={`text-lg font-medium flex-1 flex justify-center items-center gap-6 
          ${
            menuOpen
              ? "absolute top-full left-0 bg-black w-full flex-col p-4"
              : "hidden md:flex"
          }
        `}
      >
        {navItems.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-1 rounded-md hover:bg-gray-700 transition-colors ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/login"
          className="hover:text-gray-400"
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
