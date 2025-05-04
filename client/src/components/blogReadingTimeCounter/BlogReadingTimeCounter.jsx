import { useMemo } from "react";

const BlogReadingTimeCounter = ({ content }) => {
  const readingTime = useMemo(() => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} minute(s)`;
  }, [content]);
  return <div className="italic">{readingTime}</div>;
};

export default BlogReadingTimeCounter;
