import React, { useEffect, useState } from "react";
import { Atendimento, Pagamento } from "@/types/types";
import http from "@/utils/http";

export const useDetalhesAtendimento = (
  atendimento: Atendimento,
) => {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [valor, setValor] = useState("");
  const [metodo, setMetodo] = useState("");
  const [parcela, setParcela] = useState("");

  function concatenarString(metodo: string, parcela: string) {
    if (metodo === "CREDITO") {
      return `${metodo} ${parcela}`;
    }
    return metodo;
  }

  let totalPagamentos = 0;

  for (const pagamento of pagamentos) {
    totalPagamentos += pagamento.valor;
  }

  const restante = atendimento.total - totalPagamentos;

  const handleValorChange = (inputValor: string) => {
    const decimalPart = inputValor.split(",")[1];

    const valorTotalAtendimento = restante;

    const valorInserido = parseFloat(inputValor.replace(",", "."));

    if (
      inputValor === "" ||
      (!isNaN(valorInserido) &&
        (!decimalPart || decimalPart.length <= 2) &&
        valorInserido <= valorTotalAtendimento)
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
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  };

  const handleSubmit = () => {
    if (valor && metodo) {
      const animalData = {
        valor: Number(valor.replace(",", ".")),
        data: formatDate(new Date()),
        metodo: concatenarString(metodo, parcela),
        atendimentoId: atendimento.id,
      };
      http
        .post("pagamento", animalData)
        .then((response) => {
          if (response.status === 201) {
            fetchPagamentos();
            setValor("");
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

  return {
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
  };
};
