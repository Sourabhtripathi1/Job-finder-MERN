# 💼 Job Portal MERN Stack

A comprehensive Job Portal application built using the MERN stack (MongoDB, Express.js, React, Node.js). This platform provides two distinct user experiences: one for Job Seekers to find and apply for jobs, and another for Employers to manage their company profiles and job postings.

## 🚀 Features

### For Job Seekers
- **Authentication:** Secure user registration, login, and profile management.
- **Job Browsing:** View available job listings, filter by categories and cities, and view detailed job descriptions.
- **Application Tracking:** Apply for jobs directly through the platform and view a history of all submitted applications.
- **Profile Management:** Update personal details and upload resumes.

### For Employers / Admins
- **Employer Dashboard:** Dedicated dashboard to oversee operations.
- **Company Management:** Create and update company profiles (including uploading logos).
- **Job Management:** Add new job postings, edit existing ones, and manage their statuses.
- **Application Review:** View and track all applications submitted by candidates for the employer's job postings.

## 🛠️ Technologies Used

### Frontend (Client)
- **Framework:** [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux`
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Styling:** SCSS/Sass, `react-toastify`, `sweetalert2`
- **HTTP Client:** [Axios](https://axios-http.com/)

### Backend (Server)
- **Environment:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (`jsonwebtoken`), `bcryptjs`, and `cookie-parser`
- **File Uploads:** `multer` and [Cloudinary](https://cloudinary.com/) (for image/resume storage)

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local instance or MongoDB Atlas URI)
- A [Cloudinary](https://cloudinary.com/) account for managing media uploads

---

## 🔑 Environment Variables

This project requires environment variables to run. Example `.env` files are provided in both the `frontend` and `backend` directories. 

### Backend (`/backend/.env`)
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5001
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### Frontend (`/frontend/.env`)
Create a `.env` file in the `frontend` directory and add the following:
```env
VITE_APP_BACKEND_URI="http://localhost:5001/api/"
VITE_APP_PUBLIC_URL="http://localhost:3000/"
```

---

## 💻 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sourabhtripathi1/Job-finder-MERN.git
   cd Job-finder-MERN
   ```

2. **Install all dependencies** (Root, Frontend, and Backend)
   The project is configured to let you install dependencies easily from the root if you use the provided setup scripts, or you can run:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```

3. **Set up Environment Variables**
   Make sure you have created the `.env` files in both the `/backend` and `/frontend` directories as shown in the section above (you can copy the `.env.example` files).

4. **Run the Development Server**
   This project uses `concurrently` to run both the frontend and backend simultaneously from the root directory.
   ```bash
   npm run dev
   ```
   - The **Backend API** will run on `http://localhost:5001` (or whichever port you specified in `.env`)
   - The **Frontend** will be accessible at `http://localhost:3000` (or the default Vite port `5173`)

---

## 📁 Project Structure

```text
Job-finder-MERN/
├── backend/                  # Express.js Server
│   ├── controllers/          # Business logic for routes
│   ├── middlewares/          # Custom middlewares (Auth, Uploads)
│   ├── models/               # Mongoose schemas (User, Job, Company, etc.)
│   ├── routes/               # API endpoints setup
│   ├── utils/                # Helper functions
│   └── api.js                # Server entry point
├── frontend/                 # React Application (Vite)
│   ├── src/
│   │   ├── assets/           # Static assets (images, fonts)
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Redux state slices
│   │   ├── pages/            # View components (Job-Seeker, Employer, Common)
│   │   ├── App.jsx           # Main App component and Routing
│   │   └── main.jsx          # React DOM render entry
├── package.json              # Root package config (concurrently scripts)
└── README.md                 # Project Documentation
```
