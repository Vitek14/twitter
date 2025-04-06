# Twitter Clone Project

<div align="center">
  
[Overview](#overview) | 
[Installation](#installation) | 
[Usage](#usage) | 
[Legal](#legal-disclaimer)

</div>

## Overview 🗺️

This project is a learning initiative aimed at replicating the core features of Twitter (X). It consists of a frontend built with **Vite + React** and a backend powered by **Node.js (Express)** with **Sequelize** as the ORM. The backend is hosted in a separate repository, which must be set up for full functionality.

Key features:
- Modern frontend stack with Vite and React.
- Backend API using Express and PostgreSQL.
- Database migrations and seeders via Sequelize.

---

## Installation 📥

### Frontend Setup

1. Clone the **develop** branch of the frontend repository:
   ```bash
   git clone -b develop https://github.com/Vitek14/twitter.git
   ```
2. Navigate to the project directory:
   ```bash
   cd twitter
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Backend Setup

1. Clone the **master** branch of the backend repository:
   ```bash
   git clone -b master https://github.com/Vitek14/x-backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd x-backend
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```

### Database Configuration

1. Ensure **PostgreSQL** and **pgAdmin4** are installed.
2. Create a `.env` file in the backend root directory with the following content:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=1234
   DB_NAME=twitter_development
   DB_PORT=5432
   PRIVATE_KEY=testestest1231254125
   ```
   Adjust values to match your PostgreSQL setup.

3. Run database migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```

4. (Optional) Seed initial data:
   ```bash
   npx sequelize-cli db:seed:all
   ```
   **Note for non-Windows users**: If seeding fails due to date formatting, manually adjust the seed files in `seeders/` or skip this step.

---

## Usage 🔌

### Frontend
Start the Vite development server:
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`.

### Backend
Start the Express server:
```bash
npm start
```
The backend API will run on `http://localhost:3000`.

---

## Notes
- Tested with:
  - Node.js: **v22.11.0**
  - npm: **10.9.0**
- Ensure both frontend and backend servers are running simultaneously for full functionality.
- The backend requires PostgreSQL to be actively running with the configured database.

## Legal Disclaimer

**Important Notice**  
This project is strictly **educational** in nature and was created for learning purposes only. It is not:

- Associated with or endorsed by X Corp. (formerly Twitter) or any of its affiliates
- Intended to replicate or compete with x.com
- Designed for commercial use
- Meant to harm, defame, or infringe upon the intellectual property of any company

All references to Twitter/X functionality and branding are used:
- Solely for educational demonstration
- Under fair use principles
- Without claim to original ownership

The codebase is intentionally simplified and lacks many critical features required for a production environment. This implementation does not represent security best practices for authentication or database management.

**Trademarks**  
Any mentioned trademarks (Twitter, X, etc.) belong to their respective owners. The "Twitter Clone" naming is used purely for descriptive clarity, not as an official designation.

**Non-Commercial**  
This project is open-source and freely available for educational use only.
