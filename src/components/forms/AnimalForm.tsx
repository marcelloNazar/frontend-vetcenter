import React, { useState, useEffect } from "react";
import { Animal as AnimalType } from "@/types/types";
import { AnimalResolver } from "@/utils/validator";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";

type FormularioAnimalProps = {
  data?: Partial<AnimalType>;
  handleSubmit2: (data: Partial<AnimalType>) => void;
};

//Formulario para cadastro de animais
const FormularioAnimal: React.FC<FormularioAnimalProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: AnimalResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [nome, setNome] = useState(data.nome || "");
  const [especie, setEspecie] = useState(data.especie || "");
  const [raca, setRaca] = useState(data.raca || "");
  const [sexo, setSexo] = useState(data.sexo || "");
  const [peso, setPeso] = useState(data.peso || "");
  const [nascimento, setNascimento] = useState(data.nascimento || "");
  const [cor, setCor] = useState(data.cor || "");
  const [temperamento, setTemperamento] = useState(data.temperamento || "");
  const [castrado, setCastrado] = useState(data.castrado || false);

  useEffect(() => {
    if (data) {
      setNome(data.nome || "");
      setEspecie(data.especie || "");
      setRaca(data.raca || "");
      setSexo(data.sexo || "");
      setPeso(data.peso || "");
      setNascimento(data.nascimento || "");
      setCor(data.cor || "");
      setTemperamento(data.temperamento || "");
      setCastrado(data.castrado || false);
    }
  }, []);

  const submitForm = (values: any) => {
    const animalAtualizado = {
      nome,
      especie,
      raca,
      sexo,
      peso,
      nascimento,
      cor,
      temperamento,
      castrado,
    };
    handleSubmit2(animalAtualizado);
  };

  return (
    <div className="modal-container">
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(submitForm)} className="body-modal">
          <div className="w-full p-1">
            <input
              {...register("nome")}
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="vet-input"
              required
            />
            {errors?.nome?.message && (
              <p className="text-sm text-red-600">{errors?.nome?.message}</p>
            )}
          </div>
          <div className="w-full p-1">
            <select
              className="vet-input"
              {...register("especie")}
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              required
            >
              <option value="">Especie</option>
              <option value="CACHORRO">Cachorro</option>
              <option value="GATO">Gato</option>
            </select>
            {errors?.especie?.message && (
              <p className="text-sm text-red-600">{errors?.especie?.message}</p>
            )}
          </div>

          <div className="w-full p-1">
            <select
              className="vet-input "
              {...register("sexo")}
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              required
            >
              <option value="">Sexo</option>
              <option value="MASCULINO">Macho</option>
              <option value="FEMININO">Femea</option>
            </select>

            {errors?.sexo?.message && (
              <p className="text-sm text-red-600">{errors?.sexo?.message}</p>
            )}
          </div>
          <div className="w-full p-1">
            <select
              className="vet-input "
              {...register("temperamento")}
              value={temperamento}
              onChange={(e) => setTemperamento(e.target.value)}
              required
            >
              <option value="">Temperamento</option>
              <option value="DOCIL">Docil</option>
              <option value="AGRESSIVO">Agressivo</option>
              <option value="AGITADO">Agitado</option>
            </select>

            {errors?.temperamento?.message && (
              <p className="text-sm text-red-600">
                {errors?.temperamento?.message}
              </p>
            )}
          </div>
          <div className="w-full p-1">
            <input
              {...register("raca")}
              type="text"
              placeholder="Raça"
              value={raca}
              onChange={(e) => setRaca(e.target.value)}
              className="vet-input"
              required
            />

            {errors?.raca?.message && (
              <p className="text-sm text-red-600">{errors?.raca?.message}</p>
            )}
          </div>
          <div className="w-full p-1">
            <input
              {...register("peso")}
              type="text"
              placeholder="Peso"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              className="vet-input"
              required
            />

            {errors?.peso?.message && (
              <p className="text-sm text-red-600">{errors?.peso?.message}</p>
            )}
          </div>
          <div className="w-full p-1">
            <input
              {...register("cor")}
              type="text"
              placeholder="Cor"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
              className="vet-input"
              required
            />

            {errors?.cor?.message && (
              <p className="text-sm text-red-600">{errors?.cor?.message}</p>
            )}
          </div>
          <div className="w-full p-1">
            <label className="flex items-center justify-center">
              <input
                {...register("castrado")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600"
                checked={castrado || false}
                onChange={() => setCastrado(!castrado)}
              />
              <span className="ml-2 text-gray-700">Castrado</span>
            </label>
          </div>
          <div className="w-full p-1">
            <input
              {...register("nascimento")}
              type="date"
              placeholder="Cor"
              value={nascimento}
              onChange={(e) => setNascimento(e.target.value)}
              className="vet-input"
              required
            />
          </div>
        </form>
      </FormProvider>
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
