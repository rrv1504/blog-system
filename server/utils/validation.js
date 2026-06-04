export function requireText(value, field, minLength = 1) {
  if (typeof value !== "string" || value.trim().length < minLength) {
    return `${field} is required.`;
  }

  return null;
}
