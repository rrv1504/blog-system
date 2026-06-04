import {
  addComment,
  createPost,
  deletePost,
  getPost,
  listPosts,
  toggleLike,
  updatePost
} from "../services/post.service.js";

export async function index(_req, res) {
  res.json(await listPosts());
}

export async function show(req, res) {
  res.json(await getPost(req.params.id));
}

export async function create(req, res) {
  const post = await createPost(req.user, req.body);
  res.status(201).json(post);
}

export async function update(req, res) {
  res.json(await updatePost(req.user, req.params.id, req.body));
}

export async function remove(req, res) {
  await deletePost(req.user, req.params.id);
  res.status(204).send();
}

export async function comment(req, res) {
  const post = await addComment(req.user, req.params.id, req.body.text);
  res.status(201).json(post);
}

export async function like(req, res) {
  res.json(await toggleLike(req.user, req.params.id));
}
