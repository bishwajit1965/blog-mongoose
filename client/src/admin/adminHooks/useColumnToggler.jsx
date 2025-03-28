import { useState } from "react";

const useColumnToggler = () => {
  const [viewMode, setViewMode] = useState("both");
  const toggleColumns = () => {
    if (viewMode === "both") setViewMode("right");
    else if (viewMode === "right") setViewMode("left");
    else setViewMode("both");
  };
  return { viewMode, toggleColumns };
};

export default useColumnToggler;
