import React, { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import http from "@/utils/http";
import ReactModal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";
import { Atendimento, Produto, Servico } from "@/types/types";
import { TrashIcon } from "@heroicons/react/24/outline";

interface ProdServProps {
  data?: Partial<Atendimento>;
}

//Componente para o veterinario adicionar produtos e serviços ao atendimento
const ProdServ: React.FC<ProdServProps> = ({ data = {} }) => {
  const [prodModalIsOpen, setProdModalIsOpen] = useState(false);
  const [servModalIsOpen, setServModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedProdutos, setSelectedProdutos] = useState<Produto[]>([]);
  const [selectedServicos, setSelectedServicos] = useState<Servico[]>([]);

  const { resetAtendimento, atendimento } = useAtendimento();

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

  const serProdutosAnteriores = () => {};

  useEffect(() => {
    setSelectedProdutos(atendimento?.produtos || []);
    setSelectedServicos(atendimento?.servicos || []);
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
    const existingProductIndex = selectedProdutos.findIndex(
      (p) => p.id === produto.id
    );

    if (existingProductIndex !== -1) {
      const updatedSelectedProdutos = [...selectedProdutos];
      updatedSelectedProdutos[existingProductIndex].quantidade += 1;
      setSelectedProdutos(updatedSelectedProdutos);
    } else {
      setSelectedProdutos([...selectedProdutos, { ...produto, quantidade: 1 }]);
    }

    setProdModalIsOpen(false);
  };

  const handleServClick = (servico: Servico) => {
    const existingServicoIndex = selectedServicos.findIndex(
      (p) => p.id === servico.id
    );

    if (existingServicoIndex !== -1) {
      const updatedSelectedServicos = [...selectedServicos];
      updatedSelectedServicos[existingServicoIndex].quantidade += 1;
      setSelectedServicos(updatedSelectedServicos);
    } else {
      setSelectedServicos([...selectedServicos, { ...servico, quantidade: 1 }]);
    }
    setServModalIsOpen(false);
  };

  const handleBackClick = () => {
    resetAtendimento();
  };

  const handleRemoveProduto = (index: number) => {
    setSelectedProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveServico = (index: number) => {
    setSelectedServicos((prev) => prev.filter((_, i) => i !== index));
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
      quantidade: quantidade || 1,
    }));

    const atendimentoServicos = selectedServicos.map(({ id, quantidade }) => ({
      servicoId: id,
      quantidade: quantidade || 1,
    }));

    http
      .put(`atendimento/${atendimento?.id}`, {
        atendimentoProdutos,
        atendimentoServicos,
      })
      .then((r) => {
        if (r.status === 200) {
          resetAtendimento();
        } else {
        }
      })
      .catch((e) => alert("Erro ao finalizar o atendimento"));
  };

  const total =
    selectedProdutos.reduce(
      (acc, prod) => acc + prod.valor * prod.quantidade,
      0
    ) +
    selectedServicos.reduce(
      (acc, serv) => acc + serv.valor * serv.quantidade,
      0
    );

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
        className="vet-input"
      />
      {produtos
        .filter((produto) =>
          produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((produto: Produto) => (
          <div className="data-modal-container text-black" key={produto.id}>
            <p className="data-modal w-1/2">{produto.nome}</p>
            <p className="data-modal w-2/6">
              <p>Preço Unitario</p>
              R$ {produto.valor}
            </p>
            <div className="flex w-1/6 justify-center bg-gray-200">
              <button
                className="transform transition duration-500 hover:scale-110"
                onClick={() => handleProdClick(produto)}
              >
                Adicionar
              </button>
            </div>
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
        className="vet-input"
      />
      {servicos
        .filter((servico) =>
          servico.nome.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((servico: Servico) => (
          <div className="data-modal-container text-black" key={servico.id}>
            <p className="data-modal w-1/2">{servico.nome}</p>
            <p className="data-modal w-2/6">
              <p>Preço Unitario</p>
              R$ {servico.valor}
            </p>
            <div className="flex w-1/6 justify-center bg-gray-200">
              <button
                className="transform transition duration-500 hover:scale-110"
                onClick={() => handleServClick(servico)}
              >
                Adicionar
              </button>
            </div>
          </div>
        ))}
    </ReactModal>
  );

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex justify-between w-full p-2 pb-0 ">
        <h1>Atendimento</h1>
        <button className="vet-botao" onClick={handleBackClick}>
          Voltar
        </button>
      </div>
      <div className="vet-container">
        <div className="flex p-2 pb-0 items-center justify-between h-2/12 w-full">
          <button className="vet-botao" onClick={openProdModal}>
            Adicionar Produto
          </button>
          <button className="vet-botao" onClick={openServModal}>
            Adicionar Serviço
          </button>
        </div>
        {renderProdModal()}
        {renderServModal()}
        <div className="mt-2 h-8/12 border-t w-full overflow-y-auto flex-grow p-2 border-b border-black">
          {selectedProdutos.map((produto: any, index: number) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p>{produto.nome.slice(0, 17)}</p>
              <div className="flex justify-between w-1/2">
                <input
                  className="w-7 flex justify-center items-center bg-white text-black mr-2"
                  type="number"
                  defaultValue={1}
                  min={1}
                  value={produto.quantidade}
                  onChange={(e) => handleQuantityChange(index, "produto", e)}
                />
                <button
                  className="w-1/3"
                  onClick={() => handleRemoveProduto(index)}
                >
                  <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
                <p className="flex  justify-end w-full pl-1">
                  <p>R$ </p>{" "}
                  {produto.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
          {selectedServicos.map((servico: any, index: number) => (
            <div key={index} className="item-list dark:bg-gray-950">
              <p>{servico.nome.split(" ").slice(0, 1).join(" ")}</p>
              <div className="flex justify-between w-1/2">
                <input
                  className="w-7 flex justify-center items-center bg-white text-black mr-2"
                  type="number"
                  defaultValue={1}
                  min={1}
                  value={servico.quantidade}
                  onChange={(e) => handleQuantityChange(index, "servico", e)}
                />
                <button
                  className="w-1/3"
                  onClick={() => handleRemoveServico(index)}
                >
                  <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
                <p className="flex justify-end w-full pl-1">
                  <p>R$ </p>{" "}
                  {servico.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full h-2/12 p-2">
          <button className="vet-botao" onClick={handleFinalizarClick}>
            Finalizar
          </button>
          <p className="text-lg">
            R${" "}
            {total.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdServ;
