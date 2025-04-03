import { useCallback, useEffect, useState } from "react";

export const useBlogContentLimit = (initialContent = "", maxWords = 3000) => {
  const [content, setContent] = useState(initialContent);
  const [selectedLength, setSelectedLength] = useState("Medium");
  const [wordCount, setWordCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState("bg-green-500");

  // Function to count words from HTML content
  const countWords = (htmlContent) => {
    const text = htmlContent.replace(/<[^>]*>/g, " ").trim(); // Remove HTML tags
    return text.split(/\s+/).filter(Boolean).length; // Count words
  };

  // Function to handle content change from ReactQuill
  // const handleContentChange = (quillContent, delta, source) => {
  //   const count = countWords(quillContent);

  //   if (count <= maxWords) {
  //     setContent(quillContent);
  //     setWordCount(count);
  //     updateProgress(count);
  //   }
  // };
  // Function to handle content change from ReactQuill
  const handleContentChange = (quillContent, delta, source) => {
    const count = countWords(quillContent);

    // If the content doesn't exceed max words, update it
    if (count <= maxWords) {
      setContent(quillContent); // Save HTML content (quillContent holds the HTML)
      setWordCount(count); // Update word count
      updateProgress(count); // Update progress bar

      // Handle different sources for content change
      if (source === "user") {
        // Logic specific to user-driven content change
        console.log("User made a change");
      } else if (source === "api") {
        // Logic for content change via API (if any)
        console.log("Content updated via API");
      }

      // Log the delta to track the change in the content
      console.log("Content Delta: ", delta);
    }
  };
  // Function to update progress bar based on word count
  const updateProgress = useCallback(
    (count) => {
      setWordCount(count);

      if (count < 600) {
        setProgressBarColor("bg-green-700");
      } else if (count < 1200) {
        setProgressBarColor("bg-yellow-700");
      } else {
        setProgressBarColor("bg-red-700");
      }

      // Calculate progress based on selected range
      const lengthRanges = {
        Medium: { min: 300, max: 600 },
        Large: { min: 600, max: 1200 },
        ExtraLarge: { min: 1200, max: 2000 },
        Jumbo: { min: 2000, max: 3000 },
      };

      const range = lengthRanges[selectedLength];

      if (range) {
        let percentage;
        if (count <= range.min) {
          percentage = (count / range.min) * 100;
        } else if (count >= range.max) {
          percentage = 100;
        } else {
          percentage = ((count - range.min) / (range.max - range.min)) * 100;
        }

        setProgress(Math.max(percentage, 0));

        if (percentage >= 90) {
          setProgressBarColor("bg-red-700");
        } else if (percentage >= 50) {
          setProgressBarColor("bg-yellow-700");
        } else {
          setProgressBarColor("bg-green-700");
        }
      }
    },
    [selectedLength]
  );

  // Sync initial content on mount or update
  useEffect(() => {
    setContent(initialContent);
    const count = countWords(initialContent);
    setWordCount(count);
    updateProgress(count);
  }, [initialContent, updateProgress]);

  // Handle word length selection change
  const handleSelectChange = useCallback((e) => {
    setSelectedLength(e.target.value);
  }, []);

  return {
    content,
    selectedLength,
    wordCount,
    progress,
    progressBarColor,
    handleContentChange,
    handleSelectChange,
  };
};

export default useBlogContentLimit;
