import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Atendimento } from "@/types/types";
import Modal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";
import DetalhesAtendimento from "./partials/DetalhesAtendimento/DetalhesAtendimento";

const TodosAtendimentos: React.FC = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAtendimento, setCurrentAtendimento] =
    useState<Atendimento | null>(null);
  const [isPago, setIsPago] = useState(false);

  const abrirModal = (atendimento: Atendimento) => {
    setCurrentAtendimento(atendimento);
    setIsPago(atendimento.pago);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setCurrentAtendimento(null);
  };

  const handlePagoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPago(event.target.checked);
  };

  useEffect(() => {
    fetchAtendimentos();
    const interval = setInterval(() => {
      fetchAtendimentos();
    }, 1 * 5 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchAtendimentos = async () => {
    http
      .get("adm/atendimento/finalizados")
      .then((r) => setAtendimentos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const atualizarAtendimento = () => {
    if (currentAtendimento) {
      const body = { ...currentAtendimento, pago: isPago };

      http
        .put(`adm/atendimento/${currentAtendimento.id}`, body)
        .then((r) => {
          if (r.status === 200) {
            fecharModal();
            fetchAtendimentos();
          } else {
            alert("Erro ao atualizar o atendimento");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex justify-center w-full  border-black border-b">
        <h2 className="uppercase">Atendimentos finalizados</h2>
      </div>
      <div className="vet-container flex-col h-full  justify-start overflow-hidden py-1 p-2">
        {atendimentos.map((atendimento, index) => (
          <div
            key={index}
            className="item-list dark:bg-gray-950 "
            onClick={() => abrirModal(atendimento)}
          >
            <p className="w-7/12">
              {atendimento.proprietario.nome.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="w-2/12">{atendimento.pago ? "Pago" : ""}</p>
            <p className="w-1/4 justify-between flex">
              R$
              <p>
                {atendimento.total.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </p>
          </div>
        ))}
      </div>
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={fecharModal}
      >
        {currentAtendimento && (
          <div className="modal-container">
            <HeaderModal selected="Atendimento" closeModal={fecharModal} />
            <DetalhesAtendimento
              atendimento={currentAtendimento}
              isPago={isPago}
              handlePagoChange={handlePagoChange}
              atualizarAtendimento={atualizarAtendimento}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TodosAtendimentos;
