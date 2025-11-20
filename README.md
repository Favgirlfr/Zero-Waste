# 🌍 Zero Waste Exchange

**Zero Waste Exchange** is a fullstack MERN web platform that connects surplus food with communities in need. Built to reduce food waste, fight hunger, and promote responsible consumption, it empowers donors to share excess food and recipients to access it with dignity — all in real time.

---

## 🚀 Live Demo

- **Frontend:** https://zero-waste-blond.vercel.app/
- **Backend:** https://zerowaste-se46.onrender.com

---

## 🧰 Tech Stack

- **Frontend:** React, Tailwind CSS, Toastify, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, Nodemailer, Socket.IO
- **Authentication:** JWT, Email Verification
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## 🧑‍💻 Features

### ✅ Recipient Flow
- Signup with role-based access
- Request food items
- View request status
- Receive real-time notifications

### ✅ Donor Flow
- Post surplus food donations
- View and manage donation history
- Receive pickup confirmations

### ✅ Admin Flow (optional)
- Verify donations and requests
- Track platform impact

### ✅ Shared Features
- Email verification
- Real-time Socket.IO alerts
- Responsive design for mobile and desktop
- Mission-driven homepage and About page
- Impact stats and testimonials

---

## 📁 Folder Structure
Zero-Waste/
├── frontend/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── hooks/
│       └── utils/
│
├── backend/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
└── README.md


---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
MONGO_URI=your_mongodb_atlas_uri JWT_SECRET=your_jwt_secret EMAIL_USER=your_email_address EMAIL_PASS=your_email_password


### Frontend (`frontend/.env`)
REACT_APP_API_BASE_URL=https://your-backend.onrender.com


---

## 🛠 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/Favgirlfr/Zero-Waste.git
cd Zero-Waste

## Install dependencies
cd backend && npm install
cd ../frontend && npm install

## Run locally
# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
