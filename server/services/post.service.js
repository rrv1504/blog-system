import mongoose from "mongoose";
import { Post } from "../models/Post.js";
import { HttpError } from "../utils/httpError.js";
import { publicPost } from "../utils/serializers.js";
import { requireText } from "../utils/validation.js";

function isSameId(left, right) {
  return String(left) === String(right);
}

async function findPost(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new HttpError(404, "Post not found.");
  }

  const post = await Post.findById(id).populate("author", "name email avatarUrl bio");

  if (!post) {
    throw new HttpError(404, "Post not found.");
  }

  return post;
}

function assertOwner(post, userId, action) {
  if (!isSameId(post.author?._id || post.author, userId)) {
    throw new HttpError(403, `Only the owner can ${action} this post.`);
  }
}

function validatePostInput({ title, content }) {
  const titleError = requireText(title, "Title", 3);
  const contentError = requireText(content, "Content", 20);

  if (titleError || contentError) {
    throw new HttpError(400, titleError || contentError);
  }
}

function normalizeImageUrl(imageUrl) {
  return String(imageUrl || "").trim();
}

export async function listPosts() {
  const posts = await Post.find().populate("author", "name email avatarUrl bio").sort({ createdAt: -1 });
  return posts.map((post) => publicPost(post));
}

export async function getPost(id) {
  return publicPost(await findPost(id));
}

export async function createPost(user, input) {
  validatePostInput(input);

  const post = await Post.create({
    title: input.title.trim(),
    content: input.content.trim(),
    author: user._id,
    imageUrl: normalizeImageUrl(input.imageUrl)
  });

  await post.populate("author", "name email avatarUrl bio");

  return publicPost(post);
}

export async function updatePost(user, id, input) {
  const post = await findPost(id);
  assertOwner(post, user.id, "edit");
  validatePostInput(input);

  post.title = input.title.trim();
  post.content = input.content.trim();
  post.imageUrl = normalizeImageUrl(input.imageUrl);
  await post.save();
  await post.populate("author", "name email avatarUrl bio");

  return publicPost(post);
}

export async function deletePost(user, id) {
  const post = await findPost(id);
  assertOwner(post, user.id, "delete");

  await post.deleteOne();
}

export async function addComment(user, postId, text) {
  const post = await findPost(postId);
  const textError = requireText(text, "Comment", 2);

  if (textError) {
    throw new HttpError(400, textError);
  }

  post.comments.push({
    text: text.trim(),
    author: user._id,
    authorName: user.name,
    authorAvatarUrl: user.avatarUrl || ""
  });

  await post.save();
  await post.populate("author", "name email avatarUrl bio");
  return publicPost(post);
}

export async function toggleLike(user, postId) {
  const post = await findPost(postId);
  const liked = post.likedBy.some((userId) => isSameId(userId, user.id));

  if (liked) {
    post.likedBy = post.likedBy.filter((userId) => !isSameId(userId, user.id));
  } else {
    post.likedBy.push(user._id);
  }

  await post.save();
  await post.populate("author", "name email avatarUrl bio");
  return publicPost(post);
}
