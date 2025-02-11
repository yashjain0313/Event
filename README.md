# TEDx Event Registration System

A full-stack application for managing TEDx event registrations with admin dashboard and data analysis capabilities.

## Features

**User Facing**
- Event information page
- Online registration form with validation
- Success confirmation page

**Admin Features**
- Secure JWT-based login system
- Dashboard with all registrations
- CRUD operations (Create, Read, Update, Delete)
- PDF export functionality
- Advanced search across all fields
- Data analysis dashboard with interactive charts
- State-wise registration analysis
- Age group distribution visualization
- Top pincode areas statistics
- Real-time registration statistics

## Technologies Used

**Frontend**
- React.js (v19)
- Material-UI (MUI) for UI components
- Recharts for data visualization
- JSPDF for PDF generation
- React Router (v6) for navigation

**Backend**
- Node.js (Express.js)
- MongoDB with Mongoose ODM
- JWT Authentication
- CORS for secure cross-origin requests

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
git clone https://github.com/your-username/tedx-registration-system.git
cd tedx-registration-system

2. **Install dependencies**
bash
cd backend
npm install


3. **Install frontend dependencies**
bash
cd ../frontend
npm install


4. **Environment Setup**
   - Create `.env` file in backend folder:
   env
JWT_SECRET=your_jwt_secret_key
MONGO_URI=mongodb+srv://your-mongodb-connection-string
PORT=5000



## Project Structure

tedx-registration-system/
├── backend/
  ├── models/ # Database models (Registration, Admin)
  ├── routes/ # API routes (registrations, admin)
  ├── middleware/ # Authentication middleware
  └── server.js # Backend entry point

├── frontend/
    ├── public/ # Static assets
    ├── src/
    │ ├── pages/ # React components (Home, Registration, Admin)
    │ ├── assets/ # Fonts & images
    │ └── App.jsx # Main application router
    └── package.json

└── README.md




## Running the Application

1. **Start Backend Server**
bash
cd backend
npm start


2. **Start Frontend Development Server**

bash
cd frontend
npm run dev


3. **Access the Application**
- User Interface: `http://localhost:5173`
- Admin Dashboard: `http://localhost:5173/admin/login`
  - Default Admin Credentials:
  - Username: `admin`
  - Password: `admin`

## Key Features Implementation

### Admin Dashboard
- JWT authentication with 30-minute token expiration
- Real-time data updates using Axios
- PDF report generation with jspdf-autotable
- Advanced search functionality across all fields
- Responsive table with sorting and pagination

### Data Analysis
- Interactive charts using Recharts
- State-wise registration distribution (Bar Chart)
- Age group analysis (Pie Chart)
- Top 5 pincode areas (Bar Chart)
- Real-time statistics:
  - Total registrations
  - Average age
  - Unique states
  - Unique pincodes

## Security Features
- Protected admin routes with JWT
- Encrypted passwords using bcryptjs
- Input validation on both client and server
- Error handling middleware
- CORS configuration for secure API access

## API Endpoints

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | /api/registrations      | Create new registration         |
| GET    | /api/admin/registrations| Get all registrations (Admin)   |
| PUT    | /api/admin/registrations/:id | Update registration      |
| DELETE | /api/admin/registrations/:id | Delete registration      |
| POST   | /api/admin/login        | Admin login                     |


## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
