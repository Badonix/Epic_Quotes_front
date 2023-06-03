import React, { createContext, useState, ReactNode } from 'react';

interface ModalContextProps {
  openModal: string | null;
  setOpenModal: (modal: string | null) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  openModal: null,
  setOpenModal: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
};
