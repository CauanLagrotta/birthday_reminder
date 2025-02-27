import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { ProveYoureHuman } from "../pages/prove_youre_human";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { About } from "../pages/about";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<ProveYoureHuman />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
        </Routes>
    )
}