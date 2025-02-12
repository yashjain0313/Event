## TEDx Event Registration System

A full-stack application for managing TEDx event registrations with admin dashboard and data analysis capabilities.

## Features

**User Features**

- Event registration with form validation
- Event information and details
- Success confirmation page
- Mobile responsive design

**Admin Features**

- Secure admin login system
- Dashboard with registration management
- CRUD operations for registrations
- PDF export functionality
- Advanced search and filtering
- Data visualization dashboard
- Analytics and statistics

## Tech Stack

**Frontend**

- React (v19.0.0)
- Material-UI (v6.4.3)
- React Router DOM (v6.29.0)
- Axios (v1.7.9)
- Recharts (v2.15.1)
- JSPDF (v2.5.2)
- Vite (v6.1.0)

**Backend**

- Node.js
- Express.js (v4.21.2)
- MongoDB with Mongoose (v8.10.0)
- JWT Authentication (v9.0.2)
- bcryptjs (v2.4.3)
- CORS (v2.8.5)

## Project Structure
```
Tedx-registration/
├── backend/
│ ├── models/ # Database schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth middleware
│ ├── controllers/ # Business logic
│ ├── config/ # Configuration files
│ └── server.js # Entry point
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API services
│ │ ├── utils/ # Helper functions
│ │ ├── assets/ # Static assets
│ │ └── App.jsx # Main component
│ └── index.html
│
└── README.md
```

## Installation Guide

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Setup Commands

1. **Clone the repository**

```bash
git clone <repository-url>
cd frontend
```

2. **Backend Setup**

```bash
cd backend
npm install
```

Required backend dependencies:

```bash
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
```

3. **Frontend Setup**

```bash
cd frontend
npm install
```

Required frontend dependencies:

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom axios recharts
npm install jspdf jspdf-autotable
```

4. **Environment Variables**
   Create `.env` file in backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. **Start Backend Server**

```bash
cd backend
npm start
```

Server runs on http://localhost:5000

2. **Start Frontend Development Server**

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## API Endpoints

| Method | Endpoint                     | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | /api/register                | Create registration   |
| GET    | /api/admin/registrations     | Get all registrations |
| PUT    | /api/admin/registrations/:id | Update registration   |
| DELETE | /api/admin/registrations/:id | Delete registration   |
| POST   | /api/admin/login             | Admin authentication  |

## Admin Access

- URL: http://localhost:5173/admin
- Default credentials:
  - Username: admin
  - Password: admin123

## Build Commands

**Frontend Production Build**

```bash
cd frontend
npm run build
```

**Backend Production Start**

```bash
cd backend
npm start
```

## Additional Tools

**Install PM2 for Production**

```bash
npm install -g pm2
pm2 start backend/server.js
```

## Development Commands

**Run ESLint**

```bash
cd frontend
npm run lint
```

**Preview Production Build**

```bash
cd frontend
npm run preview
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 👥 Authors

- Yash Jain

