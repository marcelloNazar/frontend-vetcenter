import React from "react";
import { Produto } from "@/types/types";
import Input from "@/components/partials/Input";
import { useProdServForm } from "./useProdServForm";

interface FormularioProdServProps {
  data?: Partial<Produto>;
  handleSubmit2: (data: Partial<Produto>) => void;
}

const ProdServForm: React.FC<FormularioProdServProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const {
    submitForm,
    errors,
    register,
    handleSubmit,
    handleValorChange,
    setValor,
    valor,
  } = useProdServForm(data, handleSubmit2);

  return (
    <div className="modal-container justify-between">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="body-modal grid-cols-1"
      >
        <Input
          type="text"
          {...register("nome")}
          placeholder="Nome"
          error={errors?.nome?.message}
        />
        <Input type="text" {...register("descricao")} placeholder="Descrição" />
        <Input
          type="text"
          {...register("valor")}
          placeholder="Valor"
          value={valor}
          onChange={(e) => handleValorChange(e.target.value)}
          error={errors?.valor?.message}
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

export default ProdServForm;
