import { prisma } from "../../db/database";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateResetToken } from "./reset-password.service";
import path from "path";
dotenv.config();

export const forgotPasswordService = async (email: string) => {
  const user = await prisma.users.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = generateResetToken(email, user.id);
  const resetUrl = `${process.env.FRONTEND_URL}/${user.id}/${resetToken}`;

  const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  await transporter.verify();

  const mailOptions = {
    from: "cauansilvalagrotta@gmail.com",
    to: user.email,
    subject: "Redefinição de senha",
    text: "Você solicitou a redefinição da sua senha",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; text-align: center; padding: 40px;">
        <!-- Logo -->
        <img src="cid:logo" alt="logo" style="width: 80px; height: auto; margin-bottom: 20px;">
        
        <!-- Título -->
        <h1 style="color: #000000; font-size: 24px; margin-bottom: 20px;">REDEFINIÇÃO DE SENHA</h1>
        
        <!-- Imagem principal -->
        <img src="cid:reset_password" alt="Chave saindo de um cadeado" style="width: 150px; height: auto; margin-bottom: 20px;">
        
        <!-- Texto explicativo -->
        <p style="color: #333333; font-size: 16px; margin-bottom: 20px;">
          Você solicitou a redefinição da sua senha? Clique no botão abaixo para redefini-la
        </p>
        
        <!-- Botão -->
        <a href="${resetUrl}" 
           style="display: inline-block; background-color: #51446f; color: #ffffff; 
                  padding: 15px 20px; border-radius: 8px; text-decoration: none; 
                  font-size: 16px;">
          clique aqui para redefinir sua senha
        </a>
      </div>
    `,
    attachments: [
      {
        filename: "logo.png",
        cid: "logo",
        path: path.join(__dirname, "../../../assets/logo.png"),
        contentDisposition: "inline" as "inline",
      },
      {
        filename: "reset_password.png",
        cid: "reset_password",
        path: path.join(__dirname, "../../../assets/reset_password.png"),
        contentDisposition: "inline" as "inline",
      }
    ]
  };

  await transporter.sendMail(mailOptions);
};
