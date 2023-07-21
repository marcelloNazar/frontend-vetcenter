import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useSelectedOwner } from "../../contexts/SelectedOwnerContext";
import FormularioProprietario from "../forms/ProprietarioForm";
import { Owner } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../partials/HeaderModal";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";

const Proprietario: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [newOwner, setNewOwner] = useState<Partial<Owner>>({});
  const [pesquisa, setPesquisa] = useState("");

  const { selectedOwner, setSelectedOwner } = useSelectedOwner();

  const [updateOwner, setUpdateOwner] = useState<Partial<Owner>>();

  useEffect(() => {
    fetchProprietario();
  }, []);

  const fetchProprietario = () => {
    http
      .get("proprietario")
      .then((r) => setOwners(r.data.content))
      .catch((e) => console.error("Error:", e));
  };

  const handleOwnerClick = (owner: Owner) => {
    setSelectedOwner(owner);
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
          setSelectedOwner(null);
          setSelectedOwner(r.data);
          setUpdateOwner(r.data);
        } else {
          alert("Erro ao adicionar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateSubmit = (data: Partial<Owner>) => {
    console.log(data);
    http
      .put(`proprietario/${updateOwner?.id}`, data)
      .then((r) => {
        if (r.status === 200) {
          setUpdateModalIsOpen(false);
          fetchProprietario();
          setSelectedOwner(null);
          setSelectedOwner(r.data);
          setUpdateOwner(r.data);
        } else {
          alert("Erro ao atualizar o produto");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleDelete = (id: number) => {
    http
      .delete(`proprietario/${id}`)
      .then((response) => {
        fetchProprietario();
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
      {selectedOwner ? (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{selectedOwner.nome}</h2>
            <div>
              <button
                className="vet-botao"
                onClick={() => setUpdateModalIsOpen(true)}
              >
                Editar
              </button>
              <button
                className="vet-botao"
                onClick={() => setSelectedOwner(null)}
              >
                Voltar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1 mr-12">
            <div className="data-container">
              <div>Telefone:</div>
              <div className="">{selectedOwner.telefone}</div>
            </div>

            <div className="data-container ">
              <div>CPF:</div>
              <div>{selectedOwner.cpf}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{selectedOwner.nascimento}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{selectedOwner.nomeMae}</div>
            </div>
            <div className="data-container ">
              <div>Nascimento:</div>
              <div>{selectedOwner.sexo}</div>
            </div>
            <div className="data-container ">
              <div>Status:</div>
              <div>Cliente Bom</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            className="vet-botao m-2"
            onClick={() => setModalIsOpen(true)}
          >
            Selecione o Proprietário
          </button>
          <button
            className="vet-botao m-2"
            onClick={() => setAddModalIsOpen(true)}
          >
            Adicione um Proprietário
          </button>
        </div>
      )}

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <div className="modal-container">
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
          <div className="overflow-y-auto h-full w-full mt-4 space-y-2">
            {owners
              .filter((owner) =>
                owner.nome?.toLowerCase().includes(pesquisa.toLowerCase())
              )
              .map((owner) => (
                <div
                  key={owner.id}
                  onClick={() => handleOwnerClick(owner)}
                  className="item-list"
                >
                  <h2>{owner.nome}</h2>
                  <p></p>
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
          <FormularioProprietario handleSubmit={handleAddSubmit} />
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
          <FormularioProprietario
            data={updateOwner}
            handleSubmit={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default Proprietario;
