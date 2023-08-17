import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import VeterinarioForm from "@/components/forms/Veterinario/VeterinarioForm";
import { Veterinario } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export const useVeterinario = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [newVeterinario, setNewVeterinario] = useState<Partial<Veterinario>>(
    {}
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const fetchVeterinario = () => {
    http
      .get("adm/atendimento/usuarios")
      .then((r) => setVeterinarios(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleAddSubmit = (data: Partial<Veterinario>) => {
    http
      .post("auth/signup", data)
      .then((r) => {
        if (r.status === 200) {
          setAddModalIsOpen(false);
          fetchVeterinario();
          setNewVeterinario(r.data);
        } else {
          alert("Erro ao adicionar o proprietario");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Veterinario>) => {
    console.log(data);
    http
      .put(`auth/${newVeterinario?.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchVeterinario();
          setNewVeterinario(r.data);
        } else {
          alert("Erro ao atualizar o produto");
        }
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
    veterinarios,
    newVeterinario,
    setNewVeterinario,
    fetchVeterinario,
    handleAddSubmit,
    handleUpdateSubmit,
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
