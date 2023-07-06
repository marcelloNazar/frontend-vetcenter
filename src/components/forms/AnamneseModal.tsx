import React from "react";
import { AnamneseRecord } from "@/types/types";
import HeaderModal from "../partials/HeaderModal";

interface AnamneseModalProps {
  record: AnamneseRecord;

  closeModal: () => void;
}

const AnamneseModal: React.FC<AnamneseModalProps> = ({
  record,
  closeModal,
}) => {
  return (
    <div className="modal-container">
      <HeaderModal selected="Anamnese" closeModal={closeModal} />

      <div className="body-modal">
        <h2 className="text-xl">{record.veterinario.nome}</h2>
        <div className="">
          <p>
            Data:
            {new Date(record.data).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Anamnese:</div>
          <p> {record.anamnese}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Estado:</div>
          <p> {record.estado}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Mucosas: </div>
          <p>{record.mucosas}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Linfonodos: </div>
          <p>{record.linfonodos}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">TPC:</div>
          <p> {record.tpc}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Turgor Cutâneo:</div>
          <p> {record.turgorCutaneo}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Desidratação:</div>
          <p> {record.desidratacao}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Ectoparasitas:</div>
          <p> {record.ectoparasitas ? "Sim" : "Não"}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Mioclonias: </div>
          <p>{record.mioclonias ? "Sim" : "Não"}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Prurido:</div>
          <p> {record.prurido}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Vômito:</div>
          <p> {record.vomito ? "Sim" : "Não"}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36">Diarréia: </div>
          <p>{record.diarreia ? "Sim" : "Não"}</p>
        </div>
        <div className="flex items-center justify-start">
          <div className="p-1 pl-0 w-36 ">Inapatência: </div>
          <p>{record.inapatencia}</p>
        </div>
      </div>
    </div>
  );
};

export default AnamneseModal;
