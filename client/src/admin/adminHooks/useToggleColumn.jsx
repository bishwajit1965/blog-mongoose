import { useState } from "react";

const useToggleColumn = () => {
  const [isColumnHidden, setIsColumnHidden] = useState(false);

  const toggleColumnHide = () => setIsColumnHidden(!isColumnHidden);
  return { isColumnHidden, toggleColumnHide };
};

export default useToggleColumn;
