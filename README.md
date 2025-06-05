
# Smart Task Manager with AI Touch

A full-stack web app for managing tasks efficiently with an AI-powered feature to auto-suggest priority and tags. Built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Tailwind CSS** for styling.

---

## ✨ Features

✅ Add, edit, and delete tasks  
✅ Set due dates, priority levels, and tags  
✅ Responsive, clean UI with Tailwind CSS  
✅ AI-powered priority and tag suggestion for new tasks  
✅ Smooth editing experience with animations (using Framer Motion)  
✅ Frontend and backend validations  
✅ Reusable code structure (services, repository layers, etc.)  
✅ RESTful APIs for task management  
✅ Toast notifications for user feedback  
✅ Animations for task item exit  

---

## 📦 Technologies Used

- **Frontend:** Vite, React, SWR, Axios, Tailwind CSS, Framer Motion  
- **Backend:** Node.js, Express, MongoDB (Mongoose), Hugging Face Inference API  
- **AI Model:** `deepseek-ai/DeepSeek-R1-0528` (Hugging Face Inference)

---

## 🔥 Project Structure

### Frontend (`client/`)
```
client/
├── src/
│   ├── components/         # Reusable components (TaskForm, TaskList, Header, etc.)
│   ├── hooks/              # SWR hooks for fetching and mutating tasks
│   ├── screens/            # App pages
│   ├── services/           # Axios instance and API calls
│   ├── types/              # Typescript common types or interfaces
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main component with state management
│   └── index.jsx           # Entry point
├── public/                 # Static assets
└── vite.config.js          # Vite config
```

### Backend (`server/`)
```
server/
├── src/
│   ├── controllers/        # Route handlers
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routes
│   ├── services/           # AI service and other reusable logic
│   ├── repository/         # Database access logic
│   ├── middlewares/        # Validation and error handling
│   ├── utils/              # Utilities (e.g., graceful DB disconnect)
│   └── app.js              # Main Express app
├── __tests__/              # Jest tests for API routes
├── .env                    # Environment variables
└── package.json            # Dependencies
```

---

## ⚡ AI Feature

I used Hugging Face’s DeepSeek-R1-0528 model to auto-suggest:

- **Priority:** High, Medium, or Low  
- **Tags:** Up to 3 relevant tags based on the task description  


Example response:
```json
{
  "priority": "High",
  "tags": ["Home Maintenance", "Plumbing", "Urgent Repair"]
}
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/smart-task-manager.git
cd smart-task-manager
```

### 2️⃣ Install dependencies
```bash
# For backend
cd server
npm install

# For frontend
cd ../client
npm install
```

### 3️⃣ Set up environment variables
Create `.env` files in both `server` and `client` folders.

#### server/.env
```
MONGO_URI=<your-mongodb-uri>
PORT=5000
HF_TOKEN=<your-hugging-face-token>
```

#### client/.env
```
VITE_API_BASE_URL=http://localhost:5000
```

### 4️⃣ Start the servers

```bash
# Start Client and Backend
npm run dev
```

#### OR

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

---

## 🧪 Run Tests
```bash
cd server
npm test
```

---
