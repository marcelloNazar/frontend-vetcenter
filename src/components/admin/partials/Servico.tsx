import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import ProdServForm from "@/components/forms/ProdServForm";
import { Servico } from "@/types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const ServicoComponent: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [currentServico, setCurrentServico] = useState<Partial<Servico>>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetchServico();
  }, []);

  const fetchServico = () => {
    http
      .get("servico")
      .then((r) => setServicos(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleAddSubmit = (data: Partial<Servico>) => {
    http
      .post("servico", data)
      .then((r) => {
        if (r.status === 201) {
          setAddModalIsOpen(false);
          fetchServico();
        } else {
          alert("Erro ao adicionar o Servico");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Servico>) => {
    http
      .put(`servico/${currentServico.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchServico();
        } else {
          alert("Erro ao atualizar o Servico");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`servico/${id}`)
      .then((response) => {
        fetchServico();
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Servicos</h1>
        <div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="vet-botao mr-4"
          >
            Ver Todos
          </button>
          <button onClick={() => setAddModalIsOpen(true)} className="vet-botao">
            Adicionar
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Selecione um Servico"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded bg-white text-black"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar Servico..."
            onChange={handleSearch}
          />
          <div className="overflow-y-auto h-full w-full mt-4 space-y-2">
            {servicos
              .filter((servico) =>
                servico.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((servico) => (
                <div key={servico.id} className="flex justify-between ">
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Nome:</div>
                    <div>{servico.nome}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Descrição:</div>
                    <div>{servico.descricao}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Preço:</div>
                    <div>
                      R${" "}
                      {servico.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div className="flex border justify-between px-2 gap-2">
                    <button
                      onClick={() => {
                        setCurrentServico(servico);
                        setUpdateModalIsOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete(servico.id)}>
                      <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do Servico"
            closeModal={closeAddModal}
          />
          <ProdServForm handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>

      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Atualize os dados do Servico"
            closeModal={closeUpdateModal}
          />
          <ProdServForm
            data={currentServico}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default ServicoComponent;
