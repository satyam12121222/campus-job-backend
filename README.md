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
3. Create a `.env` file in the `backend` directory with:
   ```
   MONGO_URI=mongodb://localhost:27017/campusjobs
   JWT_SECRET=your_jwt_secret
   ```
4. Start MongoDB locally
5. Run the server:
   ```
   node backend/server.js
   ```

## API Endpoints
See the code for available endpoints and usage. 