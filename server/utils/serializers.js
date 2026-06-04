export function publicUser(user) {
  const source = user?.toObject ? user.toObject({ virtuals: true }) : user;

  return {
    id: String(source.id || source._id),
    name: source.name,
    email: source.email,
    avatarUrl: source.avatarUrl || "",
    bio: source.bio || "",
    createdAt: source.createdAt
  };
}

function toPlain(document) {
  return document?.toObject ? document.toObject({ virtuals: true }) : document;
}

function objectId(value) {
  if (!value) {
    return "";
  }

  return String(value._id || value.id || value);
}

export function publicPost(post) {
  const source = toPlain(post);
  const author = source.author && typeof source.author === "object" ? source.author : null;

  return {
    id: objectId(source),
    title: source.title,
    content: source.content,
    imageUrl: source.imageUrl || "",
    authorId: objectId(author || source.author),
    comments: source.comments.map((comment) => ({
      id: objectId(comment),
      text: comment.text,
      authorId: objectId(comment.author),
      authorName: comment.authorName,
      authorAvatarUrl: comment.authorAvatarUrl || "",
      createdAt: comment.createdAt
    })),
    likedBy: source.likedBy.map((userId) => objectId(userId)),
    createdAt: source.createdAt,
    updatedAt: source.updatedAt,
    author: author ? publicUser(author) : { id: objectId(source.author), name: "Deleted user" }
  };
}
