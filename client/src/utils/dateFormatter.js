const dateFormatter = (date) => {
  if (!date) return "";
  const dateObj = new Date(date);
  return dateObj.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default dateFormatter;
