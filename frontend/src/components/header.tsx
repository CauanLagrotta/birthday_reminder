import logo from "/assets/logo.png";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import { api } from "../api";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function Header() {
  const [auth, setAuth] = useState(false);

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
    <div className="flex justify-between items-center p-4 bg-[#fff]">
      <Link to="/home">
        <img src={logo} alt="logo" className="w-[80px] h-auto" />
      </Link>

      <div className="flex items-center gap-6">
        {auth ? (
          <>
            <NavLink to="/home">Início</NavLink>
            <NavLink to="/about">Sobre | Como usar</NavLink>
            <Link to="/profile">
              <AccountCircleIcon
                sx={{ fontSize: 30 }}
                className="text-[#51446F] hover:text-blue-500 duration-300 ease-in-out cursor-pointer"
              />
            </Link>

            <Logout
              sx={{ fontSize: 30 }}
              className="text-[#51446F] hover:text-blue-500 duration-300 ease-in-out cursor-pointer"
              onClick={handleLogout}
            />
          </>
        ) : (
          <>
            <NavLink to="/home">Início</NavLink>
            <NavLink to="/about">Sobre | Como usar</NavLink>
            <NavLink to="/login">Login</NavLink>

            <Link
              to="/register"
              className="bg-[#51446F] border border-[#51446F] text-white py-2 px-4 rounded-4xl hover:bg-[#fff] hover:text-[#51446F] transition duration-300 ease-in-out"
            >
              Registrar-se
            </Link>
          </>
        )}
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
