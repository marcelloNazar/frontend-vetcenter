import React from "react";
import { Animal as AnimalType } from "@/types/types";
import { Input } from "../../partials/Input";
import { useAnimalForm } from "./useAnimalForm";

type FormularioAnimalProps = {
  data?: Partial<AnimalType>;
  handleSubmit2: (data: Partial<AnimalType>) => void;
};

//Formulario para cadastro de animais
const FormularioAnimal: React.FC<FormularioAnimalProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const { submitForm, errors, register, handleSubmit } = useAnimalForm(
    data,
    handleSubmit2
  );

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <Input
          type="text"
          {...register("nome")}
          placeholder="Nome"
          error={errors?.nome?.message}
        />
        <div className="w-full px-1">
          <select className="vet-input" {...register("especie")}>
            <option value="">Especie</option>
            <option value="CACHORRO">Cachorro</option>
            <option value="GATO">Gato</option>
          </select>
          {errors?.especie?.message && (
            <p className="text-xs text-red-600">{errors?.especie?.message}</p>
          )}
        </div>
        <div className="w-full p-1">
          <select className="vet-input " {...register("sexo")}>
            <option value="">Sexo</option>
            <option value="MASCULINO">Macho</option>
            <option value="FEMININO">Femea</option>
          </select>
          {errors?.sexo?.message && (
            <p className="text-xs text-red-600">{errors?.sexo?.message}</p>
          )}
        </div>
        <div className="w-full p-1">
          <select className="vet-input " {...register("temperamento")}>
            <option value="">Temperamento</option>
            <option value="DOCIL">Docil</option>
            <option value="AGRESSIVO">Agressivo</option>
            <option value="AGITADO">Agitado</option>
          </select>
          {errors?.temperamento?.message && (
            <p className="text-xs text-red-600">
              {errors?.temperamento?.message}
            </p>
          )}
        </div>
        <Input
          type="text"
          {...register("raca")}
          placeholder="Raça"
          error={errors?.raca?.message}
        />
        <Input
          type="text"
          {...register("peso")}
          placeholder="Peso"
          error={errors?.peso?.message}
        />
        <Input
          type="text"
          {...register("cor")}
          placeholder="Cor"
          error={errors?.cor?.message}
        />
        <div className="w-full p-1">
          <label className="flex items-center justify-center">
            <input
              {...register("castrado")}
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
            />
            <span className="ml-2 text-gray-700">Castrado</span>
          </label>
        </div>
        <Input
          type="text"
          {...register("nascimento")}
          error={errors?.nascimento?.message}
        />
      </form>
      <button
        onClick={handleSubmit(submitForm)}
        type="submit"
        className="vet-botao"
      >
        Adicionar
      </button>
    </div>
  );
};

export default FormularioAnimal;
