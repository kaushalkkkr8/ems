
🛠 Engineering Resource Management System (ERMS)
A full-stack Engineering Resource Management System for managing engineers, projects, and assignments, with capacity tracking and visual analytics.

🚀 Tech Stack
Frontend (React + TypeScript)
⚛️ React + TypeScript

🎨 ShadCN UI (based on Tailwind CSS)

📋 React Hook Form – form handling

📊 Chart.js or Recharts – capacity visualizations

📦 React Context – global state management

🔐 JWT Auth (via cookies or headers)

Backend (Node.js + Express)
🛢 MongoDB (Mongoose for schemas)

🔐 JWT for secure authentication

🧩 RESTful APIs for CRUD operations

📐 Business Logic – engineer capacity, project load, etc.

🔧 Setup Instructions
1. Clone the Repository
**git clone https://github.com/your-username/erms.git
cd erms**

 Backend Setup (/backend)
📦 Install Dependencies
cd backend
npm install

Environment Variables
Create a .env file:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

To run Backend
npm start

Frontend Setup

📦 Install Dependencies
**cd frontend
npm install**

▶️ Run the React App

npm run dev


✨ Features
👩‍💼 Manager Dashboard
Create Projects and Assignments (React Hook Form)

View Engineer Capacity 

View Project Assignment Table

🧱 Authentication
Login with JWT (Token stored in localStorage )

Protected Routes for Authenticated Users

📊 Visuals
Charts: Engineer capacity visualization (Recharts)

Tables: View all project assignments


🛡️ Security
JWT stored securely 

CORS enabled with credentials

Form validation (both client and server)






🤖 Use of AI Tools
Throughout the development of this project, I actively leveraged AI tools (specifically ChatGPT) to speed up learning and implementation, especially on the frontend side.

🔧 Tools & How I Used Them
ChatGPT (GPT-4o):
Used as a coding assistant for real-time suggestions, error resolution, and learning new libraries. It acted like a pair programming partner during development.

⚡ How AI Accelerated Development
Context API Over Redux Toolkit:
Previously, I was using Redux Toolkit, but with the help of AI, I learned and implemented React’s Context API architecture effectively. It helped me reduce boilerplate and simplify state management.

ShadCN UI + Tailwind CSS:
I was initially comfortable with Bootstrap and Tailwind. AI guided me step-by-step through learning and integrating ShadCN UI with Tailwind CSS, allowing me to build clean, modern, and consistent UI components much faster.

Project Structuring Tips:
AI helped me adopt better folder structures, separating concerns like index.tsx, type.ts, and context layers for scalability.

❌ Challenges & Resolutions
AI-Generated Code Bugs:
Sometimes the AI-generated code didn’t align perfectly with my setup (e.g., misnamed props or incorrect imports). I resolved these by deeply understanding the output, comparing it with official documentation, and debugging manually.

Generic Suggestions:
AI occasionally gave generic or outdated advice. I cross-checked solutions with the latest documentation or GitHub discussions to validate relevance.

✅ My Approach to AI Suggestions
Validate first: I never blindly copy-pasted. I reviewed every suggestion and ensured it matched my use case and tech stack.

Test locally: All AI-generated code was tested thoroughly in the local environment before being committed.

Learn, not just use: I always asked why something works, not just how, so I could build my understanding while speeding up development.
