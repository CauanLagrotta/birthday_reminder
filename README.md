# 🎉 Birthday Reminder

Um sistema inteligente para nunca esquecer aniversários importantes! Com lembretes diários por e-mail, integração com IA e uma experiência amigável.

![Demo](frontend/public/assets/logo.png)

## ✨ Funcionalidades

- **🕗 Lembretes Automáticos**: Envio diário de e-mails às 8:00 AM via node-cron
- **🤖 Gemini AI Integration**:
  - Verificação humana através de elogios criativos
  - Sugestões personalizadas de mensagens de aniversário
- **🔐 Autenticação Segura**: JWT + cookies com sistema completo de reset de senha
- **📅 CRUD de Aniversários**: Criação, edição e exclusão de lembretes
- **📦 Dockerizado**: Configuração simplificada do PostgreSQL
- **💌 Envio de E-mails**: Integração com Brevo SMTP
- **🎨 Interface Moderna**: React + Tailwind CSS com componentes MUI

## 🛠 Tecnologias

**Backend**  
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?logo=prisma)
![Gemini API](https://img.shields.io/badge/-Gemini_API-FF6F61)
![Docker](https://img.shields.io/badge/docker-257bd6)

**Frontend**  
![React](https://img.shields.io/badge/-React-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwind-css)
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios)
![Formik](https://img.shields.io/badge/formik-257bd6?style=for-the-badge&logo=formik&logoColor=white)

## 🚀 Instalação

1. **Clonar repositório**
   ```bash
   git clone https://github.com/CauanLagrotta/birthday_reminder.git
   cd birthday_reminder
   ```
2. **Configurar banco de dados**
   ```bash
   cd backend
   docker-compose up -d
   npx prisma generate
   npx prisma migrate dev
   ```

3. **Instalar dependências**
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd frontend
    npm install
    ```
---
## ⚙ Configuração
**Backend(.env)**
  ```bash
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_banco?schema=public"
    BREVO_SMTP_HOST="smtp-relay.brevo.com"
    BREVO_SMTP_PASS="sua_senha_brevo"
    GEMINI_API_KEY="sua_chave_gemini"
    TOKEN="seu_secret_jwt"
  ```

**Frontend(.env)**
  ```bash
  VITE_API_BASE_URL=http://localhost:3000
  ```

# ▶ Execução
  ```bash
  # Iniciar Banco de Dados
  cd backend
  docker-compose up -d

  # Backend (dev mode)
  npm run dev

  # Frontend (em outro terminal)
  cd frontend
  npm run dev
  ```

# 📂 Estrutura do Projeto
  ```
  birthday_reminder/
  ├── backend
  │   ├── prisma/         # Schema do banco de dados
  │   ├── src/
  │   │   ├── jobs/       # Agendador de tarefas
  │   │   ├── routes/     # Rotas da API
  │   │   └── services/   # Lógica de negócios
  │
  └── frontend
    ├── public/         # Assets estáticos
    └── src/
        ├── pages/      # Componentes de página
        ├── hooks/      # Contextos globais
        └── components/ # Componentes reutilizáveis
  ```
