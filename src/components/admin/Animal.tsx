import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { useSelectedOwner } from "../../contexts/SelectedOwnerContext";
import { Animal as AnimalType } from "@/types/types";
import { customStyles } from "@/styles/styles";
import FormularioAnimal from "../forms/AnimalForm";
import { AnimalContext } from "../../contexts/AnimalContext";
import HeaderModal from "../partials/HeaderModal";
import http from "@/utils/http";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Animal: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<AnimalType>>({});
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(false);

  const { animal, setAnimal } = useContext(AnimalContext);

  const { selectedOwner } = useSelectedOwner();

  useEffect(() => {
    if (selectedOwner) {
      fetchAnimais();
    }
  }, [selectedOwner]);

  const fetchAnimais = () => {
    http
      .get(`animal/proprietario/${selectedOwner?.id}`)
      .then((r) => setAnimals(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const handleAnimalClick = (animal: AnimalType) => {
    setAnimal(animal);
    setNewAnimal(animal);
    setEditingAnimal(true);
  };

  const handleSubmit = (data: Partial<AnimalType>) => {
    if (selectedOwner) {
      const animalData = {
        ...data,
        proprietarioId: selectedOwner.id,
      };
      console.log(animalData);
      http
        .post("animal", animalData)
        .then((response) => {
          if (response.status === 201) {
            fetchAnimais();
            closeAddModal();
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
    const animalData = {
      ...data,
    };
    http
      .put(`animal/${animal?.id}`, animalData)
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

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const openUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  function formatarData(animal: AnimalType): string | undefined {
    if (animal.data) {
      const dataObj = new Date(animal.data);

      if (isNaN(dataObj.getTime())) {
        return undefined; // Retorna undefined se a data não for válida
      }

      const dia = dataObj.getDate();
      const mes = dataObj.getMonth() + 1; // Lembrando que os meses são indexados em 0 (janeiro = 0, fevereiro = 1, etc.)
      const ano = dataObj.getFullYear();

      return `${dia}/${mes}/${ano}`;
    }

    return undefined;
  }

  return (
    <div className="vet-container overflow-hidden">
      {!selectedOwner ? (
        <h1>Selecione o Proprietario</h1>
      ) : (
        <div className="body-container">
          {animal ? (
            <div className="w-full h-full overflow-hidden">
              <div className="header-container">
                <h2 className="text-xl uppercase">{animal.nome}</h2>
                <div>
                  <button className="vet-botao" onClick={() => setAnimal(null)}>
                    Voltar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3  w-full gap-1">
                <div className="data-container">{animal.especie}</div>
                <div className="data-container">Raça: {animal.raca}</div>
                <div className="data-container">Sexo: {animal.sexo}</div>
                <div className="data-container">Idade: {animal.idade}</div>
                <div className="data-container">Cor: {animal.cor}</div>
                <div className="data-container">{animal.temperamento}</div>
                <div className="data-container">
                  Castrado: {animal.castrado ? "Sim" : "Não"}
                </div>
                <div className="data-container">
                  Peso: {animal.peso} em {formatarData(animal)}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="header-container">
                <h2 className="text-xl ">Animais</h2>
                <button className="vet-botao" onClick={openAddModal}>
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
                      onClick={() => handleAnimalClick(animal)}
                    >
                      <div className="flex justify-between w-full mr-8">
                        <h2 className="">{animal.nome}</h2>
                        <p className="">{animal.especie}</p>
                      </div>
                      <div className="flex justify-between w-16 ">
                        <button>
                          <TrashIcon className="h-5 " />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Modal
                isOpen={addModalIsOpen}
                onRequestClose={closeAddModal}
                style={customStyles}
              >
                <div className="modal-container">
                  <HeaderModal
                    selected="Adicione os dados do animal"
                    closeModal={closeAddModal}
                  />

                  <FormularioAnimal handleSubmit={handleSubmit} />
                </div>
              </Modal>
              <Modal
                isOpen={updateModalIsOpen}
                onRequestClose={() => setUpdateModalIsOpen(false)}
                style={customStyles}
              >
                <div className="modal-container">
                  <HeaderModal
                    selected="Adicione os dados do animal"
                    closeModal={closeUpdateModal}
                  />
                  <FormularioAnimal
                    data={newAnimal}
                    handleSubmit={handleUpdate}
                  />
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Animal;
