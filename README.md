#  Task Flow Management System

This is a full-stack task management application where users can create, update, and manage their daily tasks efficiently. The project is built to practice real-world concepts like authentication, state management, and API handling.

##🌐 Live Demo
- Frontend: https://task-frontend-qyjb.onrender.com
- Backend: https://task-backend-1-rija.onrender.com

## 🚀 Features

### Authentication
- User Registration
- Login & Logout
- Password hashing using bcrypt
- JWT-based authentication

### Authorization
- Role-based access (Admin & User)
- Admin can manage all users and tasks
- Users can only manage their own tasks

### Task Management
- Create task
- View tasks
- Update task
- Delete task
- Task status (Pending, In Progress, Completed)

### Error Handling
- Centralized error middleware
- Proper validation using Joi
- Meaningful API error messages

### Frontend
- Protected routes
- Loader during API calls
- Toast notifications
- Responsive UI

## Tech Stack
- Frontend: React (Vite), Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB

## 📂 Project Structure

- Frontend/
- Backend/

## ⚙️ Setup Instructions

1. Clone the repository  
git clone https://github.com/preet0302/task-flow-management-system.git

2. Install dependencies  

Frontend:
cd frontend  
npm install  

Backend:
cd backend  
npm install  

3. Create a `.env` file in backend and add:

PORT=5000
MONGODB_URL=your_mongodb_connection  
JWT_SECRET_KEY=your_secret_key   
NODE_ENV=development  

4. Start the project  

Backend:
npm start   

Frontend:
npm run dev  

## Deployment
Frontend and Backend are deployed on Render.

## Note
The `.env` file is not included in this repository for security reasons. Please add your own environment variables before running the project.

## Future Improvements
- Search and filter tasks  
- Pagination  
- Better dashboard UI  


---

## 👨‍💻 Author
- Preet Kumar

This project helped me understand how a full-stack application works, including authentication, API integration, and state management using Redux.
