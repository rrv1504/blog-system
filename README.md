# Blog Platform

A full-stack blogging platform where users can register, log in, publish posts, edit or delete their own posts, comment on posts, and like or unlike posts.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete blog posts
- Owner-only edit and delete authorization
- Comment system
- Like and unlike system
- Responsive React dashboard
- Modular backend structure with routes, controllers, services, middleware, and utilities
- MongoDB Atlas persistence with Mongoose models
- Seed script with at least 20 sample blog posts

## Tech Stack

- React
- Vite
- Express
- JSON Web Token
- bcryptjs
- MongoDB Atlas
- Mongoose
- lucide-react

## Project Structure

```text
Blog Platform/
├── server/
│   ├── config/
│   │   └── env.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── post.controller.js
│   ├── data/
│   │   └── fileStore.js
│   ├── middleware/
│   │   ├── asyncHandler.js
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── index.js
│   │   └── post.routes.js
│   ├── services/
│   │   ├── auth.service.js
│   │   └── post.service.js
│   ├── utils/
│   │   ├── httpError.js
│   │   ├── serializers.js
│   │   └── validation.js
│   ├── app.js
│   └── index.js
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── config.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the frontend and backend together:

```bash
npm run dev
```

Open the app:

```text
http://127.0.0.1:5174
```

If port `5174` is already busy, Vite will automatically show another local URL in the terminal, such as `http://127.0.0.1:5175`.

Backend API:

```text
http://127.0.0.1:5050/api
```

## Available Scripts

```bash
npm run dev
```

Runs the React frontend and Express backend together.

```bash
npm run client
```

Runs only the Vite frontend.

```bash
npm run server
```

Runs only the Express backend.

```bash
npm run seed
```

Adds sample MongoDB Atlas data until the database has at least 20 posts.

```bash
npm run build
```

Creates a production frontend build.

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/auth/me` | Get current logged-in user |

### Posts

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get a single post |
| POST | `/api/posts` | Create a post |
| PUT | `/api/posts/:id` | Update own post |
| DELETE | `/api/posts/:id` | Delete own post |
| POST | `/api/posts/:id/comments` | Add comment to a post |
| POST | `/api/posts/:id/like` | Like or unlike a post |

## Environment Variables

Create a `.env` file in the project root before starting the backend. You can copy `.env.example` and replace the MongoDB URI with your Atlas connection string:

```text
PORT=5050
CLIENT_ORIGIN=http://127.0.0.1:5174
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/blog-platform?retryWrites=true&w=majority
```

## Data Storage

The backend stores users, posts, comments, and likes in MongoDB Atlas. The API will not start until `MONGODB_URI` is set.

To add sample data:

```bash
npm run seed
```

The seed command creates demo users and adds enough posts to reach at least 20 posts. It skips adding duplicates when the database already has 20 or more posts.

To reset demo users and posts before seeding:

```bash
npm run seed -- --reset
```

Demo login after seeding:

```text
Password123
```

## Authorization Rules

- Only logged-in users can create posts, comment, or like posts.
- Only the post owner can edit or delete that post.
- Anyone can read published posts.

## Build Check

To verify the frontend build:

```bash
npm run build
```
