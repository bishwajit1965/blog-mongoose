import { useState } from "react";

const useToggleViewModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (data) => {
    setModalData(data);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return { isOpen, modalData, openModal, closeModal };
};

export default useToggleViewModal;
