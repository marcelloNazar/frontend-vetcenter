import { useState } from "react";
import Modal from "./Modal";
import FormularioAdicionar from "./FormularioAdicionar";
import FormularioEscolher from "./FormularioEscolher";

type Proprietario = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
};
interface ProprietarioProps {
  proprietario: Proprietario | null;
  onClose?: () => void;
}

const Proprietario = () => {
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEscolher, setModalEscolher] = useState(false);
  const [proprietario, setProprietario] = useState<Proprietario | null>(null);

  const handleOpenModalAdicionar = () => {
    setModalAdicionar(true);
  };

  const handleCloseModalAdicionar = () => {
    setModalAdicionar(false);
  };

  const handleOpenModalEscolher = () => {
    setModalEscolher(true);
  };

  const handleCloseModalEscolher = (selectedProprietario: Proprietario) => {
    setProprietario(selectedProprietario);
    setModalEscolher(false);
  };

  const handleCloseProprietario = () => {
    setProprietario(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {!proprietario ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Proprietário</h1>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenModalAdicionar}
            >
              Adicionar
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenModalEscolher}
            >
              Escolher
            </button>
          </div>
        </>
      ) : (
        <div className="relative mt-4 w-full flex flex-col items-center space-y-4">
          <button
            className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCloseProprietario}
          >
            Voltar
          </button>
          <p className="text-lg font-bold">Proprietário selecionado:</p>
          <p>Nome: {proprietario.nome}</p>
          <p>CPF: {proprietario.cpf}</p>
          <p>Telefone: {proprietario.telefone}</p>
        </div>
      )}
      {modalAdicionar && (
        <Modal onClose={handleCloseModalAdicionar}>
          <FormularioAdicionar onClose={handleCloseModalAdicionar} />
        </Modal>
      )}
      {modalEscolher && (
        <Modal onClose={handleCloseModalEscolher}>
          <FormularioEscolher onClose={handleCloseModalEscolher} />
        </Modal>
      )}
    </div>
  );
};

export default Proprietario;
