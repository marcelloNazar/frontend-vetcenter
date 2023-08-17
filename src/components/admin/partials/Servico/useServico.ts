import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Servico } from "@/types/types";

export const useServico = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [currentServico, setCurrentServico] = useState<Partial<Servico>>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetchServico();
  }, []);

  const fetchServico = () => {
    http
      .get("servico")
      .then((r) => setServicos(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleAddSubmit = (data: Partial<Servico>) => {
    http
      .post("servico", data)
      .then((r) => {
        if (r.status === 201) {
          setAddModalIsOpen(false);
          fetchServico();
        } else {
          alert("Erro ao adicionar o Servico");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Servico>) => {
    http
      .put(`servico/${currentServico.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchServico();
        } else {
          alert("Erro ao atualizar o Servico");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`servico/${id}`)
      .then((response) => {
        fetchServico();
      })
      .catch((error) => console.error("Error:", error));
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

  return {
    servicos,
    currentServico,
    setCurrentServico,
    fetchServico,
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
