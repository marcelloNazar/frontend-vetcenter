import { useAtendimento } from "@/contexts/AtendimentoContext";

//Componente do proprietario para a screen do veterinario
const PropUser: React.FC = () => {
  const { proprietario } = useAtendimento();

  return (
    <div className="vet-container overflow-hidden">
      {proprietario ? (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{proprietario.nome}</h2>
          </div>
          <div className="grid grid-cols-2 gap-1 mr-12">
            <div className="data-container">
              <div>Telefone:</div>
              <div className="">{proprietario.telefone}</div>
            </div>

            <div className="data-container ">
              <div>CPF:</div>
              <div>{proprietario.cpf}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{proprietario.nascimento}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{proprietario.nomeMae}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{proprietario.sexo}</div>
            </div>
            <div className="data-container ">
              <div>Status:</div>
              <div>Cliente Bom</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1>Selecione o Atendimento</h1>
        </div>
      )}
    </div>
  );
};

export default PropUser;
