export const normalizeIds = (arr) =>
  arr.map((item) => (typeof item === "object" ? item._id : item));
