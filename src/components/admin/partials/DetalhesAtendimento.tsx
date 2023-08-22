import React, { useEffect, useState } from "react";
import { Atendimento, Pagamento } from "@/types/types";
import atendimentoPDF from "@/reports/atendimentoPDF";
import http from "@/utils/http";
import Input from "@/components/partials/Input";

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
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState("");

  const handleValorChange = (inputValor: string) => {
    const decimalPart = inputValor.split(",")[1];

    if (
      inputValor === "" ||
      (!isNaN(Number(inputValor.replace(",", "."))) &&
        (!decimalPart || decimalPart.length <= 2))
    ) {
      setValor(inputValor);
    }
  };

  const fetchPagamentos = () => {
    http
      .get(`pagamento/${atendimento.id}`)
      .then((r) => setPagamentos(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Mês é base 0, então adicionamos 1
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    if (valor && metodo) {
      const animalData = {
        valor: Number(valor.replace(",", ".")),
        data: formatDate(new Date()),
        metodo,
        atendimentoId: atendimento.id,
      };
      http
        .post("pagamento", animalData)
        .then((response) => {
          if (response.status === 201) {
            fetchPagamentos();
          } else {
            alert("Erro ao adicionar o Pagamento");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    } else {
      alert("Insira o Valor e Metodo de Pagamento");
    }
  };

  useEffect(() => {
    fetchPagamentos();
  }, []);

  return (
    <div className="modal-container ">
      <div className="flex w-full flex-col justify-between overflow-auto">
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
        {atendimento.produtos.length ? (
          <>
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
          </>
        ) : (
          <></>
        )}
        {atendimento.servicos.length ? (
          <>
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
          </>
        ) : (
          <></>
        )}
        {pagamentos.length ? (
          <>
            <h4 className="mt-4">Pagamentos:</h4>
            {pagamentos.map((pagamento, index) => (
              <div key={index} className="data-modal-container">
                <p className="data-modal">
                  <p>Nome:</p> {pagamento.data}
                </p>
                <p className="data-modal">
                  <p>Quantidade:</p> {pagamento.metodo}
                </p>
                <p className="data-modal">
                  <p>Valor Unitário:</p>R${" "}
                  {pagamento.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
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
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Valor"
            value={valor}
            onChange={(e) => handleValorChange(e.target.value)}
          />
          <select
            className="vet-input "
            value={metodo}
            onChange={(e) => setMetodo(e.target.value)}
          >
            <option value="">METODO</option>
            <option value="DINHEIRO">DINHEIRO</option>
            <option value="PIX">PIX</option>
            <option value="CARTAO">CARTAO</option>
          </select>
          <div className="flex w-full justify-end">
            <button onClick={handleSubmit} className="vet-botao">
              Adicionar Pagamento
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between items-center mt-auto">
        <button
          onClick={(e) => atendimentoPDF(atendimento)}
          className="vet-botao"
        >
          Imprimir
        </button>
        <button onClick={atualizarAtendimento} className="vet-botao">
          Finalizar Atendimento
        </button>
      </div>
    </div>
  );
};

export default DetalhesAtendimento;
