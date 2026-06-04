import React, { useState } from "react";
import { Edit3, Heart, MessageCircle, Trash2 } from "lucide-react";
import { deletePost, toggleLike } from "../services/postsApi.js";
import { formatDate } from "../utils/date.js";
import { CommentForm } from "./CommentForm.jsx";
import { PostEditor } from "./PostEditor.jsx";

function avatarInitial(name = "U") {
  return name.trim().charAt(0).toUpperCase();
}

function excerpt(text, length = 150) {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trim()}...`;
}

export function PostCard({ post, user, token, onUpdated, onDeleted, onOpen, variant = "detail" }) {
  const [editing, setEditing] = useState(false);
  const isOwner = user?.id === post.authorId;
  const liked = post.likedBy.includes(user?.id);
  const isGrid = variant === "grid";

  async function handleLike() {
    if (!user) {
      return;
    }

    const updatedPost = await toggleLike(post.id, token);
    onUpdated(updatedPost);
  }

  async function handleDelete() {
    if (!confirm("Delete this post?")) {
      return;
    }

    await deletePost(post.id, token);
    onDeleted(post.id);
  }

  function handleOpen() {
    if (onOpen) {
      onOpen(post.id);
    }
  }

  if (editing) {
    return (
      <article className="post-card">
        <PostEditor
          token={token}
          post={post}
          onCancel={() => setEditing(false)}
          onSaved={(updatedPost) => {
            setEditing(false);
            onUpdated(updatedPost);
          }}
        />
      </article>
    );
  }

  if (isGrid) {
    return (
      <article className="post-card grid-post-card">
        <button type="button" className="post-open-area" onClick={handleOpen}>
          {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="" />}
          <div className="grid-card-content">
            <div className="author-row compact-author">
              {post.author.avatarUrl ? (
                <img className="avatar" src={post.author.avatarUrl} alt="" />
              ) : (
                <span className="avatar avatar-fallback">{avatarInitial(post.author.name)}</span>
              )}
              <div>
                <p>{post.author.name}</p>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
            <h2>{post.title}</h2>
            <p className="post-body">{excerpt(post.content)}</p>
          </div>
        </button>
        <div className="post-actions grid-actions">
          <button type="button" className={liked ? "liked" : ""} onClick={handleLike} disabled={!user}>
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            {post.likedBy.length}
          </button>
          <span>
            <MessageCircle size={18} />
            {post.comments.length}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="post-card article-card">
      {post.imageUrl && <img className="post-image" src={post.imageUrl} alt="" />}
      <div className="post-header">
        <div className="author-row">
          {post.author.avatarUrl ? (
            <img className="avatar" src={post.author.avatarUrl} alt="" />
          ) : (
            <span className="avatar avatar-fallback">{avatarInitial(post.author.name)}</span>
          )}
          <div>
          <h2>{post.title}</h2>
          <p>By {post.author.name} on {formatDate(post.createdAt)}</p>
          </div>
        </div>
        {isOwner && (
          <div className="icon-actions">
            <button type="button" onClick={() => setEditing(true)} aria-label="Edit post" title="Edit post">
              <Edit3 size={17} />
            </button>
            <button type="button" onClick={handleDelete} aria-label="Delete post" title="Delete post">
              <Trash2 size={17} />
            </button>
          </div>
        )}
      </div>
      <p className="post-body">{post.content}</p>
      <div className="post-actions">
        <button type="button" className={liked ? "liked" : ""} onClick={handleLike} disabled={!user}>
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          {post.likedBy.length}
        </button>
        <span>
          <MessageCircle size={18} />
          {post.comments.length}
        </span>
      </div>
      <div className="comments">
        {post.comments.map((comment) => (
          <div className="comment" key={comment.id}>
            {comment.authorAvatarUrl ? (
              <img className="comment-avatar" src={comment.authorAvatarUrl} alt="" />
            ) : (
              <span className="comment-avatar avatar-fallback">{avatarInitial(comment.authorName)}</span>
            )}
            <p>
              <strong>{comment.authorName}</strong> {comment.text}
            </p>
          </div>
        ))}
      </div>
      {user && <CommentForm postId={post.id} token={token} onComment={onUpdated} />}
    </article>
  );
}
