import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import { Atendimento } from "@/types/types";
import Modal from "react-modal";
import HeaderModal from "../partials/HeaderModal";
import { customStyles } from "@/styles/styles";
import DetalhesAtendimento from "./partials/DetalhesAtendimento/DetalhesAtendimento";
import { useDetalhesAtendimento } from "./partials/DetalhesAtendimento/useDetalhesAtendimento";

const AtendimentosMesPagosFalse: React.FC = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAtendimento, setCurrentAtendimento] =
    useState<Atendimento | null>(null);
  const [isPago, setIsPago] = useState(false);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const startYear = 2023;
  const yearsCount = currentYear - startYear + 1;

  const months = [
    { value: 1, label: "Janeiro" },
    { value: 2, label: "Fevereiro" },
    { value: 3, label: "Março" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Maio" },
    { value: 6, label: "Junho" },
    { value: 7, label: "Julho" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Setembro" },
    { value: 10, label: "Outubro" },
    { value: 11, label: "Novembro" },
    { value: 12, label: "Dezembro" },
  ];

  const years = Array.from({ length: yearsCount }, (_, index) => ({
    value: startYear + index,
    label: (startYear + index).toString(),
  }));

  const mesAtual = currentDate.getMonth() + 1;

  const [mes, setMes] = useState(mesAtual);
  const [ano, setAno] = useState(currentYear);

  const handleMonthChange = (event: any) => {
    setMes(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setAno(event.target.value);
  };

  const calcularTotalAtendimentos = () => {
    return atendimentos.reduce((total, atendimento) => {
      if (atendimento.total) {
        return total + atendimento.total;
      } else {
        return total;
      }
    }, 0);
  };

  const abrirModal = (atendimento: Atendimento) => {
    setCurrentAtendimento(atendimento);
    setIsPago(atendimento.pago);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    setCurrentAtendimento(null);
  };

  const handlePagoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPago(event.target.checked);
  };

  useEffect(() => {
    fetchAtendimentos();
    const interval = setInterval(() => {
      fetchAtendimentos();
    }, 1 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [mes, ano]);

  const fetchAtendimentos = async () => {
    http
      .get(`adm/atendimento/datafalse?mes=${mes}&ano=${ano}`)
      .then((r) => setAtendimentos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const atualizarAtendimento = () => {
    if (currentAtendimento) {
      const body = { ...currentAtendimento, pago: isPago };

      http
        .put(`adm/atendimento/${currentAtendimento.id}`, body)
        .then((r) => {
          if (r.status === 200) {
            fecharModal();
            fetchAtendimentos();
          } else {
            alert("Erro ao atualizar o atendimento");
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div className="vet-container">
      <div className="flex justify-between w-full items-center pl-2 border-black border-b">
        <h2 className="w-full uppercase">Não Pagos</h2>
        <label className="m-1 px-4 py-1 border rounded bg-white text-black outline-none">
          <select
            className="bg-white text-black"
            value={mes}
            onChange={handleMonthChange}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>

        <label className="m-1 px-4 py-1 border rounded bg-white text-black outline-none">
          <select
            className="bg-white text-black"
            value={ano}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="vet-container flex-col h-full  justify-start overflow-auto p-2">
        {atendimentos.map((atendimento, index) => (
          <div
            key={index}
            className="item-list dark:bg-gray-950 "
            onClick={() => abrirModal(atendimento)}
          >
            <p className="w-7/12">
              {atendimento.proprietario.nome.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="w-2/12">Divida:</p>
            <p className="w-3/12 justify-between flex">
              R$
              <p>
                {(atendimento.total - atendimento.totalPago).toLocaleString(
                  "pt-BR",
                  {
                    minimumFractionDigits: 2,
                  }
                )}
              </p>
            </p>
          </div>
        ))}
      </div>
      <div className="flex w-full p-2 border-t  border-black justify-between">
        <p>N°: {atendimentos.length}</p>
        <p>
          TOTAL: R${" "}
          {calcularTotalAtendimentos().toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>
      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={fecharModal}
      >
        {currentAtendimento && (
          <div className="modal-container">
            <HeaderModal selected="Atendimento" closeModal={fecharModal} />
            <DetalhesAtendimento
              atendimento={currentAtendimento}
              isPago={isPago}
              handlePagoChange={handlePagoChange}
              atualizarAtendimento={atualizarAtendimento}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AtendimentosMesPagosFalse;
