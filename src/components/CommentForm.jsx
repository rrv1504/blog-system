import React, { useState } from "react";
import { Send } from "lucide-react";
import { addComment } from "../services/postsApi.js";

export function CommentForm({ postId, token, onComment }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");

    try {
      const updatedPost = await addComment(postId, { text }, token);
      setText("");
      onComment(updatedPost);
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  return (
    <form className="comment-form" onSubmit={submit}>
      <input placeholder="Add a comment" value={text} onChange={(event) => setText(event.target.value)} />
      <button type="submit" aria-label="Post comment">
        <Send size={17} />
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
