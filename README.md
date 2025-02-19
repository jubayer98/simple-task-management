# Task Management Application

## Description
A simple and efficient Task Management Application that allows users to manage their tasks by categorizing them into **To-Do, In Progress, and Done** sections. Users can add, edit, and delete tasks, with all changes saved instantly to a MongoDB database. Authentication is handled via Firebase (Google Sign-in). The app is fully responsive and works seamlessly across desktop and mobile devices.

## Live Demo
[Live Application Link](#) *(Update with actual link once deployed)*

## Features
- **User Authentication** (Google Sign-In via Firebase)
- **Task Management System**:
  - Add, edit, and delete tasks
  - Tasks are categorized as **To-Do, In Progress, Done**
- **Instant Synchronization**: Real-time updates using WebSockets/MongoDB Change Streams
- **Fully Responsive UI**
- **Backend API**: CRUD operations with Express.js & MongoDB
- **Optimized UI/UX** with a clean and minimalistic design
- **Dark Mode Toggle** *(Bonus feature)*
- **Task Due Dates with Color Indicators** *(Bonus feature)*
- **Activity Log for tracking changes** *(Bonus feature)*

## Technologies Used
### Frontend:
- **Vite.js + React** for fast and efficient UI
- **Firebase Authentication** for secure login
- **Styled Components / Tailwind CSS** for styling
- **Axios** for API communication

### Backend:
- **Node.js & Express.js** for API development
- **MongoDB** (with Mongoose ORM) for database storage
- **WebSockets / Change Streams** for real-time updates
- **JWT Authentication** for API security (if needed)

## Installation & Setup
### Prerequisites:
- Node.js & npm installed
- MongoDB running locally or on a cloud service (e.g., MongoDB Atlas)
- Firebase project set up for authentication

### Steps to Run the Application:
#### 1. Clone the Repository:
```sh
git clone https://github.com/your-repo/task-management-app.git
cd task-management-app
```

#### 2. Install Dependencies:
```sh
npm install
```

#### 3. Set Up Environment Variables:
Create a `.env` file in the root directory and configure it with:
```env
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
FIREBASE_APP_ID=your_firebase_app_id
```

#### 4. Start Backend Server:
```sh
cd server
npm install
npm start
```

#### 5. Start Frontend:
```sh
cd client
npm install
npm run dev
```

#### 6. Open the App:
Navigate to `http://localhost:5173/` in your browser.

## API Endpoints
### User Authentication:
- `POST /auth/login` – Authenticates user via Firebase
- `POST /auth/logout` – Logs out user

### Task Management:
- `POST /tasks` – Add a new task
- `GET /tasks` – Retrieve all tasks for the logged-in user
- `PUT /tasks/:id` – Update task details (title, description, category)
- `DELETE /tasks/:id` – Delete a task

## Future Improvements
- Implement notifications for task deadlines
- Allow users to set task priorities
- Offline support with local caching

## License
This project is open-source and available under the MIT License.

---

Enjoy using the Task Management Application! 🚀

