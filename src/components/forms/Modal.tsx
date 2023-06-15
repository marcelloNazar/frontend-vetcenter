import React, { useState } from "react";
import ReactModal from "react-modal";
import { customStyles } from "@/styles/styles";

const Modal: React.FC<{
  isOpen: boolean;
  onRequestClose: () => void;
  items: any[];
  onItemClick: (item: any) => void;
  title: string;
  searchPlaceholder: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  postUrl: string;
  onUpdate: () => void;
}> = ({
  isOpen,
  onRequestClose,
  items,
  onItemClick,
  title,
  searchPlaceholder,
  searchTerm,
  onSearchChange,
  postUrl,
  onUpdate,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(0);
  const [descricao, setDescricao] = useState("");

  const handleAddClick = () => {
    setIsFormOpen(true);
  };

  const handleConcluirClick = () => {
    const data = {
      nome,
      valor,
      descricao,
    };

    console.log(JSON.stringify(data));

    fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate();
        setIsFormOpen(false);
        setNome("");
        setValor(0);
        setDescricao("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={`${title} Modal`}
    >
      {!isFormOpen && <h2>{title}</h2>}
      {isFormOpen ? (
        <div className="modal-form">
          <div className="form-field">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label>Valor:</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label>Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="form-input"
            />
          </div>
          <button className="vet-botao" onClick={handleConcluirClick}>
            Concluir
          </button>
        </div>
      ) : (
        <>
          <div className="modal-top">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={onSearchChange}
              className="form-input"
            />
            <button className="vet-botao" onClick={handleAddClick}>
              Adicionar
            </button>
          </div>
          {items
            .filter((val: any) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.nome.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((item: any, index: number) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => onItemClick(item)}
              >
                {item.nome} - {item.valor}
              </li>
            ))}
        </>
      )}
    </ReactModal>
  );
};

export default Modal;
