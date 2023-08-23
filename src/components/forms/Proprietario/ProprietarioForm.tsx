import React from "react";
import { Owner } from "@/types/types";
import Input from "@/components/partials/Input";
import { usePropForm } from "./usePropForm";

interface FormularioProprietarioProps {
  data?: Partial<Owner>;
  handleSubmit2: (data: Partial<Owner>) => void;
}

//Formulario para cadastro de proprietario
const FormularioProprietario: React.FC<FormularioProprietarioProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const { submitForm, errors, register, handleSubmit } = usePropForm(
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
        <Input
          type="tel"
          {...register("telefone")}
          placeholder="(xx) xxxxx-xxxx"
          error={errors?.telefone?.message}
        />
        <Input
          type="text"
          {...register("cpf")}
          placeholder="CPF/CNPJ"
          error={errors?.cpf?.message}
        />

        <div className="w-full h-full px-1">
          <select className="vet-input" {...register("sexo")}>
            <option value="">Sexo</option>
            <option value="MASCULINO">MASCULINO</option>
            <option value="FEMININO">FEMININO</option>
          </select>

          {errors?.sexo?.message && (
            <p className="text-sm text-red-600">{errors?.sexo?.message}</p>
          )}
        </div>
        <Input
          {...register("nomeMae")}
          type="text"
          placeholder="Nome da Mãe"
          error={errors?.nomeMae?.message}
        />
        <Input
          {...register("nascimento")}
          type="date"
          placeholder="Nascimento"
          error={errors?.nascimento?.message}
        />
        <Input
          type="tel"
          {...register("telefone1")}
          placeholder="(xx) xxxxx-xxxx"
        />
        <Input
          type="tel"
          {...register("telefone2")}
          placeholder="(xx) xxxxx-xxxx"
        />
        <div></div>
        <h3>Endereço</h3>
        <div></div>
        <div></div>
        <Input
          type="text"
          {...register("endereco.rua")}
          placeholder="Rua"
          error={errors?.endereco?.rua?.message}
        />
        <Input
          type="text"
          {...register("endereco.bairro")}
          placeholder="Bairro"
          error={errors?.endereco?.bairro?.message}
        />
        <Input
          type="text"
          {...register("endereco.cep")}
          placeholder="CEP"
          error={errors?.endereco?.cep?.message}
        />
        <Input
          type="text"
          {...register("endereco.cidade")}
          placeholder="Cidade"
          error={errors?.endereco?.cidade?.message}
        />
        <Input
          type="text"
          {...register("endereco.uf")}
          placeholder="Estado"
          error={errors?.endereco?.uf?.message}
        />
        <Input
          type="text"
          {...register("endereco.numero")}
          placeholder="Número"
          error={errors?.endereco?.numero?.message}
        />
        <Input
          type="text"
          {...register("endereco.complemento")}
          placeholder="Complemento"
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

export default FormularioProprietario;
