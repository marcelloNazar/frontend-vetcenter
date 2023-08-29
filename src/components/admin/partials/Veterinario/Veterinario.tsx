import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import VeterinarioForm from "@/components/forms/Veterinario/VeterinarioForm";
import { Veterinario } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useVeterinario } from "./useVeterinario";

const VeterinarioComponent: React.FC = () => {
  const {
    veterinarios,
    newVeterinario,
    setNewVeterinario,
    fetchVeterinario,
    handleAddSubmit,
    handleUpdateSubmit,
    modalIsOpen,
    openModal,
    closeModal,
    addModalIsOpen,
    openAddModal,
    closeAddModal,
    updateModalIsOpen,
    openUpdateModal,
    closeUpdateModal,
    pesquisa,
    handleSearch,
  } = useVeterinario();

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Veterinarios</h1>
        <div>
          <button
            onClick={() => {
              openModal();
              fetchVeterinario();
            }}
            className="vet-botao mr-4"
          >
            Ver Todos
          </button>
          <button onClick={() => openAddModal()} className="vet-botao">
            Adicionar
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => openModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Selecione um proprietario"
            closeModal={closeModal}
          />
          <input
            className="vet-input ml-1"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar proprietario..."
            onChange={handleSearch}
          />
          <div className="flex justify-between bg-gray-100 border border-gray-500 px-2 mb-1 w-full">
            <div className="w-3/12 border-r -ml-1 pr-1 border-gray-500">
              NOME USUARIO
            </div>
            <div className="w-3/12 border-r flex justify-start border-gray-500">
              NOME
            </div>
            <div className="w-1/12 border-r border-gray-500">TIPO</div>
            <div className="w-1/6 border-r border-gray-500">TELEFONE</div>
            <div className="w-1/6 border-r border-gray-500">CRMV</div>
            <div className="flex justify-center">
              <div>EDITAR</div>
            </div>
          </div>
          <div className="overflow-scroll overflow-x-hidden h-full w-full scrollbar scrollbar-thumb-gray-300">
            {veterinarios
              .filter((veterinario) =>
                veterinario.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((veterinario) => (
                <div key={veterinario.id} className="item-list">
                  <div className="flex w-3/12 border-r border-gray-500">
                    <div>{veterinario.username}</div>
                  </div>
                  <div className="flex w-3/12 border-r border-gray-500">
                    <div>{veterinario.nome}</div>
                  </div>
                  <div className="flex w-1/12 border-r border-gray-500">
                    <div>
                      {veterinario.role === "USER" ? <p>VET</p> : <p>ADM</p>}
                    </div>
                  </div>
                  <div className="flex w-1/6 border-r border-gray-500">
                    <div>{veterinario.telefone}</div>
                  </div>
                  <div className="flex w-1/6 border-r border-gray-500">
                    <div>{veterinario.crmv}</div>
                  </div>
                  <div className="flex ">
                    <div className="w-4"></div>
                    <button
                      onClick={() => {
                        setNewVeterinario(veterinario);
                        openUpdateModal();
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
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
            selected="Adicione os dados do proprietario"
            closeModal={closeAddModal}
          />
          <VeterinarioForm handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do proprietario"
            closeModal={closeUpdateModal}
          />
          <VeterinarioForm
            data={newVeterinario}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default VeterinarioComponent;
