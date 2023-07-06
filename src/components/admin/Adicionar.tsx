import React, { useState, useContext, useEffect } from "react";
import { Veterinario } from "@/types/types";
import { AnimalContext } from "../../contexts/AnimalContext";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import Modal from "react-modal";
import { Atendimento } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../partials/HeaderModal";

const Adicionar: React.FC = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [selectedVeterinario, setSelectedVeterinario] = useState<string>("");
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const { animal } = useContext(AnimalContext);
  const [atendimentosConcluidos, setAtendimentoConcluidos] = useState<any[]>(
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAtendimento, setCurrentAtendimento] =
    useState<Atendimento | null>(null);
  const [isPago, setIsPago] = useState(false);

  const { atendimento } = useAtendimento();

  useEffect(() => {
    fetchVeterinarios();
    fetchAtendimentos();
    fetchAtendimentosConcluidos();
  }, [atendimento]);

  const fetchVeterinarios = () => {
    http
      .get("adm/atendimento/veterinario")
      .then((r) => setVeterinarios(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchAtendimentos = async () => {
    http
      .get("adm/atendimento")
      .then((r) => setAtendimentos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchAtendimentosConcluidos = async () => {
    http
      .get("adm/atendimento/concluidos")
      .then((r) => setAtendimentoConcluidos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const abrirModal = (atendimento: Atendimento) => {
    setCurrentAtendimento(atendimento);
    setIsPago(atendimento.pago);
    setIsModalOpen(true);
  };
  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const handlePagoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPago(event.target.checked);
  };
  const atualizarAtendimento = () => {
    if (currentAtendimento) {
      const body = { ...currentAtendimento, pago: isPago };

      http
        .put(`adm/atendimento/${currentAtendimento.id}`, body)
        .then((r) => {
          if (r.status === 200) {
            fecharModal();
            fetchAtendimentosConcluidos();
          } else {
            alert("Erro ao atualizar o atendimento");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  const criarAtendimento = () => {
    const body = {
      animalId: animal?.id,
      veterinarioId: selectedVeterinario,
    };
    http
      .post("adm/atendimento", body)
      .then((r) => {
        if (r.status === 201) {
          fetchAtendimentos();
        } else {
          alert("Erro ao adicionar o atendimento");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex flex-col justify-center items-center w-full h-1/2">
        <div className="flex justify-center w-full  border-black border-b">
          <h2>Lista de Espera</h2>
        </div>
        <header className="flex px-2 w-full justify-between items-center">
          <select
            value={selectedVeterinario}
            onChange={(e) => setSelectedVeterinario(e.target.value)}
            className="vet-input ml-0 h-9 first: dark:text-black w-1/2"
          >
            {veterinarios.map((veterinario) => (
              <option key={veterinario.id} value={veterinario.id}>
                {veterinario.nome}
              </option>
            ))}
          </select>
          <button className="vet-botao h-9" onClick={criarAtendimento}>
            Criar atendimento
          </button>
        </header>
        <div className="vet-container flex-col h-full justify-start p-2 overflow-auto">
          {atendimentos.map((atendimento, index) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p>{atendimento.veterinario.nome}</p>
              <p>{atendimento.animal.nome}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2">
        <div className="flex justify-center w-full border-t border-black border-b mt-2">
          <h2>Atendimentos Concluidos</h2>
        </div>
        <div className="vet-container flex-col h-full justify-start overflow-auto p-2">
          {atendimentosConcluidos.map((atendimento, index) => (
            <div
              className="item-list dark:bg-gray-950"
              key={index}
              onClick={() => abrirModal(atendimento)}
            >
              <p>{atendimento.veterinario.nome}</p>
              <p>{atendimento.animal.nome}</p>
            </div>
          ))}
        </div>
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

export default Adicionar;
