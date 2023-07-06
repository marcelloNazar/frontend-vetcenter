import React from "react";
import { Owner } from "@/types/types";

interface FormularioProprietarioProps {
  newOwner: Partial<Owner>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

//Formulario para cadastro de proprietario
const FormularioProprietario: React.FC<FormularioProprietarioProps> = ({
  newOwner,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit} className="body-modal">
        <input
          type="text"
          name="nome"
          onChange={handleChange}
          placeholder="Nome"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="telefone"
          onChange={handleChange}
          placeholder="Telefone"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="cpf"
          onChange={handleChange}
          placeholder="CPF"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="nascimento"
          onChange={handleChange}
          placeholder="Data de Nascimento"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="sexo"
          onChange={handleChange}
          placeholder="Sexo"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="nomeMae"
          onChange={handleChange}
          placeholder="Nome da Mãe"
          className="vet-input"
          required
        />
        <h3>Endereço</h3>
        <input
          type="text"
          name="rua"
          onChange={handleChange}
          placeholder="Rua"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="bairro"
          onChange={handleChange}
          placeholder="Bairro"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="cep"
          onChange={handleChange}
          placeholder="CEP"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="cidade"
          onChange={handleChange}
          placeholder="Cidade"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="uf"
          onChange={handleChange}
          placeholder="UF"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="numero"
          onChange={handleChange}
          placeholder="Número"
          className="vet-input"
          required
        />
        <input
          type="text"
          name="complemento"
          onChange={handleChange}
          placeholder="Complemento"
          className="vet-input"
        />
      </form>
      <button onClick={handleSubmit} type="submit" className="vet-botao">
        Adicionar
      </button>
    </div>
  );
};

export default FormularioProprietario;
