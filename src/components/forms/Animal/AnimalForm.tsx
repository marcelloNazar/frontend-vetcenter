import React from "react";
import { Animal as AnimalType } from "@/types/types";
import Input from "@/components/partials/Input";
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
    <div className="modal-container justify-between">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <Input
          type="text"
          {...register("nome")}
          placeholder="Nome"
          error={errors?.nome?.message}
        />
        <div className="w-full px-1">
          <select className="vet-input" {...register("especie")}>
            <option value="">ESPECIE</option>
            <option value="CACHORRO">CACHORRO</option>
            <option value="GATO">GATO</option>
          </select>
          {errors?.especie?.message && (
            <p className="text-xs text-red-600">{errors?.especie?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <select className="vet-input " {...register("sexo")}>
            <option value="">SEXO</option>
            <option value="MASCULINO">MACHO</option>
            <option value="FEMININO">FÊMEA</option>
          </select>
          {errors?.sexo?.message && (
            <p className="text-xs text-red-600">{errors?.sexo?.message}</p>
          )}
        </div>
        <div className="w-full p-1">
          <select className="vet-input " {...register("temperamento")}>
            <option value="">TEMPERAMENTO</option>
            <option value="DOCIL">DOCIL</option>
            <option value="AGRESSIVO">AGRESSIVO</option>
            <option value="AGITADO">AGITADO</option>
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
          type="date"
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
