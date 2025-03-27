import { useCallback, useEffect, useState } from "react";

const useExcerpt = (maxLength = 500, initialExcerpt = "") => {
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [remaining, setRemaining] = useState(maxLength - initialExcerpt.length);
  const [progressPercent, setProgressPercent] = useState(0);
  const [progressBarStyle, setProgressBarStyle] = useState({});
  const [counterStyle, setCounterStyle] = useState({});

  const updateProgress = useCallback(
    (text) => {
      const length = text.length;
      const percent = Math.round((length / maxLength) * 100);
      setProgressPercent(percent);
      setRemaining(maxLength - length);

      setProgressBarStyle({
        width: `${percent}%`,
        backgroundColor: percent > 80 ? "red" : "green",
        height: "10px",
        transition: "width 0.3s ease",
      });

      setCounterStyle({
        color: percent > 80 ? "red" : "gray",
        fontWeight: "bold",
      });
    },
    [maxLength]
  );

  useEffect(() => {
    setExcerpt(initialExcerpt);
    updateProgress(initialExcerpt);
  }, [initialExcerpt, updateProgress]);

  const handleExcerptChange = (e) => {
    const text = e.target.value.slice(0, maxLength); // This limits to the `maxLength` value
    setExcerpt(text);
    updateProgress(text);
  };

  return {
    excerpt,
    handleExcerptChange,
    remaining,
    progressPercent,
    progressBarStyle,
    counterStyle,
  };
};
export default useExcerpt;
