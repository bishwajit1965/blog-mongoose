import { useMemo } from "react";

const useDateFormatter = (date) => {
  const formattedDate = useMemo(() => {
    if (!date) return "";
    const dateObj = new Date(date);
    return dateObj.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [date]);

  return formattedDate;
};

export default useDateFormatter;
