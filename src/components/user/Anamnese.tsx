import React, { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import Modal from "react-modal";
import { customStyles } from "@/styles/styles";
import AnamneseForm from "../forms/AnamneseForm";
import HeaderModal from "../partials/HeaderModal";
import http from "@/utils/http";
import { AnamneseRecord } from "@/types/types";

//Componente de anamnese para atendimento para a screen do veterinario
const Anamnsese: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const { atendimento, anamnese, setAnamnese } = useAtendimento();

  useEffect(() => {
    if (atendimento) {
      setAnamnese(null); // limpa a anamnese do estado
      fetchAnamnese(); // busca a anamnese para o novo atendimento selecionado
    }
  }, [atendimento]);

  const fetchAnamnese = () => {
    http
      .get(`anamnese/atendimento/${atendimento?.id}`)
      .then((r) => setAnamnese(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const afterSubmit = () => {
    closeModal(); // Fecha o modal
    fetchAnamnese(); // Busca a anamnese atualizada
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
      {!anamnese ? (
        <div className="flex justify-center items-center">
          <button className="vet-botao" onClick={openModal}>
            <h1>Adicionar Anamnese</h1>
          </button>
        </div>
      ) : (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">Anamnese</h2>
          </div>
          <div className="grid grid-cols-2 mr-28">
            <div className="data-container">
              Data:
              <p>{atendimento?.data}</p>
            </div>
            <div className="data-container">
              <div>Anamnese:</div>
              <p> {anamnese.anamnese}</p>
            </div>

            <div className="data-container">
              <div>Estado:</div>
              <p> {anamnese.estado}</p>
            </div>
            <div className="data-container">
              <div>Mucosas: </div>
              <p>{anamnese.mucosas}</p>
            </div>
            <div className="data-container">
              <div>Linfonodos: </div>
              <p>{anamnese.linfonodos}</p>
            </div>
            <div className="data-container">
              <div>TPC:</div>
              <p> {anamnese.tpc}</p>
            </div>
            <div className="data-container">
              <div>Turgor Cutâneo:</div>
              <p> {anamnese.turgorCutaneo}</p>
            </div>
            <div className="data-container">
              <div>Desidratação:</div>
              <p> {anamnese.desidratacao}</p>
            </div>
            <div className="data-container">
              <div>Ectoparasitas:</div>
              <p> {anamnese.ectoparasitas ? "Sim" : "Não"}</p>
            </div>
            <div className="data-container">
              <div>Mioclonias: </div>
              <p>{anamnese.mioclonias ? "Sim" : "Não"}</p>
            </div>
            <div className="data-container">
              <div>Prurido:</div>
              <p> {anamnese.prurido}</p>
            </div>
            <div className="data-container">
              <div>Vômito:</div>
              <p> {anamnese.vomito ? "Sim" : "Não"}</p>
            </div>
            <div className="data-container">
              <div>Diarréia: </div>
              <p>{anamnese.diarreia ? "Sim" : "Não"}</p>
            </div>
            <div className="data-container">
              <div>Inapatência: </div>
              <p>{anamnese.inapatencia}</p>
            </div>
            <div className="data-container">
              <div>Secreções Patologicas: </div>
              <p>{anamnese.secrecoesPatologicas}</p>
            </div>
            <div className="data-container">
              <div>Calculo Dentario: </div>
              <p>{anamnese.calculoDentario}</p>
            </div>
            <div className="data-container">
              <div>Auscultação Cardiaca: </div>
              <p>{anamnese.auscultacaoCardiaca}</p>
            </div>
            <div className="data-container">
              <div>Auscultação Pulmonar: </div>
              <p>{anamnese.auscultacaoPulmonar}</p>
            </div>
            <div className="data-container">
              <div>Inapatência: </div>
              <p>{anamnese.reflexoToce}</p>
            </div>
            <div className="data-container">
              <div>Inapatência: </div>
              <p>{anamnese.emagrecimento}</p>
            </div>
            <div className="data-container">
              <div>Alteração Corpontamental: </div>
              <p>{anamnese.alteracaoComportamental}</p>
            </div>
            <div className="data-container">
              <div>Cansaço: </div>
              <p>{anamnese.cansaco}</p>
            </div>
            <div className="data-container">
              <div>Tosse: </div>
              <p>{anamnese.tosse}</p>
            </div>
            <div className="data-container">
              <div>Pulso: </div>
              <p>{anamnese.pulso}</p>
            </div>
            <div className="data-container">
              <div>FC: </div>
              <p>{anamnese.fc}</p>
            </div>
            <div className="data-container">
              <div>FR: </div>
              <p>{anamnese.fr}</p>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="w-full h-full overflow-hidden">
          <HeaderModal selected="Anamnese" closeModal={closeModal} />

          {atendimento && (
            <AnamneseForm
              selectedAtendimento={atendimento}
              onClose={afterSubmit}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Anamnsese;
