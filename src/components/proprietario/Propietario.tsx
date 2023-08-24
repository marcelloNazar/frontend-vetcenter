import ReactModal from "react-modal";
import FormularioProprietario from "../forms/Proprietario/ProprietarioForm";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../partials/HeaderModal";
import { useProprietario } from "./useProprietario";

//Componente do proprietario para a screen do veterinario
const PropUser: React.FC = () => {
  const {
    proprietario,
    setUpdateModalIsOpen,
    handleVoltar,
    formatarData,
    setModalIsOpen,
    fetchProprietario,
    setAddModalIsOpen,
    modalIsOpen,
    addModalIsOpen,
    updateModalIsOpen,
    pesquisa,
    HandleSearch,
    owners,
    handleOwnerClick,
    handleAddSubmit,
    closeAddModal,
    closeModal,
    closeUpdateModal,
    handleUpdateSubmit,
  } = useProprietario();

  return (
    <div className="vet-container overflow-hidden">
      {proprietario ? (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{proprietario.nome}</h2>
            <div>
              <button
                className="vet-botao mr-2"
                onClick={() => setUpdateModalIsOpen(true)}
              >
                Editar
              </button>
              <button className="vet-botao" onClick={handleVoltar}>
                Voltar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 mr-28">
            <div className="data-container">
              <div>Telefone:</div>
              <div className="">{proprietario.telefone}</div>
            </div>
            <div className="data-container">
              <div>CPF:</div>
              <div>{proprietario.cpf}</div>
            </div>
            <div className="data-container">
              <div>Nascimento:</div>
              <div>{formatarData(proprietario.nascimento)}</div>
            </div>
            <div className="data-container">
              <div>Nome da Mae:</div>
              <div>{proprietario.nomeMae.split(" ").slice(0, 2).join(" ")}</div>
            </div>
            <div className="data-container">
              <div>Cidade:</div>
              <div>{proprietario.endereco.cidade}</div>
            </div>
            <div className="data-container">
              <div>Sexo:</div>
              <div>{proprietario.sexo.toLowerCase()}</div>
            </div>
            <div className="data-container">
              <div>Estado:</div>
              <div>{proprietario.endereco.uf}</div>
            </div>
            <div className="data-container">
              <div>telefone 2:</div>
              <div>{proprietario.telefone1}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            className="vet-botao m-2"
            onClick={() => {
              setModalIsOpen(true);
              fetchProprietario();
            }}
          >
            Selecione o Proprietário
          </button>
          <button
            className="vet-botao m-2"
            onClick={() => setAddModalIsOpen(true)}
          >
            Adicione um Proprietário
          </button>
        </div>
      )}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Selecione um proprietario"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded bg-white text-black"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar proprietario..."
            onChange={HandleSearch}
          />
          <div className="overflow-y-auto h-full w-full mt-4">
            <div className="item-list">
              <h2 className="w-6/12 border-r border-gray-500  pl-1">NOME</h2>
              <h2 className="w-3/12 border-r border-gray-500  pl-1">CPF</h2>
              <h2 className="w-3/12 pl-1">TELEFONE</h2>
            </div>
            {owners
              .filter((owner) =>
                owner.nome?.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((owner) => (
                <div
                  key={owner.id}
                  onClick={() => handleOwnerClick(owner)}
                  className="item-list"
                >
                  <h2 className="w-6/12 border-r border-gray-500  pl-1">
                    {owner.nome}
                  </h2>
                  <h2 className="w-3/12 border-r border-gray-500  pl-1">
                    {owner.cpf}
                  </h2>
                  <h2 className="w-3/12 pl-1">{owner.telefone}</h2>
                </div>
              ))}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do proprietario"
            closeModal={closeAddModal}
          />
          <FormularioProprietario handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do proprietario"
            closeModal={closeUpdateModal}
          />
          <FormularioProprietario
            data={proprietario || {}}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default PropUser;
