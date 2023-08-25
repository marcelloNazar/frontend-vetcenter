import Modal from "react-modal";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../../partials/HeaderModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DetalhesAtendimento from "../partials/DetalhesAtendimento/DetalhesAtendimento";
import ProdServ from "../../user/ProdServ";
import { useAdicionar } from "./useAdicionar";

const Adicionar: React.FC = () => {
  const {
    atendimento,
    selectedVeterinario,
    setSelectedVeterinario,
    veterinarios,
    criarAtendimento,
    atendimentos,
    onAtendimentoClick,
    handleDelete,
    atendimentosConcluidos,
    abrirModal,
    isModalOpen,
    fecharModal,
    currentAtendimento,
    isPago,
    handlePagoChange,
    atualizarAtendimento,
  } = useAdicionar();

  return (
    <div className="vet-container overflow-hidden">
      {atendimento ? (
        <ProdServ data={atendimento} />
      ) : (
        <>
          <div className="flex flex-col justify-center items-center w-full h-1/2">
            <div className="flex justify-center w-full border-black border-b">
              <h2 className="uppercase">Lista de Espera</h2>
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
                  <div
                    className="flex w-full"
                    onClick={() => onAtendimentoClick(atendimento)}
                  >
                    <p className="flex w-2/3">
                      {atendimento.veterinario.nome
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </p>
                    <p className="flex w-1/3">
                      {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
                    </p>
                  </div>
                  <button onClick={() => handleDelete(atendimento.id)}>
                    <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full h-1/2">
            <div className="flex justify-center w-full border-t border-black border-b mt-2">
              <h2 className="uppercase">Atendimentos em Andamento</h2>
            </div>
            <div className="vet-container flex-col h-full justify-start overflow-auto py-1 p-2">
              {atendimentosConcluidos.map((atendimento, index) => (
                <div key={index} className="item-list dark:bg-gray-950">
                  <div
                    className="flex w-full"
                    onClick={() => abrirModal(atendimento)}
                  >
                    <p className="flex w-2/3">
                      {atendimento.veterinario.nome
                        .split(" ")
                        .slice(0, 2)
                        .join(" ")}
                    </p>
                    <p className="flex w-1/3 mr-6">
                      {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
                    </p>
                  </div>
                  {
                    (atendimento.veterinario.id = 1 ? (
                      <button onClick={() => onAtendimentoClick(atendimento)}>
                        <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                      </button>
                    ) : (
                      <></>
                    ))
                  }
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={fecharModal}
      >
        {currentAtendimento && (
          <div className="modal-container">
            <HeaderModal selected="Atendimento" closeModal={fecharModal} />
            <DetalhesAtendimento
              atendimento={currentAtendimento}
              isPago={isPago}
              handlePagoChange={handlePagoChange}
              atualizarAtendimento={atualizarAtendimento}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Adicionar;
