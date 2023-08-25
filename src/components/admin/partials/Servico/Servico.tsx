import ReactModal from "react-modal";
import { customStyles, customStylesProd } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import ProdServForm from "@/components/forms/ProdServ/ProdServForm";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { numberToString } from "@/functions/format";
import { useServico } from "./useServico";

const ServicoComponent: React.FC = () => {
  const {
    servicos,
    currentServico,
    setCurrentServico,
    fetchServico,
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
  } = useServico();

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Servicos</h1>
        <div>
          <button
            onClick={() => {
              openModal();
              fetchServico();
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
            selected="Selecione um Servico"
            closeModal={closeModal}
          />
          <input
            className="vet-input ml-1"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar Servico..."
            onChange={handleSearch}
          />
          <div className="flex justify-between bg-gray-100 border border-gray-500 px-2 mb-1 w-full">
            <div className="flex w-4/12 border-r border-gray-500">NOME:</div>
            <div className="flex w-6/12 border-r pl-2 border-gray-500">
              DESCRIÇÃO:
            </div>
            <div className="flex w-2/12 border-r pl-2 border-gray-500">
              PREÇO:
            </div>
            <div className="flex justify-center pr-1 pl-1.5">EDITAR</div>
          </div>
          <div className="overflow-scroll overflow-x-hidden h-full w-full">
            {servicos
              .filter((servico) =>
                servico.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((servico) => (
                <div key={servico.id} className="item-list">
                  <div className="flex w-4/12 border-r border-gray-500">
                    <div>{servico.nome}</div>
                  </div>
                  <div className="flex w-6/12 border-r pl-2 border-gray-500">
                    <div>{servico.descricao}</div>
                  </div>
                  <div className="flex w-2/12 border-r pl-2 border-gray-500">
                    <div>R$ {numberToString(servico.valor)}</div>
                  </div>
                  <div className="flex justify-between pl-1 gap-1">
                    <button
                      onClick={() => {
                        setCurrentServico(servico);
                        openUpdateModal();
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
        style={customStylesProd}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione o Servico"
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
            selected="Atualize o Servico"
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
