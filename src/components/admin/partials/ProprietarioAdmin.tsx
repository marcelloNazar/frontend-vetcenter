import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import ProdServForm from "@/components/forms/ProdServForm";
import { Owner } from "@/types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProprietarioComponent: React.FC = () => {
  const [proprietarios, setProprietarios] = useState<Owner[]>([]);
  const [currentProprietario, setCurrentProprietario] = useState<
    Partial<Owner>
  >({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetchProprietario();
  }, []);

  const fetchProprietario = () => {
    http
      .get("proprietario")
      .then((r) => setProprietarios(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleAddSubmit = (data: Partial<Owner>) => {
    http
      .post("proprietario", data)
      .then((r) => {
        if (r.status === 201) {
          setAddModalIsOpen(false);
          fetchProprietario();
        } else {
          alert("Erro ao adicionar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Owner>) => {
    http
      .put(`proprietario/${currentProprietario.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchProprietario();
        } else {
          alert("Erro ao atualizar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`proprietario/${id}`)
      .then((response) => {
        fetchProprietario();
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
        <h1>Proprietarios</h1>
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
            selected="Selecione um produto"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar produto..."
            onChange={handleSearch}
          />
          <div className="overflow-y-auto h-full w-full mt-4 space-y-2">
            {proprietarios
              .filter((proprietario) =>
                proprietario.nome
                  ?.toLowerCase()
                  .includes(pesquisa.toLowerCase())
              )
              .map((proprietario) => (
                <div key={proprietario.id} className="flex justify-between ">
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Nome:</div>
                    <div>{proprietario.nome}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Descrição:</div>
                    <div>{proprietario.cpf}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Preço:</div>
                    <div>R$ {proprietario.divida}</div>
                  </div>
                  <div className="flex border justify-between px-2 gap-2">
                    <button
                      onClick={() => {
                        setCurrentProprietario(proprietario);
                        setUpdateModalIsOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete(proprietario.id)}>
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
            selected="Adicione os dados do produto"
            closeModal={closeAddModal}
          />
          <ProdServForm handleSubmit={handleAddSubmit} />
        </div>
      </ReactModal>

      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Atualize os dados do produto"
            closeModal={closeUpdateModal}
          />
          <ProdServForm
            data={currentProprietario}
            handleSubmit={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default ProprietarioComponent;
