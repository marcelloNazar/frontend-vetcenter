import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import VeterinarioForm from "@/components/forms/VeterinarioForm";
import { Veterinario } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "@/components/partials/HeaderModal";
import http from "@/utils/http";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const VeterinarioComponent: React.FC = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [newVeterinario, setNewVeterinario] = useState<Partial<Veterinario>>(
    {}
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    fetchVeterinario();
  }, []);

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

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeAddModal = () => {
    setAddModalIsOpen(false);
  };
  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPesquisa(e.target.value);
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex w-full justify-between p-4 rounded">
        <h1>Veterinarios</h1>
        <div>
          <button
            onClick={() => setModalIsOpen(true)}
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
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container overflow-auto">
          <HeaderModal
            selected="Selecione um proprietario"
            closeModal={closeModal}
          />
          <input
            className="w-full p-2 rounded"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar proprietario..."
            onChange={HandleSearch}
          />
          <div className="item-list mt-4 ">
            <h2 className="w-1/6 border-r border-gray-500">Nome de usuario</h2>
            <h2 className="w-1/6 border-r border-gray-500">Nome</h2>
            <h2 className="w-1/12 border-r border-gray-500">Tipo</h2>
            <p className="w-1/6 border-r border-gray-500">Telefone</p>
            <p className="w-3/12 border-r border-gray-500">E-mail</p>
            <p className="w-1/6">CRMV</p>
          </div>
          <div className="overflow-y-auto h-full w-full space-y-2">
            {veterinarios
              .filter((veterinario) =>
                veterinario.nome.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((veterinario) => (
                <div key={veterinario.id} className="item-list">
                  <h2 className="w-1/6">{veterinario.username}</h2>
                  <h2 className="w-1/6">{veterinario.nome}</h2>
                  <h2 className="w-1/12">
                    {veterinario.role === "USER" ? (
                      <p>Veterinario</p>
                    ) : (
                      <p>Admin</p>
                    )}
                  </h2>
                  <p className="w-1/6">{veterinario.telefone}</p>
                  <p className="w-3/12">{veterinario.email}</p>
                  <p className="w-1/6">{veterinario.crmv}</p>
                  <div className="flex border justify-between px-2 gap-2">
                    <button
                      onClick={() => {
                        setNewVeterinario(veterinario);
                        setUpdateModalIsOpen(true);
                      }}
                    >
                      <PencilSquareIcon className="h-5 transform transition duration-500 hover:scale-110" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do proprietario"
            closeModal={closeAddModal}
          />
          <VeterinarioForm handleSubmit2={handleAddSubmit} />
        </div>
      </ReactModal>
      <ReactModal
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
          <HeaderModal
            selected="Adicione os dados do proprietario"
            closeModal={closeUpdateModal}
          />
          <VeterinarioForm
            data={newVeterinario}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default VeterinarioComponent;
