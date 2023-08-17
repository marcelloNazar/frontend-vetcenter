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
        <div className="modal-container overflow-auto">
          <HeaderModal
            selected="Selecione um proprietario"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar proprietario..."
            onChange={handleSearch}
          />
          <div className="flex justify-between bg-white border border-gray-500  shadow-gray-500 px-2 mb-1 w-full mt-4 ">
            <div className="w-3/12 border-r border-gray-500">
              Nome de usuario
            </div>
            <div className="w-3/12 border-r flex justify-start border-gray-500">
              Nome
            </div>
            <div className="w-1/12 border-r border-gray-500">Tipo</div>
            <p className="w-1/6 border-r border-gray-500">Telefone</p>
            <p className="w-1/6 border-r border-gray-500">CRMV</p>
            <div className="flex">
              <div>Editar</div>
            </div>
          </div>
          <div className="overflow-scroll overflow-x-hidden  h-full w-full">
            {veterinarios
              .filter((veterinario) =>
                veterinario.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((veterinario) => (
                <div key={veterinario.id} className="item-list">
                  <h2 className="w-3/12 border-r border-gray-500">
                    {veterinario.username}
                  </h2>
                  <h2 className="w-3/12 border-r border-gray-500">
                    {veterinario.nome}
                  </h2>
                  <h2 className="w-1/12 border-r border-gray-500 uppercase">
                    {veterinario.role === "USER" ? <p>Vet.</p> : <p>Adm.</p>}
                  </h2>
                  <p className="w-1/6 border-r border-gray-500">
                    {veterinario.telefone}
                  </p>
                  <p className="w-1/6 border-r border-gray-500">
                    {veterinario.crmv}
                  </p>
                  <div className="flex">
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
