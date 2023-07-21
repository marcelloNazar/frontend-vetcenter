import { useState, useEffect } from "react";
import React from "react";
import { Produto } from "@/types/types";
import { useForm } from "react-hook-form";
import { ProdServResolver } from "@/utils/validator";

interface FormularioProdServProps {
  data?: Partial<Produto>;
  handleSubmit2: (data: Partial<Produto>) => void;
}

const ProdServForm: React.FC<FormularioProdServProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: ProdServResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [nome, setNome] = useState(data.nome || "");
  const [descricao, setDescricao] = useState(data.descricao || "");
  const [valor, setValor] = useState(
    data.valor ? data.valor.toString().replace(".", ",") : ""
  );

  useEffect(() => {
    if (data) {
      setNome(data.nome || "");
      setDescricao(data.descricao || "");
      setValor(data.valor ? data.valor.toString().replace(".", ",") : "");
    }
  }, []);

  const submitForm = (values: any) => {
    handleSubmit2({ nome, descricao, valor: Number(valor.replace(",", ".")) });
  };

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValor = e.target.value;
    const decimalPart = inputValor.split(",")[1];

    if (
      inputValor === "" ||
      (!isNaN(Number(inputValor.replace(",", "."))) &&
        (!decimalPart || decimalPart.length <= 2))
    ) {
      setValor(inputValor);
    }
  };

  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <div className="w-full px-1">
          <input
            type="text"
            {...register("nome")}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="vet-input"
            required
          />

          {errors?.nome?.message && (
            <p className="text-sm text-red-600">{errors?.nome?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("descricao")}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição"
            className="vet-input"
            required
          />
          {errors?.descricao?.message && (
            <p className="text-sm text-red-600">{errors?.descricao?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("valor")}
            value={valor}
            onChange={handleValorChange}
            placeholder="Valor"
            className="vet-input"
            required
          />
          {errors?.valor?.message && (
            <p className="text-sm text-red-600">{errors?.valor?.message}</p>
          )}
        </div>
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

export default ProdServForm;
