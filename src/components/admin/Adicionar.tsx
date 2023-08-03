import React, { useState, useEffect } from "react";
import { Veterinario } from "@/types/types";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import Modal from "react-modal";
import { Atendimento } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../partials/HeaderModal";
import { TrashIcon } from "@heroicons/react/24/outline";

const Adicionar: React.FC = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [selectedVeterinario, setSelectedVeterinario] = useState<string>("");
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const [atendimentosConcluidos, setAtendimentoConcluidos] = useState<any[]>(
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAtendimento, setCurrentAtendimento] =
    useState<Atendimento | null>(null);
  const [isPago, setIsPago] = useState(false);

  const { atendimento, animal } = useAtendimento();

  useEffect(() => {
    fetchVeterinarios();

    fetchAtendimentos();
    fetchAtendimentosConcluidos();
    const interval = setInterval(() => {
      fetchAtendimentos();
      fetchAtendimentosConcluidos();
    }, 1 * 5 * 1000);
    return () => {
      clearInterval(interval);
    };
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
            alert(" atendimento");
          }
        })
        .catch((error) => alert("Erro ao atualizar o atendimento"));
    }
  };

  const criarAtendimento = () => {
    if (!selectedVeterinario) {
      alert("Selecione um Veterinario");
    }
    if (!animal) {
      alert("Selecione um Animal");
    }
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

  const handleDelete = (id: number) => {
    http
      .delete(`atendimento/${id}`)
      .then((response) => {
        fetchAtendimentos();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex flex-col justify-center items-center w-full h-1/2">
        <div className="flex justify-center w-full  border-black border-b">
          <h2>Lista de Espera</h2>
        </div>
        <header className="flex px-2 w-full justify-between items-center  border-b  border-black">
          <select
            value={selectedVeterinario}
            onChange={(e) => setSelectedVeterinario(e.target.value)}
            className="vet-input ml-0 h-9 first: dark:text-black w-1/2"
          >
            <option value="">Veterinarios</option>
            {veterinarios.map((veterinario) => (
              <option key={veterinario.id} value={veterinario.id}>
                {veterinario.nome.split(" ").slice(0, 2).join(" ")}
              </option>
            ))}
          </select>
          <button className="vet-botao h-9" onClick={criarAtendimento}>
            Criar atendimento
          </button>
        </header>
        <div className="vet-container flex-col h-full justify-start p-2 py-1 overflow-auto">
          {atendimentos.map((atendimento, index) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p className="flex w-1/2">
                {atendimento.veterinario.nome.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="flex w-1/2">
                <p className="mr-2">Animal:</p>
                {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
              </p>
              <button onClick={() => handleDelete(atendimento.id)}>
                <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2">
        <div className="flex justify-center w-full border-t border-black border-b mt-2">
          <h2>Atendimentos Concluidos</h2>
        </div>
        <div className="vet-container flex-col h-full justify-start overflow-auto py-1 p-2">
          {atendimentosConcluidos.map((atendimento, index) => (
            <div
              key={index}
              className="item-list dark:bg-gray-950"
              onClick={() => abrirModal(atendimento)}
            >
              <p>
                {atendimento.veterinario.nome.split(" ").slice(0, 2).join(" ")}
              </p>
              <p className="flex w-1/2">
                <p className="mr-2">Animal:</p>
                {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
              </p>
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
                  <p>Raça:</p> {currentAtendimento.animal.raca}
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

export default Adicionar;
