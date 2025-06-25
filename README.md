# Campus Jobs Backend

A Node.js/Express backend for a campus job portal with authentication, job posting, application, and resume upload features.

## Features
- User authentication (student, employer, admin)
- Job posting and approval workflow
- Students can apply to jobs
- Employers can view applicants
- Resume upload (PDF only)

## Setup
1. Clone the repository
2. Run `npm install` to install dependencies
3. Copy `.env.example` in the `backend` directory to `.env` and update the values:
   ```
   MONGO_URI=mongodb://localhost:27017/campusjobs
   JWT_SECRET=your_jwt_secret
   ```
4. Start MongoDB locally
5. Run the server:
   ```
   node backend/server.js
   ```

## Deploying to Render

1. Push this repository to a Git provider like GitHub.
2. Sign in to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your repository and choose the main branch.
4. Set the **Build Command** to `npm install`.
5. Set the **Start Command** to `npm start`.
6. Add the environment variables from your `.env` file (e.g. `MONGO_URI` and `JWT_SECRET`) in the Render dashboard.
7. Deploy the service. Render will install dependencies and start the server.
8. You can also use the provided `render.yaml` for one-click deploy setup.

## API Endpoints
See the code for available endpoints and usage. 
