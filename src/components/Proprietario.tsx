import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useSelectedOwner } from "../contexts/SelectedOwnerContext"; // Ajuste o caminho de acordo com a localização do seu arquivo
import FormularioProprietario from "./forms/ProprietarioForm";
import { Owner } from "@/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "./partials/HeaderModal";

const Proprietario: React.FC = () => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [newOwner, setNewOwner] = useState<Partial<Owner>>({});
  const [pesquisa, setPesquisa] = useState("");

  const { selectedOwner, setSelectedOwner } = useSelectedOwner();

  useEffect(() => {
    fetch("http://localhost:8080/proprietario")
      .then((response) => response.json())
      .then((data) => setOwners(data.content));
  }, []);

  const handleOwnerClick = (owner: Owner) => {
    setSelectedOwner(owner);
    setModalIsOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8080/proprietario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOwner),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedOwner(data);
        setNewOwner({});
        setAddModalIsOpen(false);
      });
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

  return (
    <div className="vet-container overflow-hidden">
      {selectedOwner ? (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{selectedOwner.nome}</h2>
            <button
              className="vet-botao"
              onClick={() => setSelectedOwner(null)}
            >
              Voltar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1 mr-12">
            <div className="data-container">
              <div>Telefone:</div>
              <div className="">{selectedOwner.telefone}</div>
            </div>

            <div className="data-container">
              <div>CPF:</div>
              <div>{selectedOwner.cpf}</div>
            </div>
            <div className="data-container ">
              <div className="text-gray-700">Nascimento:</div>
              <div>{selectedOwner.nascimento}</div>
            </div>
            <div className="data-container ">
              <div className="text-gray-700">Nascimento:</div>
              <div>{selectedOwner.nomeMae}</div>
            </div>
            <div className="data-container ">
              <div className="text-gray-700">Nascimento:</div>
              <div>{selectedOwner.sexo}</div>
            </div>
            <div className="data-container ">
              <div className="text-gray-700">Status:</div>
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
                owner.nome.toLowerCase().includes(pesquisa.toLowerCase())
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
          <FormularioProprietario
            newOwner={newOwner}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default Proprietario;
