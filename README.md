<div align="center">

# **FinTrack - Personal Finance Tracker**
A modern full-stack finance management app built with **React, Node.js, Express, and MongoDB**.

Track expenses, manage income, analyze spending patterns, and maintain a financially organized life with a clean, responsive UI and secure backend.

###  Live Demo
**Live App:** https://fintrack-ten-orcin.vercel.app/  
**Backend API:** https://fintrack-backend-co60.onrender.com/
</div>

## Project Summary

FinTrack is a full-stack application designed to demonstrate industry-level engineering skills including secure authentication, scalable backend architecture, cloud deployment, and modern UI/UX.

Built with a strong emphasis on clarity, maintainability, and production-readiness, this project highlights:

- Full-stack development capability  
- API design & JWT authentication  
- Cloud hosting & environment configuration  
- UI/UX implementation using TailwindCSS  
- Database modeling & CRUD operations  

---

##  Badges

![React](https://img.shields.io/badge/Frontend-React-blue)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)
![Render](https://img.shields.io/badge/Backend-Render-blueviolet)

---

## Key Features

### 🔐 Authentication & User Management
- Register, login, logout  
- Secure JWT-based authentication  
- Update profile details  
- Change password with validation  

### 💸 Finance Tracking
- Add, edit, delete, and filter transactions  
- Track expenses vs income  
- Categorize spending  
- Clean and intuitive dashboard

### 🎨 UI/UX
- Fully responsive design  
- Modern, minimal TailwindCSS styling  
- Professional color palette  
- Smooth navigation across pages  

### ☁️ DevOps & Deployment
- Frontend deployed on **Vercel**  
- Backend deployed on **Render**  
- Database hosted on **MongoDB Atlas**  
- Environment-based configurations  
- Secure production setup with Helmet, CORS rules, and rate limiting  

---



## Tech Stack

**Frontend:** React, React Router, TailwindCSS, Axios  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose  
**Tools & Deployment:** Vercel, Render, JWT  

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a user |
| POST | /auth/login | Login and receive JWT |
| GET | /auth/me | Fetch authenticated user |
| POST | /auth/change-password | Update password |

### Transactions

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /transactions | Get all transactions |
| POST | /transactions | Create a transaction |
| PUT | /transactions/:id | Update a transaction |
| DELETE | /transactions/:id | Delete a transaction |

## Project Structure

```bash
fintrack/
│
├── backend/                 # Express REST API
│   ├── config/              # Database connection
│   ├── routes/              # Auth & transaction routes
│   ├── models/              # Mongoose models (User, Transaction)
│   ├── middleware/          # JWT authentication middleware
│   └── index.js             # Backend entry point
│
└── frontend/                # React application
    ├── src/
    │   ├── assets/          # Images, icons, illustrations
    │   ├── components/      # Navbar, cards, reusable UI
    │   ├── pages/           # Home, Login, Register, Dashboard, Profile
    │   ├── context/         # AuthContext for global auth state
    │   └── App.js           # App routes and layout
    │
    └── public/              # Static files

```
---

## -> Why This Project Matters

This project demonstrates:

- Practical full-stack development  
- Secure, scalable backend design  
- Consistent UI/UX execution  
- Clean architecture & code readability  
- Cloud deployment on industry-standard platforms  
- API development & documentation  
- Real-world engineering decision-making  

---

##  License

MIT License © 2025 Nashrah Fathima

---

<div align="center">

**FinTrack was built with a focus on real-world development, performance, and clean design.  
A showcase of end-to-end engineering excellence.**

</div>
