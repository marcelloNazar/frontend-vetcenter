import React, { useState, useEffect } from "react";
import Modal from "./forms/Modal";

const ProdServ: React.FC = () => {
  const [prodModalIsOpen, setProdModalIsOpen] = useState(false);
  const [servModalIsOpen, setServModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [selectedProdutos, setSelectedProdutos] = useState<any[]>([]);
  const [selectedServicos, setSelectedServicos] = useState<any[]>([]);

  const updateProdutos = () => {
    fetch("http://localhost:8080/produto")
      .then((response) => response.json())
      .then((data) => setProdutos(data.content));
  };

  const updateServicos = () => {
    fetch("http://localhost:8080/servico")
      .then((response) => response.json())
      .then((data) => setServicos(data.content));
  };

  useEffect(() => {
    updateProdutos();
    updateServicos();
  }, []);

  const openProdModal = () => {
    setProdModalIsOpen(true);
  };

  const openServModal = () => {
    setServModalIsOpen(true);
  };

  const handleProdClick = (produto: any) => {
    setSelectedProdutos([...selectedProdutos, produto]);
    setProdModalIsOpen(false);
  };

  const handleServClick = (servico: any) => {
    setSelectedServicos([...selectedServicos, servico]);
    setServModalIsOpen(false);
  };

  const total =
    selectedProdutos.reduce((acc, prod) => acc + prod.valor, 0) +
    selectedServicos.reduce((acc, serv) => acc + serv.valor, 0);

  return (
    <div className="vet-container bg-white">
      <h1>Atendimento</h1>
      <div className="flex">
        <button className="vet-botao" onClick={openProdModal}>
          Produto
        </button>
        <button className="vet-botao" onClick={openServModal}>
          Serviço
        </button>
      </div>
      <div
        className="mt-4 space-y-2 bg-white w-full overflow-y-auto flex-grow rounded p-2 border border-gray-700"
        style={{ maxHeight: "70%" }}
      >
        {selectedProdutos.map((produto: any, index: number) => (
          <div
            key={index}
            className="flex justify-between bg-gray-200 p-2 rounded"
          >
            <p>{produto.nome}</p>
            <p>R$ {produto.valor.toFixed(2)}</p>
          </div>
        ))}
        {selectedServicos.map((servico: any, index: number) => (
          <div
            key={index}
            className="flex justify-between bg-gray-200 p-2 rounded"
          >
            <p>{servico.nome}</p>
            <p>R$ {servico.valor.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        <button className="vet-botao">Finalizar</button>
        <p className="text-lg">R$ {total.toFixed(2)}</p>
      </div>
      <Modal
        isOpen={prodModalIsOpen}
        onRequestClose={() => setProdModalIsOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        items={produtos}
        onItemClick={handleProdClick}
        title="Selecionar Produto"
        searchPlaceholder="Pesquisar produto..."
        postUrl="http://localhost:8080/produto"
        onUpdate={updateProdutos}
      />

      <Modal
        isOpen={servModalIsOpen}
        onRequestClose={() => setServModalIsOpen(false)}
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        items={servicos}
        onItemClick={handleServClick}
        title="Selecionar Serviço"
        searchPlaceholder="Pesquisar serviço..."
        postUrl="http://localhost:8080/servico"
        onUpdate={updateServicos}
      />
    </div>
  );
};

export default ProdServ;
