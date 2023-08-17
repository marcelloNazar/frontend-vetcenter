import React, { useState, useEffect } from "react";
import { Veterinario } from "@/types/types";
import { useForm } from "react-hook-form";
import { VeterinarioResolver } from "@/utils/validator";
import { formatNumber, letrasMaiusculas } from "@/functions/format";

export const useVeterinarioForm = (
  data: Partial<Veterinario>,
  handleSubmit2: (data: Partial<Veterinario>) => void
) => {

    const formMethods = useForm({ resolver: VeterinarioResolver });
    const {
      formState: { errors },
      register,
      handleSubmit,
      setValue,
      watch,
    } = formMethods;
  
    const nome = watch("nome");
    const telefone = watch("telefone");
  
    const handleSetData = (data: Partial<Veterinario>) => {
      setValue("username", data.username || "");
      setValue("nome", data.nome || "");
      setValue("role", data.role || "USER");
      setValue("telefone", data.telefone || "");
      setValue("email", data.email || "");
      setValue("crmv", data.crmv || "");
    };
  
    useEffect(() => {
      setValue("nome", letrasMaiusculas(nome || ""));
      setValue("telefone", formatNumber(telefone || ""));
    }, [nome, telefone]);
  
    useEffect(() => {
      handleSetData(data);
    }, []);
  
    const submitForm = (values: any) => {
      handleSubmit2(values);
    };

    return {
        submitForm,
        errors,
        register,
        handleSubmit,
      };
};
