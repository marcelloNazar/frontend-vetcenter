import { Atendimento, Pagamento } from "@/types/types";
import atendimentoPDF from "@/reports/atendimentoPDF";
import Input from "@/components/partials/Input";
import { useDetalhesAtendimento } from "./useDetalhesAtendimento";

interface DetalhesAtendimento {
  atendimento: Atendimento;
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
  const {
    valor,
    handleValorChange,
    metodo,
    setMetodo,
    parcela,
    setParcela,
    handleSubmit,
    pagamentos,
    totalPagamentos,
    restante,
  } = useDetalhesAtendimento(atendimento);

  return (
    <div className="modal-container ">
      <div className="flex w-full flex-col justify-between overflow-auto scrollbar scrollbar-thumb-gray-300">
        <div className="data-modal-container mt-1">
          <p className="data-modal">
            {atendimento.veterinario.nome.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="data-modal">
            <p>ANIMAL:</p>{" "}
            {atendimento.animal.nome.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="data-modal">
            <p>ESPECIE:</p> {atendimento.animal.especie}
          </p>
          <p className="data-modal">
            <p>RAÇA:</p> {atendimento.animal.raca}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            {atendimento.proprietario.nome.split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="data-modal">
            <p>CPF:</p> {atendimento.proprietario.cpf}
          </p>
          <p className="data-modal">
            <p>TELEFONE:</p> {atendimento.proprietario.telefone}
          </p>
          <p className="data-modal">
            <p>MÃE:</p>{" "}
            {atendimento.proprietario.nomeMae.split(" ").slice(0, 2).join(" ")}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">{atendimento.proprietario.sexo}</p>
          <p className="data-modal">
            <p>TELEFONE 2:</p> {atendimento.proprietario.telefone1}
          </p>
          <p className="data-modal">
            <p>ESTADO:</p> {atendimento.proprietario.endereco?.uf}
          </p>
          <p className="data-modal">
            <p>CEP:</p> {atendimento.proprietario.endereco?.cep}
          </p>
        </div>
        <div className="data-modal-container">
          <p className="data-modal">
            {atendimento.proprietario.endereco?.cidade}
          </p>
          <p className="data-modal">
            <p>BAIRRO:</p> {atendimento.proprietario.endereco?.bairro}
          </p>
          <p className="data-modal">
            <p>RUA:</p>{" "}
            {atendimento.proprietario.endereco?.rua
              .split(" ")
              .slice(0, 2)
              .join(" ")}
          </p>
          <p className="data-modal">
            <p>NUMERO:</p> {atendimento.proprietario.endereco?.numero}
          </p>
        </div>
        <div className="data-modal-container"></div>
        {atendimento.produtos.length ? (
          <>
            <h4 className="mt-1">PRODUTOS:</h4>
            {atendimento.produtos.map((produto, index) => (
              <div key={index} className="data-modal-container">
                <p className="data-modal w-5/12">{produto.nome}</p>
                <p className="data-modal w-1/12">
                  <p>QTD:</p> {produto.quantidade}
                </p>
                <p className="data-modal w-1/4">
                  <p>UNITARIO:</p> R${" "}
                  {produto.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="data-modal w-1/4">
                  <p>TOTAL:</p> R${" "}
                  {(produto.valor * produto.quantidade).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
        {atendimento.servicos.length ? (
          <>
            <h4 className="mt-1">Serviços:</h4>
            {atendimento.servicos.map((servico, index) => (
              <div key={index} className="data-modal-container">
                <p className="data-modal  w-5/12">{servico.nome}</p>
                <p className="data-modal w-1/12">
                  <p>QTD:</p> {servico.quantidade}
                </p>
                <p className="data-modal w-1/4">
                  <p>UNITARIO:</p>R${" "}
                  {servico.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="data-modal w-1/4">
                  <p>TOTAL:</p>R${" "}
                  {(servico.valor * servico.quantidade).toLocaleString(
                    "pt-BR",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
        {atendimento.cirurgias.length ? (
          <>
            <h4 className="mt-1">Cirurgias:</h4>
            {atendimento.cirurgias.map((cirurgia, index) => (
              <div key={index} className="data-modal-container">
                <p className="data-modal  w-5/12">{cirurgia.nome}</p>
                <p className="data-modal w-1/12">
                  <p>QTD:</p> 1
                </p>
                <p className="data-modal w-1/4">
                  <p>UNITARIO:</p>R${" "}
                  {cirurgia.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="data-modal w-1/4">
                  <p>TOTAL:</p>R${" "}
                  {cirurgia.valor.toLocaleString("pt-BR", {
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
          <div className="data-modal-container mt-1">
            <div className="flex justify-center w-1/3"></div>
            <p className="data-modal w-1/4">
              <p>TOTAL:</p>R${" "}
              {atendimento.total?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between rounded mt-1 bg-gray-100">
          <div className="flex w-1/4 flex-col">
            <h4 className="">Adicionar Pagamento:</h4>
            <Input
              type="text"
              placeholder="Valor"
              value={valor}
              onChange={(e) => handleValorChange(e.target.value)}
            />
            <div className="flex pl-1">
              <select
                className="vet-input w-7/12"
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
              >
                <option value="">METODO</option>
                <option value="DINHEIRO">DINHEIRO</option>
                <option value="PIX">PIX</option>
                <option value="CREDITO">CREDITO</option>
                <option value="DEBITO">DEBITO</option>
              </select>
              <select
                className="vet-input w-5/12"
                value={parcela}
                onChange={(e) => setParcela(e.target.value)}
              >
                <option value="">X</option>
                <option value="1X">1X</option>
                <option value="2X">2X</option>
                <option value="3X">3X</option>
                <option value="4X">4X</option>
                <option value="5X">5X</option>
                <option value="6X">6X</option>
                <option value="7X">7X</option>
                <option value="8X">8X</option>
                <option value="9X">9X</option>
                <option value="10X">10X</option>
                <option value="11X">11X</option>
                <option value="12X">12X</option>
              </select>
            </div>
            <div className="p-1 pt-0"></div>
            <div className="flex w-full justify-center p-1 pt-0">
              <button onClick={handleSubmit} className="vet-botao w-full">
                Adicionar Pagamento
              </button>
            </div>
          </div>
          {pagamentos.length ? (
            <div className="flex w-3/4 flex-col">
              <h4 className="">Pagamentos:</h4>
              {pagamentos.map((pagamento, index) => (
                <div key={index} className="data-modal-container">
                  <p className="data-modal">
                    <p>DATA:</p> {pagamento.data}
                  </p>
                  <p className="data-modal">
                    <p>METODO:</p> {pagamento.metodo}
                  </p>
                  <p className="data-modal">
                    <p>VALOR:</p>R${" "}
                    {pagamento.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
              <div className="data-modal-container">
                <div className="flex justify-center w-1/3"></div>
                <p className="data-modal w-1/3">
                  <p>TOTAL:</p>R${" "}
                  {totalPagamentos.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div></div>
        <div>
          <div className="data-modal-container mt-1">
            <div className="flex justify-center w-1/3"></div>
            <p className="data-modal w-1/4">
              <p>DIVIDA:</p>R${" "}
              {restante?.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between items-center mt-auto">
        <button
          onClick={(e) =>
            atendimentoPDF(atendimento, pagamentos, totalPagamentos, restante)
          }
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
