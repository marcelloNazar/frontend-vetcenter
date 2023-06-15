import React, { useState, useContext } from "react";
import ReactModal from "react-modal";
import AnamneseForm from "./forms/AnamneseForm";
import VeterinarioList from "./forms/VeterinarioList";
import { customStyles } from "@/styles/styles";
import { Veterinario } from "@/types";
import { AnimalContext } from "../contexts/AnimalContext";
import HeaderModal from "./partials/HeaderModal";

const Adicionar: React.FC = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [selectedVeterinario, setSelectedVeterinario] =
    useState<Veterinario | null>(null);
  const { animal } = useContext(AnimalContext);

  const handleClick = (formName: string): void => {
    setSelectedForm(formName);
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const handleSelectVeterinario = (): void => {
    setSelectedForm("Veterinario");
    setIsOpen(true);
  };

  const handleAnamneseClick = (): void => {
    if (!animal) {
      alert("Selecione um animal!");
    } else if (!selectedVeterinario) {
      alert("Selecione um veterinário!");
    } else {
      setSelectedForm("Anamnese");
      setIsOpen(true);
    }
  };

  const handleTrocarVeterinario = (): void => {
    setSelectedForm("Veterinario");
    setIsOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="vet-container flex-row h-auto p-2 justify-between overflow-hidden">
        <div className="flex flex-row items-center ">
          {selectedVeterinario && (
            <>
              <h2 className="mx-4 text-xl uppercase">
                {selectedVeterinario.nome}
              </h2>
              <div className="">
                Especialidade: {selectedVeterinario.especialidade}
              </div>
            </>
          )}
        </div>
        <button className="vet-botao" onClick={handleSelectVeterinario}>
          {selectedVeterinario
            ? "Trocar Veterinario"
            : "Selecionar Veterinario"}
        </button>
      </div>
      <div className=" justify-center items-center h-full w-full grid grid-cols-3 gap-4 pt-4 mb-1 ">
        <button
          className="hist-botao border-none"
          onClick={handleAnamneseClick}
        >
          Anamnese
        </button>
        <button
          className="hist-botao border-none"
          onClick={handleAnamneseClick}
        >
          Internação
        </button>
        <button
          className="hist-botao border-none "
          onClick={handleAnamneseClick}
        >
          Vacina
        </button>
        <button
          className="hist-botao border-none "
          onClick={handleAnamneseClick}
        >
          Cirurgia
        </button>
        <button
          className="hist-botao border-none "
          onClick={handleAnamneseClick}
        >
          Exame
        </button>
        <button
          className="hist-botao border-none "
          onClick={handleAnamneseClick}
        >
          Receita
        </button>
        <button
          className="hist-botao border-none "
          onClick={handleAnamneseClick}
        >
          Estetica
        </button>
      </div>

      {/* Botões restantes */}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <HeaderModal selected={`${selectedForm}`} closeModal={closeModal} />
        {selectedForm === "Veterinario" && (
          <VeterinarioList
            setSelectedVeterinario={setSelectedVeterinario}
            closeModal={closeModal}
          />
        )}
        {selectedForm === "Anamnese" && selectedVeterinario && animal && (
          <AnamneseForm
            selectedVeterinario={selectedVeterinario}
            animal={animal}
            onClose={closeModal}
          />
        )}

        {/* Renderize os outros componentes de formulários aqui */}
      </ReactModal>
    </div>
  );
};

export default Adicionar;
