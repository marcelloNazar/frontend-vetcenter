import ReactModal from "react-modal";
import { customStyles } from "@/styles/styles";
import FormularioAnimal from "../forms/Animal/AnimalForm";
import HeaderModal from "../partials/HeaderModal";
import { useAnimal } from "./useAnimal";

const AnimalUser: React.FC = () => {
  const {
    animal,
    proprietario,
    openModal,
    animals,
    handleClick,
    setUpdateModalIsOpen,
    handleVoltar,
    modalIsOpen,
    closeModal,
    handleSubmit,
    updateModalIsOpen,
    closeUpdateModal,
    newAnimal,
    handleUpdate,
  } = useAnimal();

  return (
    <div className="vet-container overflow-hidden">
      {!animal && proprietario && (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl ">ANIMAIS</h2>
            <button className="vet-botao" onClick={openModal}>
              Adicionar Animal
            </button>
          </div>
          <div className="overflow-y-auto w-full h-2/3 scrollbar scrollbar-thumb-gray-300">
            {animals.length === 0 ? (
              <div>proprietario não possui animal cadastrado</div>
            ) : (
              animals.map((animal, index) => (
                <div
                  key={index}
                  className="item-list dark:bg-gray-950"
                  onClick={() => handleClick(animal)}
                >
                  <div className="flex justify-between w-full">
                    <div className="w-1/4">{animal.nome}</div>
                    <div className="w-1/4">{animal.especie}</div>
                    <div className="w-1/4">{animal.raca}</div>
                    <div className="w-1/4">{animal.cor}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {animal && proprietario && (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{animal.nome}</h2>
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
              <div>Especie:</div>
              {animal.especie}
            </div>
            <div className="data-container">
              <div>Raça:</div> {animal.raca}
            </div>
            <div className="data-container">
              <div>Sexo:</div>{" "}
              {animal.sexo === "MASCULINO" ? (
                <div>Macho</div>
              ) : (
                <div>Femêa</div>
              )}
            </div>
            <div className="flex justify-between border-l-2 border-gray-900 dark:border-gray-100 px-4 w-full">
              <div>Peso:</div> {animal.peso}
            </div>
            <div className="data-container">
              <div>Idade:</div> {animal.idade}
            </div>
            <div className="data-container">
              <div>Cor:</div> {animal.cor}
            </div>
            <div className="data-container">
              <div>Temperamento:</div>
              {animal.temperamento}
            </div>
            <div className="data-container">
              <div>Castrado:</div> {animal.castrado ? "Sim" : "Não"}
            </div>
          </div>
        </div>
      )}
      {!proprietario && <h1>Selecione um Proprietario</h1>}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do animal"
            closeModal={closeModal}
          />

          <FormularioAnimal handleSubmit2={handleSubmit} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do animal"
            closeModal={closeUpdateModal}
          />

          <FormularioAnimal
            data={newAnimal || animal}
            handleSubmit2={handleUpdate}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default AnimalUser;
