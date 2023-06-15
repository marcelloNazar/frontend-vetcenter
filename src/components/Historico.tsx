import React, { useState, useContext, useEffect } from "react";
import ReactModal from "react-modal";
import { AnimalContext } from "../contexts/AnimalContext";
import { customStyles } from "@/styles/styles";
import { AnamneseRecord } from "@/types";
import AnamneseModal from "./forms/AnamneseModal";
import AnamneseList from "./forms/AnamneseList";

const Historico: React.FC = () => {
  const { animal } = useContext(AnimalContext);

  const [anamneseRecords, setAnamneseRecords] = useState<AnamneseRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<AnamneseRecord | null>(
    null
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (animal) {
      fetch(`http://localhost:8080/anamnese/animal/${animal.id}`)
        .then((response) => response.json())
        .then((data) => setAnamneseRecords(data));
    }
  }, [animal]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full ">
      <div className="p-4">
        <h1>Histórico</h1>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Anamnese Modal"
      >
        {selectedRecord === null ? (
          <AnamneseList
            records={anamneseRecords}
            setSelectedRecord={setSelectedRecord}
            closeModal={closeModal}
          />
        ) : (
          <AnamneseModal closeModal={closeModal} record={selectedRecord} />
        )}
      </ReactModal>
      <div className="flex flex-col items-center h-full w-full -mt-2 justify-between">
        <button className="hist-botao border-red-700" onClick={openModal}>
          Anamnese
        </button>
        <button className="hist-botao border-green-700" onClick={openModal}>
          Internação
        </button>
        <button className="hist-botao border-blue-700" onClick={openModal}>
          Vacina
        </button>
        <button className="hist-botao border-orange-700" onClick={openModal}>
          Cirurgia
        </button>
        <button className="hist-botao border-yellow-700" onClick={openModal}>
          Exames
        </button>
        <button className="hist-botao border-purple-700" onClick={openModal}>
          Receita
        </button>
      </div>
    </div>
  );
};

export default Historico;
