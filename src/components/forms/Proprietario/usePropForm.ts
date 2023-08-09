import React, { useState, useEffect, useCallback } from "react";
import { Owner } from "@/types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProprietarioResolver } from "@/utils/validator";
import {
  formatCPF,
  formatCEP,
  formatNumber,
  letrasMaiusculas,
} from "@/functions/format";

export const usePropForm = (
  data: Partial<Owner>,
  handleSubmit2: (data: Partial<Owner>) => void
) => {
  const formMethods = useForm<Owner>({
    resolver: ProprietarioResolver as any,
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const nome = watch("nome");
  const cpf = watch("cpf");
  const telefone = watch("telefone");
  const telefone1 = watch("telefone1");
  const telefone2 = watch("telefone2");
  const nomeMae = watch("nomeMae");
  const cep = watch("endereco.cep");
  const rua = watch("endereco.rua");
  const bairro = watch("endereco.bairro");
  const cidade = watch("endereco.cidade");
  const uf = watch("endereco.uf");
  const complemento = watch("endereco.complemento");

  const handleSetData = (data: Partial<Owner>) => {
    setValue("nome", data.nome || "");
    setValue("telefone", data.telefone || "");
    setValue("cpf", data.cpf || "");
    setValue("nascimento", data.nascimento || "");
    setValue("telefone1", data.telefone1 || "");
    setValue("telefone2", data.telefone2 || "");
    setValue("nomeMae", data.nomeMae || "");
    setValue("sexo", data.sexo || "");
    setValue("endereco.rua", data.endereco?.rua || "");
    setValue("endereco.bairro", data.endereco?.bairro || "");
    setValue("endereco.cep", data.endereco?.cep || "");
    setValue("endereco.cidade", data.endereco?.cidade || "");
    setValue("endereco.uf", data.endereco?.uf || "");
    setValue("endereco.numero", data.endereco?.numero || "");
    setValue("endereco.complemento", data.endereco?.complemento || "");
  };

  useEffect(() => {
    setValue("nome", letrasMaiusculas(nome || ""));
    setValue("cpf", formatCPF(cpf || ""));
    setValue("telefone", formatNumber(telefone || ""));
    setValue("telefone1", formatNumber(telefone1 || ""));
    setValue("telefone2", formatNumber(telefone2 || ""));
    setValue("nomeMae", letrasMaiusculas(nomeMae || ""));
    setValue("endereco.cep", formatCEP(cep || ""));
    setValue("endereco.rua", letrasMaiusculas(rua || ""));
    setValue("endereco.bairro", letrasMaiusculas(bairro || ""));
    setValue("endereco.cidade", letrasMaiusculas(cidade || ""));
    setValue("endereco.uf", letrasMaiusculas(uf || ""));
    setValue("endereco.complemento", letrasMaiusculas(complemento || ""));
  }, [
    nome,
    cpf,
    telefone,
    telefone1,
    telefone2,
    nomeMae,
    cep,
    rua,
    bairro,
    cidade,
    uf,
    complemento,
  ]);

  useEffect(() => {
    handleSetData(data);
  }, []);

  const submitForm: SubmitHandler<Owner> = (values) => {
    handleSubmit2(values);
  };

  return {
    submitForm,
    errors,
    register,
    handleSubmit,
  };
};
