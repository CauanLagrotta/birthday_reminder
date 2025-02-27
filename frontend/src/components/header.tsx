import logo from "/assets/logo.png";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import { api } from "../api"

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function Header() {
  return (
    <div className="flex justify-between items-center p-4 bg-[#fff]">
      <Link to="/home">
        <img src={logo} alt="logo" className="w-[80px] h-auto" />
      </Link>

      <div className="flex items-center gap-6">
        <NavLink to="/home">Início</NavLink>
        <NavLink to="/about">Sobre | Como usar</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Registrar-se</NavLink>
        <AccountCircleIcon
          sx={{ fontSize: 30 }}
          className="text-[#51446F] hover:text-blue-500 duration-300 ease-in-out cursor-pointer"
        />
      </div>
    </div>
  );
}

function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link to={to} className="relative group">
      <span className="text-lg">{children}</span>
      <span className="block absolute bottom-[-2px] left-0 w-0 h-1 bg-[#51446F] transition-all duration-500 group-hover:w-full"></span>
    </Link>
  );
}
