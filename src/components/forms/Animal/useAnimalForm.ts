import React, { useState, useEffect } from "react";
import { Animal as AnimalType } from "@/types/types";
import { AnimalResolver } from "@/utils/validator";
import { useForm } from "react-hook-form";
import { letrasMaiusculas, formatWeight } from "@/functions/format";

export const useAnimalForm = (
  data: Partial<AnimalType>,
  handleSubmit2: (data: Partial<AnimalType>) => void
) => {
  const formMethods = useForm<AnimalType>({ resolver: AnimalResolver as any });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const nome = watch("nome");
  const peso = watch("peso");
  const cor = watch("cor");
  const raca = watch("raca");

  const handleSetData = (data: Partial<AnimalType>) => {
    setValue("nome", data.nome || "");
    setValue("especie", data.especie || "");
    setValue("raca", data.raca || "");
    setValue("sexo", data.sexo || "");
    setValue("peso", data.peso || "");
    setValue("nascimento", data.nascimento || "");
    setValue("cor", data.cor || "");
    setValue("temperamento", data.temperamento || "");
    setValue("castrado", data.castrado || false);
  };

  useEffect(() => {
    setValue("nome", letrasMaiusculas(nome || ""));
    setValue("peso", formatWeight(peso || ""));
    setValue("cor", letrasMaiusculas(cor || ""));
    setValue("raca", letrasMaiusculas(raca || ""));
  }, [nome, peso, cor, raca]);

  useEffect(() => {
    handleSetData(data);
  }, []);

  const submitForm = (values: AnimalType) => {
    handleSubmit2(values);
  };

  return {
    submitForm,
    errors,
    register,
    handleSubmit,
  };
};
