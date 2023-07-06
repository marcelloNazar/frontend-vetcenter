import { useAtendimento } from "@/contexts/AtendimentoContext";

//Componente do animal para a screen do veterinario
const AnimalUser: React.FC = () => {
  const { animal } = useAtendimento();

  return (
    <div className="vet-container overflow-hidden">
      {!animal ? (
        <h1>Selecione o Atendimento</h1>
      ) : (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{animal.nome}</h2>
          </div>
          <div className="grid grid-cols-3 w-full gap-1">
            <div className="data-container w-full">Especie{animal.especie}</div>
            <div className="data-container w-full">Raça: {animal.raca}</div>
            <div className="data-container w-full">Sexo: {animal.sexo}</div>
            <div className="data-container w-full">Peso: {animal.peso}</div>
            <div className="data-container w-full">Idade: {animal.idade}</div>
            <div className="data-container">Cor: {animal.cor}</div>
            <div className="data-container">{animal.temperamento}</div>
            <div className="data-container">
              Castrado: {animal.castrado ? "Sim" : "Não"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimalUser;
