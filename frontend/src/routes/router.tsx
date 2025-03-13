import { Routes, Route } from "react-router-dom";
import { BirthdayRegister } from "../pages/birthday-register";
import { GetBirthdays } from "../pages/get-birthdays";
import { ProveYoureHuman } from "../pages/prove_youre_human";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ResetPassword } from "../pages/reset-password";
import { ForgotPassword } from "../pages/forgot-password";
import { About } from "../pages/about";
import { Profile } from "../pages/profile";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<ProveYoureHuman />} />
            <Route path="/birthday-register" element={<BirthdayRegister />} />
            <Route path="/get-birthdays" element={<GetBirthdays />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/reset-password/:id/:token" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    )
}