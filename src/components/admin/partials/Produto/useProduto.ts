import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Produto } from "@/types/types";

export const useProduto = () => {
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
  const openModal = () => {
    setModalIsOpen(true);
  };

  const openAddModal = () => {
    setAddModalIsOpen(true);
  };

  const openUpdateModal = () => {
    setUpdateModalIsOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  return {
    produtos,
    currentProduto,
    setCurrentProduto,
    fetchProduto,
    handleAddSubmit,
    handleUpdateSubmit,
    handleDelete,
    modalIsOpen,
    openModal,
    closeModal,
    addModalIsOpen,
    openAddModal,
    closeAddModal,
    updateModalIsOpen,
    openUpdateModal,
    closeUpdateModal,
    pesquisa,
    handleSearch,
  };
};
