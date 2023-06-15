import React from "react";

type HeaderContainerProps = {
  selected: string;
  closeModal: () => void;
};

const HeaderModal: React.FC<HeaderContainerProps> = ({
  selected,
  closeModal,
}) => {
  return (
    <div className="header-container">
      <h1 className="text-xl">{selected}</h1>
      <button onClick={closeModal} className="vet-botao">
        Fechar
      </button>
    </div>
  );
};

export default HeaderModal;
