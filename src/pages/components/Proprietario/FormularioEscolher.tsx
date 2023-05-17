import { useState, useEffect } from "react";

type Proprietario = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
};

type FormularioEscolherProps = {
  onClose: (proprietario: Proprietario) => void;
};

const FormularioEscolher = ({ onClose }: FormularioEscolherProps) => {
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/proprietario");
        if (response.ok) {
          const data = await response.json();
          if (data.content && Array.isArray(data.content)) {
            setProprietarios(data.content);
          } else {
            console.error(
              'A resposta da API não contém um array "content":',
              data
            );
          }
        } else {
          // Trate os erros retornados pela API aqui
          console.error("Erro ao buscar proprietários");
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    fetchData();
  }, []);

  const handleProprietarioClick = (proprietario: Proprietario) => {
    onClose(proprietario);
  };

  const filteredProprietarios = proprietarios.filter((proprietario) =>
    proprietario.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-2xl font-bold mb-4">Escolher Proprietário</h1>
      <input
        type="text"
        placeholder="Pesquisar por nome"
        className="px-3 py-2 border border-gray-300 rounded w-full"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col space-y-4 w-full h-48 overflow-y-auto">
        {filteredProprietarios.map((proprietario) => (
          <div
            key={proprietario.id}
            className="w-full border border-gray-300 p-2 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => handleProprietarioClick(proprietario)}
          >
            <p>Nome: {proprietario.nome}</p>
            <p>CPF: {proprietario.cpf}</p>
            <p>Telefone: {proprietario.telefone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormularioEscolher;
