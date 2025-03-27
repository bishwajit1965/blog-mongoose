import { useEffect, useState } from "react";

const useWordCount = (text = "") => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(countWords(text).toLocaleString());
  }, [text]);

  return wordCount;
};

export default useWordCount;
