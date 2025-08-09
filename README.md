Backend Setup

cd server
npm install
Create a .env file in /backend using .env.example as a reference.

Run backend:
npm start


Frontend Setup


cd client
npm install
Create a .env file in /frontend using .env.example as a reference.

Run frontend:

npm run dev
 API Routes
 baseUrl=http://localhost:5004

Method	Endpoint	Description
POST	http://localhost:5004/users/register	Register new user
POST	http://localhost:5004/users/login	Login user

Sessions
Method	Endpoint	Description
GET	http://localhost:5004/session/sessions	Public sessions
GET	http://localhost:5004/session/my-sessions	User's own sessions
POST	http://localhost:5004/session/my-sessions/save-draft	Save/update draft
POST	http://localhost:5004/session/my-sessions/publish	Publish a session
GET	http://localhost:5004/session/my-sessions/:id	User's own sessions single one

🔑 Environment Variables
See .env.example for required environment variables.

Backend example:


PORT=5004
MONGO_URI=mongodb+srv://your-mongo-uri
JWT_SECRET=your-secret
CLIENT_URL=http://localhost:5173

Frontend example:
VITE_API_BASE_URL=http://localhost:5000

Live Link
frontend
https://wellness-9d4q.onrender.com
backend
https://wellness-backend-abcx.onrender.com
Video Link

Git Link 
https://github.com/saiswarya4321/wellness.git