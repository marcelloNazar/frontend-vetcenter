import React, { useState } from "react";
import { Veterinario } from "@/types/types";

import { useForm } from "react-hook-form";
import { VeterinarioResolver } from "@/utils/validator";

interface FormularioProprietarioProps {
  data?: Partial<Veterinario>;
  handleSubmit2: (data: Partial<Veterinario>) => void;
}

//Formulario para cadastro de proprietario
const VeterinarioForm: React.FC<FormularioProprietarioProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const formMethods = useForm({ resolver: VeterinarioResolver });
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = formMethods;

  const [username, setUsername] = useState(data.username || "");
  const [password, setPassword] = useState(data.username || "");
  const [role, setRole] = useState(data.nome || "USER");
  const [nome, setNome] = useState(data.nome || "");
  const [telefone, setTelefone] = useState(data.telefone || "");
  const [email, setEmail] = useState(data.email || "");
  const [crmv, setCrmv] = useState(data.crmv || "");

  const submitForm = (values: any) => {
    const veterinarioAtualizado = {
      username,
      password,
      role,
      nome,
      telefone,
      email,
      crmv,
    };
    handleSubmit2(veterinarioAtualizado);
  };
  return (
    <div className="modal-container">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <div className="w-full px-1">
          <input
            type="text"
            {...register("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de usuario"
            className="vet-input"
            required
          />
          {errors?.username?.message && (
            <p className="text-sm text-red-600">{errors?.username?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="password"
            {...register("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="vet-input"
            required
          />
          {errors?.password?.message && (
            <p className="text-sm text-red-600">{errors?.password?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <select
            className="vet-input "
            {...register("role")}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Permissões</option>
            <option value="USER">Veterinario</option>
            <option value="ADMIN">Administrador</option>
          </select>
          {errors?.role?.message && (
            <p className="text-sm text-red-600">{errors?.role?.message}</p>
          )}
        </div>
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
            type="email"
            {...register("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className="vet-input"
            required
          />
          {errors?.email?.message && (
            <p className="text-sm text-red-600">{errors?.email?.message}</p>
          )}
        </div>
        <div className="w-full px-1">
          <input
            type="text"
            {...register("crmv")}
            value={crmv}
            onChange={(e) => setCrmv(e.target.value)}
            placeholder="CRMV"
            className="vet-input"
            required
          />
          {errors?.crmv?.message && (
            <p className="text-sm text-red-600">{errors?.crmv?.message}</p>
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

export default VeterinarioForm;
