import { useState, useEffect } from "react";
import React from "react";
import { Produto } from "@/types/types";
import { useForm } from "react-hook-form";
import { ProdServResolver } from "@/utils/validator";
import { numberToString, letrasMaiusculas } from "@/functions/format";

export const useProdServForm = (
  data: Partial<Produto>,
  handleSubmit2: (data: Partial<Produto>) => void
) => {
  const formMethods = useForm<Produto>({ resolver: ProdServResolver as any });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const nome = watch("nome");
  const descricao = watch("descricao");
  const [valor, setValor] = useState(
    data.valor ? data.valor.toString().replace(".", ",") : ""
  );

  const handleSetData = (data: Partial<Produto>) => {
    setValue("nome", data.nome || "");
    setValue("descricao", data.descricao || "");
    setValor(numberToString(data.valor) || "");
  };

  useEffect(() => {
    setValue("nome", letrasMaiusculas(nome || ""));
    setValue("descricao", letrasMaiusculas(descricao || ""));
  }, [nome, descricao]);

  useEffect(() => {
    handleSetData(data);
  }, []);

  const submitForm = (values: any) => {
    handleSubmit2({ nome, descricao, valor: Number(valor.replace(",", ".")) });
  };

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

  return {
    submitForm,
    errors,
    register,
    handleSubmit,
    handleValorChange,
    valor,
    setValor,
  };
};
