import React, { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import http from "@/utils/http";
import ReactModal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";
import { Produto, Servico } from "@/types/types";

//Componente para o veterinario adicionar produtos e serviços ao atendimento
const ProdServ: React.FC = () => {
  const [prodModalIsOpen, setProdModalIsOpen] = useState(false);
  const [servModalIsOpen, setServModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
  const [selectedServicos, setSelectedServicos] = useState<Servico[]>([]);

  const { resetAtendimento, atendimento, removeAtendimento } = useAtendimento();

  const fetchProdutos = () => {
    http
      .get("produto")
      .then((r) => setProdutos(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const fetchServicos = () => {
    http
      .get("servico")
      .then((r) => setServicos(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  useEffect(() => {
    fetchProdutos();
    fetchServicos();
  }, []);

  const openProdModal = () => {
    setProdModalIsOpen(true);
  };

  const openServModal = () => {
    setServModalIsOpen(true);
  };

  const handleProdClick = (produto: Produto) => {
    setSelectedProdutos([...selectedProdutos, produto]);
    setProdModalIsOpen(false);
  };

  const handleServClick = (servico: Servico) => {
    setSelectedServicos([...selectedServicos, servico]);
    setServModalIsOpen(false);
  };

  const handleBackClick = () => {
    resetAtendimento();
  };

  const handleQuantityChange = (
    index: number,
    type: "produto" | "servico",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(event.target.value);

    if (type === "produto") {
      setSelectedProdutos((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, quantidade: newQuantity } : item
        )
      );
    } else {
      setSelectedServicos((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, quantidade: newQuantity } : item
        )
      );
    }
  };

  const handleFinalizarClick = () => {
    const atendimentoProdutos = selectedProdutos.map(({ id, quantidade }) => ({
      produtoId: id,
      quantidade,
    }));

    const atendimentoServicos = selectedServicos.map(({ id, quantidade }) => ({
      servicoId: id,
      quantidade,
    }));

    http
      .put(`atendimento/${atendimento?.id}`, {
        atendimentoProdutos,
        atendimentoServicos,
      })
      .then((r) => {
        removeAtendimento();
      })
      .catch((e) => console.error("Error:", e));
  };

  const total =
    selectedProdutos.reduce((acc, prod) => acc + prod.valor, 0) +
    selectedServicos.reduce((acc, serv) => acc + serv.valor, 0);

  // Modais
  const renderProdModal = () => (
    <ReactModal
      isOpen={prodModalIsOpen}
      onRequestClose={() => setProdModalIsOpen(false)}
      style={customStyles}
    >
      <HeaderModal
        selected="Adicionar Produto"
        closeModal={() => setProdModalIsOpen(false)}
      />
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white border rounded"
      />
      {produtos
        .filter((produto) =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((produto: Produto) => (
          <div
            className="data-container  text-black border-t border-b"
            key={produto.id}
          >
            <p>{produto.nome}</p>
            <p>R$ {produto.valor}</p>
            <button onClick={() => handleProdClick(produto)}>Adicionar</button>
          </div>
        ))}
    </ReactModal>
  );

  const renderServModal = () => (
    <ReactModal
      isOpen={servModalIsOpen}
      onRequestClose={() => setServModalIsOpen(false)}
      style={customStyles}
    >
      <HeaderModal
        selected="Adicionar Serviço"
        closeModal={() => setServModalIsOpen(false)}
      />
      <input
        type="text"
        placeholder="Pesquisar serviços..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white border rounded"
      />
      {servicos
        .filter((servico) =>
          servico.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((servico: Servico) => (
          <div
            className="data-container text-black border-t border-b"
            key={servico.id}
          >
            <p>{servico.nome}</p>
            <p>R$ {servico.valor}</p>
            <button onClick={() => handleServClick(servico)}>Adicionar</button>
          </div>
        ))}
    </ReactModal>
  );

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex justify-between w-full p-2">
        <h1>Atendimento</h1>
        <button className="vet-botao" onClick={handleBackClick}>
          Voltar
        </button>
      </div>
      <div className="vet-container">
        <div className="flex p-2 pt-6 pb-4 items-center justify-between w-full">
          <button className="vet-botao" onClick={openProdModal}>
            Adicionar Produto
          </button>
          <button className="vet-botao" onClick={openServModal}>
            Adicionar Serviço
          </button>
        </div>
        {renderProdModal()}
        {renderServModal()}
        <div className="mt-4 space-y-2  w-full overflow-y-auto flex-grow rounded p-2 border bg-white dark:bg-black border-gray-500">
          {selectedProdutos.map((produto: any, index: number) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p>{produto.nome}</p>
              <div className="flex justify-between w-1/3">
                <input
                  className="w-6 flex justify-center items-center bg-white rounded text-black mr-2"
                  type="number"
                  defaultValue={1}
                  min={1}
                  value={produto.quantidade}
                  onChange={(e) => handleQuantityChange(index, "produto", e)}
                />
                <p>R$ {produto.valor.toFixed(2)}</p>
              </div>
            </div>
          ))}
          {selectedServicos.map((servico: any, index: number) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p>{servico.nome}</p>
              <div className="flex justify-between w-1/3">
                <input
                  className="w-6 flex justify-center items-center bg-white text-black mr-2"
                  type="number"
                  defaultValue={1}
                  min={1}
                  value={servico.quantidade}
                  onChange={(e) => handleQuantityChange(index, "servico", e)}
                />
                <p>R$ {servico.valor.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full p-2">
          <button className="vet-botao" onClick={handleFinalizarClick}>
            Finalizar
          </button>
          <p className="text-lg">R$ {total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProdServ;
