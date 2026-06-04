import React, { useState } from "react";
import { Plus } from "lucide-react";
import { createPost, updatePost } from "../services/postsApi.js";

export function PostEditor({ token, post, onCancel, onSaved }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = { title, content, imageUrl };
      const savedPost = post ? await updatePost(post.id, payload, token) : await createPost(payload, token);
      onSaved(savedPost);

      if (!post) {
        setTitle("");
        setContent("");
        setImageUrl("");
      }
    } catch (caughtError) {
      setError(caughtError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="editor" onSubmit={submit}>
      <input placeholder="Blog title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <input placeholder="Cover image URL" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
      {imageUrl && <img className="image-preview" src={imageUrl} alt="" />}
      <textarea
        placeholder="Write your post..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={7}
      />
      {error && <p className="error">{error}</p>}
      <div className="editor-actions">
        {post && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="primary" disabled={saving}>
          <Plus size={18} />
          {saving ? "Saving" : post ? "Update post" : "Publish post"}
        </button>
      </div>
    </form>
  );
}
