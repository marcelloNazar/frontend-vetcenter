import React from "react";
import { Atendimento } from "@/types/types";

interface DetalhesAtendimento {
  atendimento: Atendimento; // Substitua "Atendimento" pelo tipo correto do seu objeto
  isPago: boolean;
  handlePagoChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  atualizarAtendimento: () => void;
}

const DetalhesAtendimento: React.FC<DetalhesAtendimento> = ({
  atendimento,
  isPago,
  handlePagoChange,
  atualizarAtendimento,
}) => {
  return (
    <div className="modal-container">
      <div className="flex w-full flex-col justify-between">
        <div className="data-modal-container">
          <p className="data-modal">
            <p>Veterinário:</p> {atendimento.veterinario.nome}
          </p>
          <p className="data-modal">
            <p>Animal:</p> {atendimento.animal.nome}
          </p>
          <p className="data-modal">
            <p>Raça:</p> {atendimento.animal.raca}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            <p>Proprietario:</p> {atendimento.proprietario.nome}
          </p>
          <p className="data-modal">
            <p>CPF:</p> {atendimento.proprietario.cpf}
          </p>
          <p className="data-modal">
            <p>Telefone:</p> {atendimento.proprietario.telefone}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            <p>Nome da Mãe:</p> {atendimento.proprietario.nomeMae}
          </p>
          <p className="data-modal">
            <p>Sexo:</p> {atendimento.proprietario.sexo}
          </p>
          <p className="data-modal">
            <p>Telefone 2:</p> {atendimento.proprietario.telefone1}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            <p>Rua:</p> {atendimento.proprietario.endereco?.rua}
          </p>
          <p className="data-modal">
            <p>Numero:</p> {atendimento.proprietario.endereco?.numero}
          </p>
          <p className="data-modal">
            <p>Bairro:</p> {atendimento.proprietario.endereco?.bairro}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            <p>Cidade:</p> {atendimento.proprietario.endereco?.cidade}
          </p>
          <p className="data-modal">
            <p>Estado:</p> {atendimento.proprietario.endereco?.uf}
          </p>
          <p className="data-modal">
            <p>CEP:</p> {atendimento.proprietario.endereco?.cep}
          </p>
        </div>
        <h4 className="mt-4">Produtos:</h4>
        {atendimento.produtos.map((produto, index) => (
          <div key={index} className="data-modal-container">
            <p className="data-modal">
              <p>Nome:</p> {produto.nome}
            </p>
            <p className="data-modal">
              <p>Quantidade:</p> {produto.quantidade}
            </p>
            <p className="data-modal">
              <p>Valor Unitario:</p> R${" "}
              {produto.valor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        ))}

        <h4 className="mt-4">Serviços:</h4>
        {atendimento.servicos.map((servico, index) => (
          <div key={index} className="data-modal-container">
            <p className="data-modal">
              <p>Nome:</p> {servico.nome}
            </p>
            <p className="data-modal">
              <p>Quantidade:</p> {servico.quantidade}
            </p>
            <p className="data-modal">
              <p>Valor Unitário:</p>R${" "}
              {servico.valor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        ))}
        <div>
          <div className="data-modal-container mt-4">
            <div className="flex justify-center w-1/3">
              <label>Pago?</label>

              <input
                type="checkbox"
                checked={isPago}
                onChange={handlePagoChange}
              />
            </div>
            <p className="data-modal w-1/3">
              <p>Total:</p>R${" "}
              {atendimento.total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end items-center mt-auto">
        <button onClick={atualizarAtendimento} className="vet-botao">
          Finalizar Atendimento
        </button>
      </div>
    </div>
  );
};

export default DetalhesAtendimento;
