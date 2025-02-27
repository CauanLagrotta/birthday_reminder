import { loginService } from "../../services/auth/login.service";
import { RequestHandler } from "express";
import dotenv from "dotenv";
dotenv.config();

export const loginController: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginService(email, password);

    // Add the token to the response cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    res.status(200).json({ message: "Login successful", token, user });

  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Usuário não encontrado" ||
        error.message === "Senha incorreta"
      ) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(500).json({ message: "Unknown error" });
    }
  }
};
