import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { ProveYoureHuman } from "../pages/prove_youre_human";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<ProveYoureHuman />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}