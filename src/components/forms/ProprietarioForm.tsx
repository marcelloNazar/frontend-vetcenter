import React, { useState, useEffect } from "react";
import { Owner } from "@/types/types";
import { useForm } from "react-hook-form";
import { ProprietarioResolver } from "@/utils/validator";

interface FormularioProprietarioProps {
  data?: Partial<Owner>;
  handleSubmit2: (data: Partial<Owner>) => void;
}

//Formulario para cadastro de proprietario
const FormularioProprietario: React.FC<FormularioProprietarioProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: ProprietarioResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [nome, setNome] = useState(data.nome || "");
  const [telefone, setTelefone] = useState(data.telefone || "");
  const [telefone1, setTelefone1] = useState(data.telefone1 || "");
  const [telefone2, setTelefone2] = useState(data.telefone2 || "");
  const [cpf, setCpf] = useState(data.cpf || "");
  const [nascimento, setNascimento] = useState(data.nascimento || "");
  const [nomeMae, setNomeMae] = useState(data.nomeMae || "");
  const [sexo, setSexo] = useState(data.sexo || "");
  const [rua, setRua] = useState(data.endereco?.rua || "");
  const [bairro, setBairro] = useState(data.endereco?.bairro || "");
  const [cep, setCep] = useState(data.nome || "");
  const [cidade, setCidade] = useState(data.endereco?.cidade || "");
  const [uf, setUf] = useState(data.endereco?.uf || "");
  const [numero, setNumero] = useState(data.endereco?.numero || "");
  const [complemento, setComplemento] = useState(
    data.endereco?.complemento || ""
  );

  useEffect(() => {
    if (data) {
      setNome(data.nome || "");
      setTelefone(data.telefone || "");
      setCpf(data.cpf || "");
      setNascimento(data.nascimento || "");
      setNomeMae(data.nomeMae || "");
      setSexo(data.sexo || "");
      setRua(data.endereco?.rua || "");
      setBairro(data.endereco?.bairro || "");
      setCep(data.endereco?.cep || "");
      setCidade(data.endereco?.cidade || "");
      setUf(data.endereco?.uf || "");
      setNumero(data.endereco?.numero || "");
      setComplemento(data.endereco?.complemento || "");
    }
  }, []);

  const submitForm = (values: any) => {
    const proprietarioAtualizado = {
      nome,
      telefone,
      telefone1,
      telefone2,
      cpf,
      nascimento,
      nomeMae,
      sexo,
      endereco: { rua, bairro, cep, cidade, uf, numero, complemento },
    };
    handleSubmit2(proprietarioAtualizado);
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
            {...register("telefone")}
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            className="vet-input"
            required
          />
          {errors?.telefone?.message && (
            <p className="text-sm text-red-600">{errors?.telefone?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("cpf")}
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
            className="vet-input"
            required
          />
          {errors?.cpf?.message && (
            <p className="text-sm text-red-600">{errors?.cpf?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("telefone1")}
            value={telefone1}
            onChange={(e) => setTelefone1(e.target.value)}
            placeholder="Telefone 2"
            className="vet-input"
          />
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("telefone2")}
            value={telefone2}
            onChange={(e) => setTelefone2(e.target.value)}
            placeholder="Telefone 3"
            className="vet-input"
          />
        </div>

        <div className="w-full px-1">
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
        <div className="w-full px-1">
          <select
            className="vet-input "
            {...register("sexo")}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Sexo</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>

          {errors?.sexo?.message && (
            <p className="text-sm text-red-600">{errors?.sexo?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("nomeMae")}
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
            placeholder="Nome da Mãe"
            className="vet-input"
            required
          />
          {errors?.nomeMae?.message && (
            <p className="text-sm text-red-600">{errors?.nomeMae?.message}</p>
          )}
        </div>
        <div></div>
        <h3>Endereço</h3>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("rua")}
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            placeholder="Rua"
            className="vet-input"
            required
          />
          {errors?.rua?.message && (
            <p className="text-sm text-red-600">{errors?.rua?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("bairro")}
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Bairro"
            className="vet-input"
            required
          />
          {errors?.bairro?.message && (
            <p className="text-sm text-red-600">{errors?.bairro?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("cep")}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="CEP"
            className="vet-input"
            required
          />
          {errors?.cep?.message && (
            <p className="text-sm text-red-600">{errors?.cep?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("cidade")}
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Cidade"
            className="vet-input"
            required
          />
          {errors?.cidade?.message && (
            <p className="text-sm text-red-600">{errors?.cidade?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("uf")}
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            placeholder="Estado"
            className="vet-input"
            required
          />
          {errors?.uf?.message && (
            <p className="text-sm text-red-600">{errors?.uf?.message}</p>
          )}
        </div>

        <div className="w-full px-1">
          <input
            type="text"
            {...register("numero")}
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Número"
            className="vet-input"
            required
          />
          {errors?.numero?.message && (
            <p className="text-sm text-red-600">{errors?.numero?.message}</p>
          )}
        </div>

        <div className="w-full px-1">
          <input
            type="text"
            {...register("complemento")}
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            placeholder="Complemento"
            className="vet-input"
          />
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

export default FormularioProprietario;
