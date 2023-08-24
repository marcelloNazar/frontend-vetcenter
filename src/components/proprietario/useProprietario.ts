import { useAtendimento } from "@/contexts/AtendimentoContext";
import { useState } from "react";
import { Owner } from "@/types/types";
import http from "@/utils/http";

export const useProprietario = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  const { proprietario, setProprietario, setAtendimento, setAnimal } =
    useAtendimento();

  const [updateOwner, setUpdateOwner] = useState<Partial<Owner>>({});

  const fetchProprietario = () => {
    http
      .get("proprietario")
      .then((r) => setOwners(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleOwnerClick = (owner: Owner) => {
    setProprietario(owner);
    setModalIsOpen(false);
    setUpdateOwner(owner);
  };

  const handleAddSubmit = (data: Partial<Owner>) => {
    http
      .post("proprietario", data)
      .then((r) => {
        if (r.status === 201) {
          setAddModalIsOpen(false);
          fetchProprietario();
          setProprietario(null);
          setProprietario(r.data);
          setUpdateOwner(r.data);
        } else {
          alert("Erro ao adicionar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Owner>) => {
    http
      .put(`proprietario/${proprietario?.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchProprietario();
          setProprietario(null);
          setProprietario(r.data);
          setUpdateOwner(r.data);
        } else {
          alert("Erro ao atualizar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };
  const handleVoltar = () => {
    setProprietario(null);
    setAtendimento(null);
    setAnimal(null);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  function formatarData(data: string) {
    const partesData = data.split("-");
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    return `${dia}/${mes}/${ano}`;
  }
  function letrasMaiusculas(str: string) {
    return str
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  }

  return {
    proprietario,
    setUpdateModalIsOpen,
    handleVoltar,
    formatarData,
    setModalIsOpen,
    fetchProprietario,
    setAddModalIsOpen,
    modalIsOpen,
    addModalIsOpen,
    updateModalIsOpen,
    pesquisa,
    HandleSearch,
    owners,
    handleOwnerClick,
    handleAddSubmit,
    closeAddModal,
    closeModal,
    closeUpdateModal,
    handleUpdateSubmit,
  };
};
