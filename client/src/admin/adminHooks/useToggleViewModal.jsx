import { useState } from "react";

const useToggleViewModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const openModal = (data) => {
    setBlogData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setBlogData(null);
  };

  return { isOpen, blogData, openModal, closeModal };
};

export default useToggleViewModal;
