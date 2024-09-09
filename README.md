# Todo App (Express + React)

This repository contains a full-stack todo application. The backend is built using **Express** and **Prisma** (located in the `server` folder), while the frontend is built using **Create React App (CRA)** (located in the `client` folder).

## Folder Structure

- **`server/`**: Contains the Express backend, which uses Prisma as the ORM to interact with the database.
- **`client/`**: Contains the frontend, built using Create React App (CRA) with React and TypeScript.

## Prerequisites

- **Node.js** (v20+)
- **PostgreSQL/SQLite** (depending on your Prisma configuration in `server/.env`)
- **Prisma CLI** (optional, but helpful): `npm install -g prisma`

---

## Getting Started

### 1. Backend Setup (Express + Prisma)

Navigate to the `server` folder to set up the backend.

#### Install Dependencies:

```bash
cd server
npm install
```

#### Database Setup:

Make sure you have your database connection set up in the `.env` file in the `server` folder. Prisma will use this to connect to the database.

- **For SQLite** (Example):

  ```
  DATABASE_URL="file:./dev.db"
  ```

#### Run Prisma Migrations:

After setting up your database, you need to apply the Prisma migrations.

```bash
npx prisma migrate dev
```

This command will apply the existing database migrations and create the necessary tables in your database.

#### Generate the Prisma Client:

After running the migrations, you’ll need to generate the Prisma client to use it in your code

```bash
npx prisma generate
```

This command will apply the existing database migrations and create the necessary tables in your database.

#### Start the Backend Server:

```bash
npm start
```

This will start the Express server on `http://localhost:3001`.

### 2. Frontend Setup (React App)

Navigate to the `client` folder to set up the frontend.

#### Install Dependencies:

```bash
cd client
npm install
```

#### Start the Frontend Development Server:

```bash
npm start
```

This will start the CRA development server on `http://localhost:3000`.

---

## Available Scripts

### Backend (in the `server` folder):

- **`npm start`**: Starts the Express server.
- **`npx prisma migrate dev`**: Applies database migrations for Prisma.
- **`npx prisma studio`**: Opens Prisma Studio to visualize and manage your data.

### Frontend (in the `client` folder):

- **`npm start`**: Starts the React development server.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm test`**: Runs the test suite for the frontend.

---

## Notes

- Ensure that both the backend (`server/`) and frontend (`client/`) are running in parallel.
- The backend runs on port `3001` and the frontend on port `3000`.
- Adjust CORS settings in the Express server (`server`) if necessary to allow communication between the frontend and backend.
