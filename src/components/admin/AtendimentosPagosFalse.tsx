import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Atendimento } from "@/types/types";
import Modal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";

const AtendimentoPagosFalse: React.FC = () => {
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
    }, 1 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchAtendimentos = async () => {
    http
      .get("adm/atendimento/naopagos")
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
        <h2>Atendimentos Não Pagos</h2>
      </div>
      <div className="vet-container flex-col h-full  justify-start overflow-auto p-2">
        {atendimentos.map((atendimento, index) => (
          <div
            key={index}
            className="item-list dark:bg-gray-950 "
            onClick={() => abrirModal(atendimento)}
          >
            <p className="w-1/2">
              {atendimento.proprietario.nome.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="w-1/4">{atendimento.pago ? "Pago" : ""}</p>
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
            <div className="flex w-full flex-col justify-between">
              <div className="data-modal-container">
                <p className="data-modal">
                  <p>Veterinário:</p> {currentAtendimento.veterinario.nome}
                </p>
                <p className="data-modal">
                  <p>Animal:</p> {currentAtendimento.animal.nome}
                </p>
                <p className="data-modal">
                  <p>Data:</p> {currentAtendimento.data}
                </p>
              </div>
              <div className="data-modal-container">
                <p className="data-modal">
                  <p>Proprietario:</p> {currentAtendimento.proprietario.nome}
                </p>
                <p className="data-modal">
                  <p>CPF:</p> {currentAtendimento.proprietario.cpf}
                </p>
                <p className="data-modal">
                  <p>Telefone:</p> {currentAtendimento.proprietario.telefone}
                </p>
              </div>
              <div className="data-modal-container">
                <p className="data-modal">
                  <p>Nome da Mãe:</p> {currentAtendimento.proprietario.nomeMae}
                </p>
                <p className="data-modal">
                  <p>Sexo:</p> {currentAtendimento.proprietario.sexo}
                </p>
                <p className="data-modal">
                  <p>Telefone 2:</p> {currentAtendimento.proprietario.telefone1}
                </p>
              </div>
              <div className="data-modal-container">
                <p className="data-modal">
                  <p>Rua:</p> {currentAtendimento.proprietario.endereco?.rua}
                </p>
                <p className="data-modal">
                  <p>Numero:</p>{" "}
                  {currentAtendimento.proprietario.endereco?.numero}
                </p>
                <p className="data-modal">
                  <p>Bairro:</p>{" "}
                  {currentAtendimento.proprietario.endereco?.bairro}
                </p>
              </div>
              <div className="data-modal-container">
                <p className="data-modal">
                  <p>Cidade:</p>{" "}
                  {currentAtendimento.proprietario.endereco?.cidade}
                </p>
                <p className="data-modal">
                  <p>Estado:</p> {currentAtendimento.proprietario.endereco?.uf}
                </p>
                <p className="data-modal">
                  <p>CEP:</p> {currentAtendimento.proprietario.endereco?.cep}
                </p>
              </div>
              <h4 className="mt-4">Produtos:</h4>
              {currentAtendimento.produtos.map((produto, index) => (
                <div key={index} className="data-modal-container">
                  <p className="data-modal">
                    <p>Nome:</p> {produto.nome}
                  </p>
                  <p className="data-modal">
                    <p>Quantidade:</p> {produto.quantidade}
                  </p>
                  <p className="data-modal">
                    <p>Valor Unitario:</p> R${" "}
                    {produto.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}

              <h4 className="mt-4">Serviços:</h4>
              {currentAtendimento.servicos.map((servico, index) => (
                <div key={index} className="data-modal-container">
                  <p className="data-modal">
                    <p>Nome:</p> {servico.nome}
                  </p>
                  <p className="data-modal">
                    <p>Quantidade:</p> {servico.quantidade}
                  </p>
                  <p className="data-modal">
                    <p>Valor Unitário:</p>R${" "}
                    {servico.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
              <div>
                <div className="data-modal-container mt-4">
                  <div className="flex justify-center w-1/3">
                    <label>Pago?</label>

                    <input
                      type="checkbox"
                      checked={isPago}
                      onChange={handlePagoChange}
                    />
                  </div>
                  <p className="data-modal w-1/3">
                    <p>Total:</p>R${" "}
                    {currentAtendimento.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end items-center mt-auto">
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

export default AtendimentoPagosFalse;
