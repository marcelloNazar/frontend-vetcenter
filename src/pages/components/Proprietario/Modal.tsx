import { ReactNode } from "react";

type ModalProps = {
  onClose: (proprietario?: any) => void;
  children: ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose(null);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative w-1/2 h-1/2">
        <div className="bg-white p-4 rounded-lg shadow-md h-full">
          {children}
          <button
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => onClose(null)}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
