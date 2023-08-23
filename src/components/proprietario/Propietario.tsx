import { useAtendimento } from "@/contexts/AtendimentoContext";
import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import FormularioProprietario from "../forms/Proprietario/ProprietarioForm";
import { Owner } from "@/types/types";
import { customStyles } from "@/styles/styles";
import HeaderModal from "../partials/HeaderModal";
import http from "@/utils/http";
import { formatNumber } from "@/functions/format";

//Componente do proprietario para a screen do veterinario
const PropUser: React.FC = () => {
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

  return (
    <div className="vet-container overflow-hidden">
      {proprietario ? (
        <div className="body-container">
          <div className="header-container">
            <h2 className="text-xl uppercase">{proprietario.nome}</h2>
            <div>
              <button
                className="vet-botao mr-2"
                onClick={() => setUpdateModalIsOpen(true)}
              >
                Editar
              </button>
              <button className="vet-botao" onClick={handleVoltar}>
                Voltar
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 mr-28">
            <div className="data-container">
              <div>Telefone:</div>
              <div className="">{proprietario.telefone}</div>
            </div>
            <div className="data-container">
              <div>CPF:</div>
              <div>{proprietario.cpf}</div>
            </div>
            <div className="data-container">
              <div>Nascimento:</div>
              <div>{formatarData(proprietario.nascimento)}</div>
            </div>
            <div className="data-container">
              <div>Nome da Mae:</div>
              <div>
                {letrasMaiusculas(
                  proprietario.nomeMae.split(" ").slice(0, 2).join(" ")
                )}
              </div>
            </div>
            <div className="data-container">
              <div>Cidade:</div>
              <div>{letrasMaiusculas(proprietario.endereco.cidade)}</div>
            </div>
            <div className="data-container">
              <div>Sexo:</div>
              <div>{letrasMaiusculas(proprietario.sexo.toLowerCase())}</div>
            </div>
            <div className="data-container">
              <div>Estado:</div>
              <div>{letrasMaiusculas(proprietario.endereco.uf)}</div>
            </div>
            <div className="data-container">
              <div>telefone 2:</div>
              <div>{proprietario.telefone1}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <button
            className="vet-botao m-2"
            onClick={() => {
              setModalIsOpen(true);
              fetchProprietario();
            }}
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
            className="w-full p-2 rounded bg-white text-black"
            type="text"
            value={pesquisa}
            placeholder="Pesquisar proprietario..."
            onChange={HandleSearch}
          />
          <div className="overflow-y-auto h-full w-full mt-4">
            <div className="item-list">
              <h2 className="w-6/12 border-r border-gray-500  pl-1">NOME</h2>
              <h2 className="w-3/12 border-r border-gray-500  pl-1">CPF</h2>
              <h2 className="w-3/12 pl-1">TELEFONE</h2>
            </div>
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
                  <h2 className="w-6/12 border-r border-gray-500  pl-1">
                    {owner.nome}
                  </h2>
                  <h2 className="w-3/12 border-r border-gray-500  pl-1">
                    {owner.cpf}
                  </h2>
                  <h2 className="w-3/12 pl-1">{owner.telefone}</h2>
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
          <FormularioProprietario handleSubmit2={handleAddSubmit} />
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
            data={proprietario || {}}
            handleSubmit2={handleUpdateSubmit}
          />
        </div>
      </ReactModal>
    </div>
  );
};

export default PropUser;
