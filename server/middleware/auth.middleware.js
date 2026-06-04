import { User } from "../models/User.js";
import { verifyToken } from "../services/auth.service.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Login required." });
  }

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: "Account not found." });
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired session." });
  }
}
