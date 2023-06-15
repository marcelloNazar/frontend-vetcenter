import React, { useState, useEffect, useContext } from "react";
import ReactModal from "react-modal";
import { useSelectedOwner } from "../contexts/SelectedOwnerContext";
import { Animal as AnimalType } from "@/types";
import { customStyles } from "@/styles/styles";
import FormularioAnimal from "./forms/AnimalForm";
import { AnimalContext } from "../contexts/AnimalContext";
import HeaderModal from "./partials/HeaderModal";

const Animal: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<AnimalType>>({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const { animal, setAnimal } = useContext(AnimalContext);

  const { selectedOwner } = useSelectedOwner();

  useEffect(() => {
    if (selectedOwner) {
      fetch(`http://localhost:8080/animal/proprietario/${selectedOwner.id}`)
        .then((response) => response.json())
        .then((data) => setAnimals(data));
    }
  }, [selectedOwner]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedOwner) {
      fetch("http://localhost:8080/animal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAnimal,
          proprietarioId: selectedOwner.id,
        }),
      })
        .then((response) => {
          if (response.ok) {
            fetch(
              `http://localhost:8080/animal/proprietario/${selectedOwner.id}`
            )
              .then((response) => response.json())
              .then((data) => setAnimals(data));

            closeModal();
          } else {
            console.error("Erro ao adicionar o animal");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  return (
    <div className="vet-container overflow-hidden">
      {!selectedOwner ? (
        <h1>Selecione o Proprietario</h1>
      ) : (
        <div className="body-container">
          {animal === null ? (
            <>
              <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Animal Modal"
              >
                <div className="modal-container">
                  <HeaderModal
                    selected="Adicione os dados do animal"
                    closeModal={closeModal}
                  />

                  <FormularioAnimal
                    newAnimal={newAnimal}
                    setNewAnimal={setNewAnimal}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </ReactModal>
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
                      className="item-list"
                      onClick={() => setAnimal(animal)}
                    >
                      <h2 className="">{animal.nome}</h2>
                      <p className="">{animal.especie}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="w-full h-full overflow-hidden">
              <div className="header-container">
                <h2 className="text-xl uppercase">{animal.nome}</h2>
                <button className="vet-botao" onClick={() => setAnimal(null)}>
                  Voltar
                </button>
              </div>
              <div className="grid grid-cols-3  w-full gap-1">
                <div className="data-container">{animal.especie}</div>
                <div className="data-container">Raça: {animal.raca}</div>
                <div className="data-container">Sexo: {animal.sexo}</div>
                <div className="data-container">Peso: {animal.peso}</div>
                <div className="data-container">Idade: {animal.idade}</div>
                <div className="data-container">Cor: {animal.cor}</div>
                <div className="data-container">{animal.temperamento}</div>
                <div className="data-container">
                  Castrado: {animal.castrado ? "Sim" : "Não"}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Animal;
