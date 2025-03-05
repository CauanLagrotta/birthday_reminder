import logo from "/assets/logo.png";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { api } from "../api";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Header() {
  const [auth, setAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/auth/header", { withCredentials: true })
      .then(() => {
        setAuth(true);
      })
      .catch((error) => {
        console.log(error);
        setAuth(false);
      });
  }, []);

  const handleLogout = () => {
    api.get("/auth/logout").then(() => {
      setAuth(false);
      navigate("/home");
    });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white relative">
      <Link to="/home">
        <img src={logo} alt="logo" className="w-[80px] h-auto" />
      </Link>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-white shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out flex flex-col items-center justify-center gap-6 md:static md:w-auto md:bg-transparent md:shadow-none md:translate-x-0 md:flex-row md:items-center`}
      >
        <NavLink to="/home" onClick={() => setMenuOpen(false)}>Início</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>Sobre | Como usar</NavLink>
        {auth ? (
          <>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              <AccountCircleIcon sx={{ fontSize: 30 }} className="text-[#51446F] hover:text-blue-500 duration-300 ease-in-out cursor-pointer" />
            </Link>
            <Logout
              sx={{ fontSize: 30 }}
              className="text-[#51446F] hover:text-blue-500 duration-300 ease-in-out cursor-pointer"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>
            <Link
              to="/register"
              className="bg-[#51446F] border border-[#51446F] text-white py-2 px-4 rounded-4xl hover:bg-[#fff] hover:text-[#51446F] transition duration-300 ease-in-out"
              onClick={() => setMenuOpen(false)}
            >
              Registrar-se
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function NavLink({ to, children, onClick }: NavLinkProps) {
  return (
    <Link to={to} className="relative group" onClick={onClick}>
      <span className="text-lg">{children}</span>
      <span className="block absolute bottom-[-2px] left-0 w-0 h-1 bg-[#51446F] transition-all duration-500 group-hover:w-full"></span>
    </Link>
  );
}