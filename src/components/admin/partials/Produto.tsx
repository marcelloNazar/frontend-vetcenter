import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import ProdServForm from "@/components/forms/ProdServForm";
import { Produto } from "@/types/types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProdutoComponent: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [currentProduto, setCurrentProduto] = useState<Partial<Produto>>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetchProduto();
  }, []);

  const fetchProduto = () => {
    http
      .get("produto")
      .then((r) => setProdutos(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleAddSubmit = (data: Partial<Produto>) => {
    http
      .post("produto", data)
      .then((r) => {
        if (r.status === 201) {
          setAddModalIsOpen(false);
          fetchProduto();
        } else {
          alert("Erro ao adicionar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Produto>) => {
    http
      .put(`produto/${currentProduto.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchProduto();
        } else {
          alert("Erro ao atualizar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`produto/${id}`)
      .then((response) => {
        fetchProduto();
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Produtos</h1>
        <div>
          <button
            onClick={() => {
              setModalIsOpen(true);
              fetchProduto();
            }}
            className="vet-botao mr-4"
          >
            Ver Todos
          </button>
          <button onClick={() => setAddModalIsOpen(true)} className="vet-botao">
            Adicionar
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Selecione um produto"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded  bg-white text-black"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar produto..."
            onChange={handleSearch}
          />
          <div className="overflow-y-auto h-full w-full mt-4 space-y-2">
            {produtos
              .filter((produto) =>
                produto.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((produto) => (
                <div key={produto.id} className="flex justify-between ">
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Nome:</div>
                    <div>{produto.nome}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Descrição:</div>
                    <div>{produto.descricao}</div>
                  </div>
                  <div className="flex w-1/3 border justify-between px-2">
                    <div>Preço:</div>
                    <div>
                      R${" "}
                      {produto.valor.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                  <div className="flex border justify-between px-2 gap-2">
                    <button
                      onClick={() => {
                        setCurrentProduto(produto);
                        setUpdateModalIsOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                    <button onClick={() => handleDelete(produto.id)}>
                      <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={addModalIsOpen}
        onRequestClose={closeAddModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do produto"
            closeModal={closeAddModal}
          />
          <ProdServForm handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>

      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={closeUpdateModal}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Atualize os dados do produto"
            closeModal={closeUpdateModal}
          />
          <ProdServForm
            data={currentProduto}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default ProdutoComponent;
