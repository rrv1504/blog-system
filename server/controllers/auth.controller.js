import { getUserStats, loginUser, registerUser, updateProfile } from "../services/auth.service.js";
import { publicUser } from "../utils/serializers.js";

export async function register(req, res) {
  const session = await registerUser(req.body);
  res.status(201).json(session);
}

export async function login(req, res) {
  const session = await loginUser(req.body);
  res.json(session);
}

export function me(req, res) {
  res.json({ user: publicUser(req.user) });
}

export async function profile(req, res) {
  res.json({ user: publicUser(req.user), stats: await getUserStats(req.user.id) });
}

export async function updateMe(req, res) {
  res.json({ user: await updateProfile(req.user, req.body) });
}
