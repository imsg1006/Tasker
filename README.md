🚀 Scalable Web App with Authentication & Dashboard

A full-stack project built using ReactJS, TailwindCSS, FastAPI, and PostgreSQL

📌 Overview

This project is a scalable web application featuring JWT authentication, protected routes, and a CRUD-enabled dashboard. It includes a modern React-based frontend and a lightweight FastAPI backend connected to PostgreSQL.

The goal of this assignment was to demonstrate proficiency in frontend engineering, backend integration, authentication, and scalable architecture.

🛠️ Tech Stack
Frontend

ReactJS

TailwindCSS

Axios

React Router

JWT-based route protection

Backend

Python FastAPI

PostgreSQL

SQLAlchemy ORM

JWT Authentication

Pydantic validation

bcrypt for password hashing

🌟 Features
🔐 Authentication

User Signup & Login (JWT-based)

Password hashing using bcrypt

Protected API routes

Persistent login with token-based auth

Logout flow

📊 Dashboard

Displays authenticated user profile

CRUD operations for a sample entity (e.g., Tasks/Notes/Posts)

Search & Filter capabilities

Responsive UI

🧩 Backend Functionality

REST APIs for auth, profile, and entity CRUD

Validation using Pydantic schemas

Auth middleware for secure endpoints

Full PostgreSQL integration

📁 Project Structure   
Frontend     
frontend/   
│── src/   
│   ├── components/   
│   ├── pages/   
│   ├── hooks/   
│   ├── utils/   
│   ├── services/   
│   └── App.jsx   
│── public/   
└── package.json   

Backend  
backend/   
│── app/   
│   ├── auth/    
│   │   ├── routes.py   
│   │   ├── schemas.py   
│   │   ├── utils.py   
│   ├── crud/  
│   ├── database.py  
│   ├── main.py  
│   ├── models.py  
│   └── schemas.py  
└── requirements.txt  

🚀 Getting Started  
1. Clone the Repository   
git clone <YOUR_REPO_URL>   
cd <project-folder>       

⚙️ Frontend Setup  
cd frontend    
npm install  
npm run dev

⚙️ Backend Setup   
Install dependencies:   
cd backend   
pip install -r requirements.txt

Setup environment variables:

Create a .env file:

DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<dbname>
JWT_SECRET=<your_secret_key>
JWT_ALGORITHM=HS256

Run the backend:
uvicorn app.main:app --reload

🧪 API Documentation

FastAPI automatically generates documentation:

Swagger UI → /docs

ReDoc → /redoc

A Postman Collection is included in the repo:
postman_collection.json

🗄️ Sample Entity

The project includes full CRUD for an entity such as:

Tasks

Notes

Posts

Endpoints include:

POST /entity/

GET /entity/

GET /entity/{id}

PUT /entity/{id}

DELETE /entity/{id}

🔒 Security Practices Implemented

Password hashing (bcrypt)

JWT authentication & refresh handling

Protected routes on both frontend & backend

Form validation (client + server side)

Error handling for all protected endpoints

📈 Scalability Notes
Frontend Scaling:

Modular component structure

Dedicated service layer for API requests

Separately managed auth context

Can be migrated to Next.js for SSR if needed

Backend Scaling:

Layered architecture (routes → schemas → DB → services)

Reusable Pydantic schemas

Easily extendable CRUD structure

Can be containerized using Docker

Suitable for deployment on AWS/GCP/Vercel/Render

✅ Conclusion

This project showcases a complete, scalable full-stack application built with a modern tech stack—ReactJS, TailwindCSS, FastAPI, and PostgreSQL. It highlights strong frontend engineering, clean backend architecture, secure authentication workflows, and seamless integration between both layers.

Through this assignment, I demonstrated my ability to design responsive UIs, implement real-world authentication using JWT, structure backend APIs for growth, and manage a database-driven workflow with proper validation and error handling.

The project is fully modular, extendable, and ready for production-level enhancements such as containerization, CI/CD, and cloud deployment.
