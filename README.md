# 🎵 SoundDiary

> Seu diário musical pessoal — registre, avalie e explore suas músicas favoritas.

![Ionic](https://img.shields.io/badge/Ionic-7-3880FF?logo=ionic)
![Angular](https://img.shields.io/badge/Angular-16-DD0031?logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql)

---

## 📱 Sobre o Projeto

O **SoundDiary** é um aplicativo mobile desenvolvido com **Ionic + Angular** que permite ao usuário registrar as músicas que ouviu, avaliar com estrelas, favoritar e acompanhar estatísticas musicais em um dashboard interativo.

---

## ✨ Funcionalidades

- 🔐 Login e cadastro com autenticação **JWT**
- 🏠 Home com estatísticas em tempo real e escutas recentes
- 🎵 Feed de escutas com busca, favoritar e deletar
- 📊 Dashboard com ranking por gênero e gráficos
- ❤️ Tela de favoritos
- 👤 Perfil com foto, edição de nome, email e senha
- 🎬 Splash screen animada
- 📱 Responsivo para mobile

---

## 🛠️ Tecnologias

### Frontend
- Ionic 7
- Angular 16 (Standalone Components)
- TypeScript
- SCSS

### Backend
- Node.js
- Express.js
- JWT (autenticação)
- Multer (upload de imagens)

### Banco de Dados
- MySQL
- 6 tabelas relacionais

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- MySQL
- Ionic CLI

### Backend
```bash
cd backend
npm install
# Configure o .env com suas credenciais MySQL
npm run dev
```

### Banco de Dados
Execute o SQL em `backend/database.sql` no seu MySQL.

### Frontend
```bash
cd frontend
npm install
ionic serve
```

---

## 📂 Estrutura do Projeto
sounddiary/
├── backend/          # API REST Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── config/
│   └── package.json
└── frontend/         # App Ionic + Angular
├── src/
│   ├── app/
│   │   ├── pages/
│   │   ├── services/
│   │   └── splash/
│   └── environments/
└── package.json
---

## 👨‍💻 Desenvolvedor

**JoaoVitorXdz**

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.