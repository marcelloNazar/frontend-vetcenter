import React from "react";
import { Animal as AnimalType } from "@/types/types";

type FormularioAnimalProps = {
  newAnimal: Partial<AnimalType>;
  setNewAnimal: React.Dispatch<React.SetStateAction<Partial<AnimalType>>>;
  handleSubmit: (event: React.FormEvent) => void;
};

//Formulario para cadastro de animais
const FormularioAnimal: React.FC<FormularioAnimalProps> = ({
  newAnimal,
  setNewAnimal,
  handleSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAnimal((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="body-modal">
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={newAnimal.nome || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="especie"
          type="text"
          placeholder="Espécie"
          value={newAnimal.especie || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="raca"
          type="text"
          placeholder="Raça"
          value={newAnimal.raca || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="sexo"
          type="text"
          placeholder="Sexo"
          value={newAnimal.sexo || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="peso"
          type="text"
          placeholder="Peso"
          value={newAnimal.peso || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="idade"
          type="text"
          placeholder="Idade"
          value={newAnimal.idade || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="cor"
          type="text"
          placeholder="Cor"
          value={newAnimal.cor || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <input
          name="temperamento"
          type="text"
          placeholder="Temperamento"
          value={newAnimal.temperamento || ""}
          onChange={handleChange}
          className="vet-input"
        />
        <label className="inline-flex items-center mt-3">
          <input
            name="castrado"
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={newAnimal.castrado || false}
            onChange={() =>
              setNewAnimal((prevState) => ({
                ...prevState,
                castrado: !newAnimal.castrado,
              }))
            }
          />
          <span className="ml-2 text-gray-700">Castrado</span>
        </label>
      </form>
      <button onClick={handleSubmit} type="submit" className="vet-botao">
        Adicionar
      </button>
    </div>
  );
};

export default FormularioAnimal;
