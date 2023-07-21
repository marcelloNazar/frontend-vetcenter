import { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import ReactModal from "react-modal";
import { Animal as AnimalType } from "@/types/types";
import { customStyles } from "@/styles/styles";
import FormularioAnimal from "../forms/AnimalForm";
import HeaderModal from "../partials/HeaderModal";
import http from "@/utils/http";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const AnimalUser: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<AnimalType>>({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const { animal, proprietario, setAnimal, setAtendimento } = useAtendimento();

  useEffect(() => {
    if (proprietario) {
      fetchAnimais();
    }
  }, [proprietario]);

  useEffect(() => {
    if (animal) {
      handleClick(animal);
    }
  }, [animal]);

  const fetchAnimais = () => {
    http
      .get(`animal/proprietario/${proprietario?.id}`)
      .then((r) => setAnimals(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const handleSubmit = (data: Partial<AnimalType>) => {
    if (proprietario) {
      const animalData = {
        ...data,
        proprietarioId: proprietario.id,
      };
      console.log(animalData);
      http
        .post("animal", animalData)
        .then((response) => {
          if (response.status === 201) {
            fetchAnimais();
            closeModal();
            setAnimal(null);
            setAnimal(response.data);
            setNewAnimal(response.data);
          } else {
            alert("Erro ao adicionar o animal");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  const handleUpdate = (data: Partial<AnimalType>) => {
    http
      .put(`animal/${animal?.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          fetchAnimais();
          setAnimal(null);
          setAnimal(response.data);
          setNewAnimal(response.data);
          closeUpdateModal();
        } else {
          alert("Erro ao adicionar o animal");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleVoltar = () => {
    setAnimal(null);
    setAtendimento(null);
  };
  const handleClick = (animal: AnimalType) => {
    setAnimal(animal);
    setNewAnimal(animal);
  };

  return (
    <div className="vet-container overflow-hidden">
      {!animal && proprietario && (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl ">Animais</h2>
            <button className="vet-botao" onClick={openModal}>
              Adicionar Animal
            </button>
          </div>
          <div className="overflow-auto w-full h-2/3">
            {animals.length === 0 ? (
              <div>proprietario não possui animal cadastrado</div>
            ) : (
              animals.map((animal, index) => (
                <div
                  key={index}
                  className="item-list dark:bg-gray-950"
                  onClick={() => handleClick(animal)}
                >
                  <div className="flex justify-between w-full mr-8">
                    <h2 className="">{animal.nome}</h2>
                    <p className="">{animal.especie}</p>
                  </div>
                  <div className="flex justify-between w-16 ">
                    <button>
                      <PencilSquareIcon className="h-5 " />
                    </button>
                    <button>
                      <TrashIcon className="h-5 " />
                    </button>
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
            <div className="data-container">
              <div>Peso:</div> {animal.peso} Kg
            </div>
            <div className="data-container">
              <div>Idade:</div> {animal.idade}
            </div>
            <div className="data-container">
              <div>Cor</div> {animal.cor}
            </div>
            <div className="data-container">
              <div>Temperamento</div>
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
