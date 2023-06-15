import React from "react";
import { AnamneseRecord } from "@/types";
import HeaderModal from "../partials/HeaderModal";

interface AnamneseListProps {
  records: AnamneseRecord[];
  setSelectedRecord: (record: AnamneseRecord | null) => void;
  closeModal: () => void;
}

const AnamneseList: React.FC<AnamneseListProps> = ({
  records,
  setSelectedRecord,
  closeModal,
}) => {
  return (
    <div className="modal-container">
      <HeaderModal selected="Anamnese" closeModal={closeModal} />

      {records.map((record, index) => (
        <div
          key={index}
          onClick={() => setSelectedRecord(record)}
          className="item-list"
        >
          <h2>{record.veterinario.nome}</h2>
          <p>Data: {new Date(record.data).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AnamneseList;
