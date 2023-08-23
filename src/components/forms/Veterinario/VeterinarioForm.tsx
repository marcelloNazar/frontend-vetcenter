import { Veterinario } from "@/types/types";
import Input from "@/components/partials/Input";
import { useVeterinarioForm } from "./useVeterinarioForm";

interface FormularioProprietarioProps {
  data?: Partial<Veterinario>;
  handleSubmit2: (data: Partial<Veterinario>) => void;
}

//Formulario para cadastro de proprietario
const VeterinarioForm: React.FC<FormularioProprietarioProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const { submitForm, errors, register, handleSubmit } = useVeterinarioForm(
    data,
    handleSubmit2
  );

  return (
    <div className="modal-container  justify-between">
      <form onSubmit={handleSubmit(submitForm)} className="body-modal">
        <Input
          type="text"
          {...register("username")}
          placeholder="Nome de usuario"
          error={errors?.username?.message}
        />
        <Input
          type="password"
          {...register("password")}
          placeholder="Senha"
          error={errors?.password?.message}
        />
        <div className="w-full px-1">
          <select className="vet-input " {...register("role")}>
            <option value="">Permissões</option>
            <option value="USER">VETERINARIO</option>
            <option value="ADMIN">ADMINISTRADOR</option>
          </select>
          {errors?.role?.message && (
            <p className="text-sm text-red-600">{errors?.role?.message}</p>
          )}
        </div>
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
          {...register("email")}
          placeholder="E-mail"
          error={errors?.email?.message}
        />
        <Input
          type="text"
          {...register("crmv")}
          placeholder="CRMV"
          error={errors?.crmv?.message}
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

export default VeterinarioForm;
