import React, { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import Modal from "react-modal";
import { customStyles } from "@/styles/styles";
import AnamneseForm from "../forms/AnamneseForm";
import HeaderModal from "../partials/HeaderModal";

//Componente de anamnese para atendimento para a screen do veterinario
const Anamnsese: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { atendimento } = useAtendimento();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if (!atendimento) {
      alert("Por favor, selecione um atendimento.");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex justify-center items-center">
        <button className="vet-botao" onClick={openModal}>
          <h1>Adicionar Anamnese</h1>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <HeaderModal selected="Anamnese" closeModal={closeModal} />

        {atendimento && (
          <AnamneseForm
            selectedAtendimento={atendimento}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default Anamnsese;
