import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Atendimento } from "@/types/types";
import Modal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";

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
        <h2>Atendimentos finalizados</h2>
      </div>
      <div className="vet-container flex-col h-full  justify-start overflow-auto p-2">
        {atendimentos.map((atendimento, index) => (
          <div
            key={index}
            className="item-list dark:bg-gray-950 "
            onClick={() => abrirModal(atendimento)}
          >
            <p>{atendimento.proprietario.nome}</p>
            <p>Pago: {atendimento.pago ? "Sim" : "Não"}</p>
            <p>R${atendimento.total}</p>
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
            <HeaderModal selected="Anamnese" closeModal={fecharModal} />
            <div className="flex w-full gap-2 flex-col justify-between">
              <div className="flex w-full justify-between">
                <h2>Veterinário: {currentAtendimento.veterinario.nome}</h2>
                <h3>Animal: {currentAtendimento.animal.nome}</h3>
                <p>Proprietário: {currentAtendimento.proprietario.nome}</p>
              </div>
              <h4>Produtos:</h4>
              {currentAtendimento.produtos.map((produto, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between border-t border-b"
                >
                  <p>Nome: {produto.nome}</p>
                  <p>Quantidade: {produto.quantidade}</p>
                  <p>Valor: {produto.valor}</p>
                </div>
              ))}

              <h4>Serviços:</h4>
              {currentAtendimento.servicos.map((servico, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between border-t border-b"
                >
                  <p>Nome: {servico.nome}</p>
                  <p>Quantidade: {servico.quantidade}</p>
                  <p>Valor: {servico.valor}</p>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-between items-center mt-auto">
              <p>Total: {currentAtendimento.total}</p>
              <div>
                <input
                  type="checkbox"
                  checked={isPago}
                  onChange={handlePagoChange}
                />
                <label>Pago</label>
              </div>
              <button onClick={atualizarAtendimento} className="vet-botao">
                Finalizar Atendimento
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TodosAtendimentos;
