import React from "react";
import ReactModal from "react-modal";
import { customStylesProd, customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import ProdServForm from "@/components/forms/ProdServ/ProdServForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { numberToString } from "@/functions/format";
import { useProduto } from "./useProduto";

const ProdutoComponent: React.FC = () => {
  const {
    produtos,
    currentProduto,
    setCurrentProduto,
    fetchProduto,
    handleAddSubmit,
    handleUpdateSubmit,
    handleDelete,
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
  } = useProduto();

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Produtos</h1>
        <div>
          <button
            onClick={() => {
              openModal();
              fetchProduto();
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
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Selecione um produto"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded border bg-white text-black"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar produto..."
            onChange={handleSearch}
          />
          <div className="flex justify-between bg-white border border-gray-500  shadow-gray-500 px-2 mb-1 w-full mt-4 ">
            <div className="flex w-4/12 border-r border-gray-500">Nome:</div>
            <div className="flex w-6/12 border-r border-gray-500">
              Descrição:
            </div>
            <div className="flex w-2/12 border-r border-gray-500">Preço:</div>
            <div className="flex justify-center pr-2 pl-3">editar</div>
          </div>
          <div className="overflow-y-auto h-full w-full">
            {produtos
              .filter((produto) =>
                produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((produto) => (
                <div key={produto.id} className="item-list">
                  <div className="flex w-4/12 border-r border-gray-500">
                    <div>{produto.nome}</div>
                  </div>
                  <div className="flex w-6/12 border-r border-gray-500">
                    <div>{produto.descricao}</div>
                  </div>
                  <div className="flex w-2/12 border-r border-gray-500">
                    <div>R$ {numberToString(produto.valor)}</div>
                  </div>
                  <div className="flex justify-between pl-1 gap-1">
                    <button
                      onClick={() => {
                        setCurrentProduto(produto);
                        openUpdateModal();
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete(produto.id)}>
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
        style={customStylesProd}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione o produto"
            closeModal={closeAddModal}
          />
          <ProdServForm handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>

      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStylesProd}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Atualize o produto"
            closeModal={closeUpdateModal}
          />
          <ProdServForm
            data={currentProduto}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default ProdutoComponent;
