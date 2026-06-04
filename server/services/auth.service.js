import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Post } from "../models/Post.js";
import { HttpError } from "../utils/httpError.js";
import { publicUser } from "../utils/serializers.js";
import { requireText } from "../utils/validation.js";

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, env.jwtSecret, { expiresIn: "7d" });
}

export async function registerUser({ name, email, password, avatarUrl = "", bio = "" }) {
  const nameError = requireText(name, "Name", 2);
  const emailError = requireText(email, "Email", 5);
  const passwordError = requireText(password, "Password", 6);

  if (nameError || emailError || passwordError) {
    throw new HttpError(400, nameError || emailError || passwordError);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new HttpError(409, "Email is already registered.");
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
    avatarUrl: String(avatarUrl).trim(),
    bio: String(bio).trim()
  });

  return { user: publicUser(user), token: createToken(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select("+passwordHash");

  if (!user || !(await bcrypt.compare(String(password), user.passwordHash))) {
    throw new HttpError(401, "Invalid email or password.");
  }

  return { user: publicUser(user), token: createToken(user) };
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret);
}

export async function updateProfile(user, { name, avatarUrl = "", bio = "" }) {
  const nameError = requireText(name, "Name", 2);

  if (nameError) {
    throw new HttpError(400, nameError);
  }

  user.name = name.trim();
  user.avatarUrl = String(avatarUrl).trim();
  user.bio = String(bio).trim();
  await user.save();

  return publicUser(user);
}

export async function getUserStats(userId) {
  const posts = await Post.find({ author: userId });
  const allPosts = await Post.find();
  const userIdText = String(userId);

  const likesReceived = posts.reduce((total, post) => total + post.likedBy.length, 0);
  const commentsReceived = posts.reduce((total, post) => total + post.comments.length, 0);
  const likesGiven = allPosts.reduce(
    (total, post) => total + (post.likedBy.some((likedUserId) => String(likedUserId) === userIdText) ? 1 : 0),
    0
  );

  const notifications = posts
    .flatMap((post) => [
      ...post.likedBy
        .filter((likedUserId) => String(likedUserId) !== userIdText)
        .map((likedUserId) => ({
          id: `${post.id}-like-${likedUserId}`,
          type: "like",
          text: `Someone liked "${post.title}".`,
          postId: post.id,
          createdAt: post.updatedAt
        })),
      ...post.comments
        .filter((comment) => String(comment.author) !== userIdText)
        .map((comment) => ({
          id: comment.id,
          type: "comment",
          text: `${comment.authorName} commented on "${post.title}".`,
          postId: post.id,
          createdAt: comment.createdAt
        }))
    ])
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 12);

  return {
    posts: posts.length,
    likesReceived,
    commentsReceived,
    likesGiven,
    notifications
  };
}
