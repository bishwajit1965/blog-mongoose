// import { useCallback, useEffect, useState } from "react";

// export const useBlogContentLimit = (initialContent = "", maxWords = 3000) => {
//   const [content, setContent] = useState(initialContent);
//   const [selectedLength, setSelectedLength] = useState("Medium"); // Default to 'Medium'
//   const [wordCount, setWordCount] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [progressBarColor, setProgressBarColor] = useState("bg-green-500");

//   const updateProgress = useCallback((text) => {
//     const words = text.trim().split(/\s+/).filter(Boolean); // Remove empty elements
//     const count = words.length;
//     setWordCount(count);

//     if (count < 600) {
//       setProgressBarColor("bg-green-500");
//     } else if (count < 1200) {
//       setProgressBarColor("bg-yellow-500");
//     } else {
//       setProgressBarColor("bg-red-500");
//     }
//   }, []);

//   const handleContentChange = (e) => {
//     const text = e.target.value;
//     const words = text.trim().split(/\s+/).filter(Boolean); // Ensure accurate word count
//     const count = words.length;

//     if (count <= maxWords) {
//       setContent(text);
//       updateProgress(text);
//     }
//   };

//   useEffect(() => {
//     setContent(initialContent);
//     updateProgress(initialContent);
//   }, [initialContent, updateProgress]);

//   const handleSelectChange = useCallback((e) => {
//     setSelectedLength(e.target.value);
//   }, []);

//   useEffect(() => {
//     const lengthRanges = {
//       Medium: { min: 300, max: 600 },
//       Large: { min: 600, max: 1200 },
//       ExtraLarge: { min: 1200, max: 2000 },
//       Jumbo: { min: 2000, max: 3000 },
//     };

//     const range = lengthRanges[selectedLength];

//     if (range) {
//       const count = wordCount;
//       const { min, max } = range;

//       let percentage = 0;
//       if (count <= min) {
//         percentage = (count / min) * 100;
//       } else if (count >= max) {
//         percentage = 100;
//       } else {
//         percentage = ((count - min) / (max - min)) * 100;
//       }

//       setProgress(Math.max(percentage, 0));

//       if (percentage >= 90) {
//         setProgressBarColor("bg-red-500");
//       } else if (percentage >= 50) {
//         setProgressBarColor("bg-yellow-500");
//       } else {
//         setProgressBarColor("bg-green-500");
//       }
//     }
//   }, [selectedLength, wordCount]);

//   return {
//     content,
//     selectedLength,
//     wordCount,
//     progress,
//     progressBarColor,
//     handleContentChange,
//     handleSelectChange,
//   };
// };

// export default useBlogContentLimit;

import { useCallback, useEffect, useState } from "react";

export const useBlogContentLimit = (initialContent = "", maxWords = 3000) => {
  const [content, setContent] = useState(initialContent);
  const [selectedLength, setSelectedLength] = useState("Medium"); // Default selection
  const [wordCount, setWordCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState("bg-green-500");

  const updateProgress = useCallback((text) => {
    const count = text.trim().split(/\s+/).filter(Boolean).length; // Ensuring empty spaces are ignored
    setWordCount(count);

    // Adjust progress bar color based on word count
    if (count < 600) {
      setProgressBarColor("bg-green-700");
    } else if (count < 1200) {
      setProgressBarColor("bg-yellow-700");
    } else {
      setProgressBarColor("bg-red-700");
    }
  }, []);

  const handleContentChange = (e) => {
    const text = e.target.value;
    const count = text.trim().split(/\s+/).filter(Boolean).length;

    if (count <= maxWords) {
      setContent(text);
      updateProgress(text);
    }
  };

  useEffect(() => {
    setContent(initialContent); // Sync with initial content
    updateProgress(initialContent);
  }, [initialContent, updateProgress]);

  const handleSelectChange = useCallback((e) => {
    setSelectedLength(e.target.value);
  }, []);

  useEffect(() => {
    const lengthRanges = {
      Medium: { min: 300, max: 600 },
      Large: { min: 600, max: 1200 },
      ExtraLarge: { min: 1200, max: 2000 },
      Jumbo: { min: 2000, max: 3000 },
    };

    const range = lengthRanges[selectedLength];

    if (range) {
      const count = wordCount;
      const { min, max } = range;

      let percentage;
      if (count <= min) {
        percentage = (count / min) * 100;
      } else if (count >= max) {
        percentage = 100;
      } else {
        percentage = ((count - min) / (max - min)) * 100;
      }

      setProgress(Math.max(percentage, 0));

      // Adjust color based on progress percentage
      if (percentage >= 90) {
        setProgressBarColor("bg-red-700");
      } else if (percentage >= 50) {
        setProgressBarColor("bg-yellow-700");
      } else {
        setProgressBarColor("bg-green-700");
      }
    }
  }, [selectedLength, wordCount]); // Depend only on selected length & word count

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

// import { useCallback, useEffect, useState } from "react";

// export const useBlogContentLimit = (initialContent = "", maxLength = 3000) => {
//   const [content, setContent] = useState(""); // Blog content
//   const [selectedLength, setSelectedLength] = useState("Medium"); // Default to 'Medium'
//   const [wordCount, setWordCount] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [progressBarColor, setProgressBarColor] = useState("bg-green-500");

//   const updateProgress = useCallback((text) => {
//     const count = text.trim().split(/\s+/).length;
//     setWordCount(count);

//     if (count < 600) {
//       setProgressBarColor("green");
//     } else if (count < 1200) {
//       setProgressBarColor("yellow");
//     } else {
//       setProgressBarColor("red");
//     }
//   }, []);
//   const handleContentChange = (e) => {
//     const text = e.target.value.slice(0, maxLength);
//     setContent(text);
//     updateProgress(text);
//   };
//   // const handleContentChange = useCallback((e) => {
//   //   setContent(e.target.value);
//   // }, []);

//   useEffect(() => {
//     setContent(initialContent); // Sync with initial content on mount or content change
//     updateProgress(initialContent); // Update progress based on initial content
//   }, [initialContent, updateProgress]);

//   const handleSelectChange = useCallback((e) => {
//     setSelectedLength(e.target.value);
//   }, []);

//   useEffect(() => {
//     // Define the length ranges for the blog post
//     const lengthRanges = {
//       Medium: { min: 300, max: 600 },
//       Large: { min: 600, max: 1200 },
//       ExtraLarge: { min: 1200, max: 2000 },
//       Jumbo: { min: 2000, max: 3000 },
//     };

//     // Get the selected range based on `selectedLength`
//     const range = lengthRanges[selectedLength];

//     if (range) {
//       // Count the number of words in the content
//       const wordArray = content.trim().split(/\s+/);
//       const count = wordArray.length;
//       setWordCount(count);

//       const { min, max } = range;

//       // Calculate progress percentage (capped at 100%)
//       let percentage = 0;
//       if (count < min) {
//         percentage = (count / min) * 100;
//       } else if (percentage >= min) {
//         percentage = 100;
//       } else {
//         percentage = ((count - min) / (max - min)) * 100;
//       }

//       setProgress(Math.max(percentage, 0));

//       // Set the progress bar color
//       if (percentage >= 90) {
//         setProgressBarColor("bg-red-500");
//       } else if (percentage >= 50) {
//         setProgressBarColor("bg-yellow-500");
//       } else {
//         setProgressBarColor("bg-green-500");
//       }
//     }
//   }, [initialContent, selectedLength, content]); // Dependencies: re-run when content or selectedLength changes

//   return {
//     content,
//     selectedLength,
//     wordCount,
//     progress,
//     progressBarColor,
//     handleContentChange,
//     handleSelectChange,
//   };
// };

// export default useBlogContentLimit;
