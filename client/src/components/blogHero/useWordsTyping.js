import { useEffect, useState } from "react";

const useWordTyping = (text, speed = 100, delayAfterComplete = 5000) => {
  const words = text.split(" ");
  const [displayed, setDisplayed] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => [...prev, words[index]]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayed([]);
        setIndex(0);
      }, delayAfterComplete);

      return () => clearTimeout(resetTimeout);
    }
  }, [index, words, speed, delayAfterComplete]);

  return displayed.join(" ");
};

export default useWordTyping;
