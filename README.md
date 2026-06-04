# Blog Platform

A full-stack MERN blog platform where users can register, log in, publish posts, edit their profile, like posts, comment on articles, and manage their own writing.

Live frontend:

```text
https://rrv1504.github.io/blog-system/
```

Live backend API:

```text
https://blog-system-v4j5.onrender.com/api
```

## Features

- User registration and login
- JWT-based authentication
- Responsive blog grid on the homepage
- Full article page with likes and comments
- Like posts from the homepage grid
- Create, edit, and delete your own posts
- Profile page with editable user details
- Profile page showing posts written by the logged-in user
- Notifications for recent likes and comments on your posts
- MongoDB Atlas persistence with Mongoose models
- Seed script with sample users and at least 20 posts
- GitHub Pages frontend deployment
- Render backend deployment

## Tech Stack

- React
- Vite
- Express
- MongoDB Atlas
- Mongoose
- JSON Web Token
- bcryptjs
- lucide-react

## Project Structure

```text
Blog Platform/
|-- .github/
|   `-- workflows/
|       `-- deploy-frontend.yml
|-- server/
|   |-- config/
|   |   |-- db.js
|   |   `-- env.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   `-- post.controller.js
|   |-- middleware/
|   |   |-- asyncHandler.js
|   |   |-- auth.middleware.js
|   |   `-- error.middleware.js
|   |-- models/
|   |   |-- Post.js
|   |   `-- User.js
|   |-- routes/
|   |   |-- auth.routes.js
|   |   |-- index.js
|   |   `-- post.routes.js
|   |-- seed/
|   |   |-- sampleData.js
|   |   `-- seedData.js
|   |-- services/
|   |   |-- auth.service.js
|   |   `-- post.service.js
|   |-- utils/
|   |   |-- httpError.js
|   |   |-- serializers.js
|   |   `-- validation.js
|   |-- app.js
|   `-- index.js
|-- src/
|   |-- components/
|   |-- services/
|   |-- utils/
|   |-- App.jsx
|   |-- config.js
|   |-- main.jsx
|   `-- styles.css
|-- .env.example
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```text
PORT=5050
CLIENT_ORIGIN=http://127.0.0.1:5174
JWT_SECRET=your-secret-key
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/blog-platform?retryWrites=true&w=majority
```

Start the frontend and backend together:

```bash
npm run dev
```

Open the app:

```text
http://127.0.0.1:5174
```

If port `5174` is busy, Vite will print another local URL such as `http://127.0.0.1:5175`.

Local backend API:

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

```bash
npm run preview
```

Serves the production build locally.

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |
| GET | `/api/auth/me` | Get current logged-in user |
| GET | `/api/auth/profile` | Get profile stats and notifications |
| PUT | `/api/auth/me` | Update profile details |

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

Protected endpoints require an authorization header:

```text
Authorization: Bearer <token>
```

## Deployment

### Frontend: GitHub Pages

The frontend is deployed by `.github/workflows/deploy-frontend.yml`.

The workflow builds the Vite app with:

```text
VITE_API_URL=https://blog-system-v4j5.onrender.com/api
```

After pushing to `main`, GitHub Actions builds `dist/` and publishes it to GitHub Pages.

### Backend: Render

Render web service settings:

```text
Runtime: Node
Build Command: npm install
Start Command: npm run server
```

Render environment variables:

```text
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
CLIENT_ORIGIN=https://rrv1504.github.io
```

Do not commit `.env` to GitHub. Add production secrets only in Render.

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

Demo user password after seeding:

```text
Password123
```

## Authorization Rules

- Anyone can read published posts.
- Only logged-in users can create posts, comment, or like posts.
- Only the post owner can edit or delete that post.
- Users can edit only their own profile details.

## Build Check

Verify the frontend build:

```bash
npm run build
```
