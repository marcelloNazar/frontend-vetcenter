type FormularioAdicionarProps = {
  onClose: () => void;
};

const FormularioAdicionar = ({ onClose }: FormularioAdicionarProps) => {
  const handleSubmit = () => {
    // Adicione a lógica para adicionar o proprietário
    onClose();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold mb-4">Adicionar Proprietário</h2>
      <input
        className="border border-gray-300 rounded p-2 w-full"
        type="text"
        placeholder="Nome"
      />
      <input
        className="border border-gray-300 rounded p-2 w-full"
        type="email"
        placeholder="Email"
      />
      <input
        className="border border-gray-300 rounded p-2 w-full"
        type="text"
        placeholder="CPF"
      />
      <input
        className="border border-gray-300 rounded p-2 w-full"
        type="tel"
        placeholder="Telefone"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Adicionar
      </button>
    </div>
  );
};

export default FormularioAdicionar;
