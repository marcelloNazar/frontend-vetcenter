import { Anamnese, Atendimento } from "@/types/types";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import { AnamnseseResolver } from "@/utils/validator";
import { letrasMaiusculas } from "@/functions/format";
import Input from "@/components/partials/Input";

export const useAnamnseseForm = (
  data: Partial<Anamnese>,
  handleSubmit2: (data: Partial<Anamnese>) => void
) => {
  const formMethods = useForm<Anamnese>({
    resolver: AnamnseseResolver as any,
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    watch,
  } = formMethods;

  const handleSetData = (data: Partial<Anamnese>) => {
    setValue("anamnese", data.anamnese || "");
    setValue("estado", data.estado || "");
    setValue("mucosas", data.mucosas || "");
    setValue("linfonodos", data.linfonodos || "");
    setValue("tpc", data.tpc || "");
    setValue("turgorCutaneo", data.turgorCutaneo || "");
    setValue("desidratacao", data.desidratacao || "");
    setValue("ectoparasitas", data.ectoparasitas || false);
    setValue("mioclonias", data.mioclonias || false);
    setValue("prurido", data.prurido || "");
    setValue("vomito", data.vomito || false);
    setValue("diarreia", data.diarreia || false);
    setValue("inapatencia", data.inapatencia || "");
    setValue("secrecoesPatologicas", data.secrecoesPatologicas || "");
    setValue("calculoDentario", data.calculoDentario || "");
    setValue("auscultacaoPulmonar", data.auscultacaoPulmonar || "");
    setValue("auscultacaoCardiaca", data.auscultacaoCardiaca || "");
    setValue("reflexoToce", data.reflexoToce || "");
    setValue("emagrecimento", data.emagrecimento || "");
    setValue("alteracaoComportamental", data.alteracaoComportamental || "");
    setValue("cansaco", data.cansaco || false);
    setValue("tosse", data.tosse || false);
    setValue("pulso", data.pulso || "");
    setValue("fc", data.fc || "");
    setValue("fr", data.fr || "");
  };

  const anamnese = watch("anamnese");
  const estado = watch("estado");
  const linfonodos = watch("linfonodos");
  const inapatencia = watch("inapatencia");
  const secrecoesPatologicas = watch("secrecoesPatologicas");
  const alteracaoComportamental = watch("alteracaoComportamental");
  const pulso = watch("pulso");
  const fc = watch("fc");
  const fr = watch("fr");

  useEffect(() => {
    setValue("anamnese", letrasMaiusculas(anamnese || ""));
    setValue("estado", letrasMaiusculas(estado || ""));
    setValue("linfonodos", letrasMaiusculas(linfonodos || ""));
    setValue("inapatencia", letrasMaiusculas(inapatencia || ""));
    setValue(
      "secrecoesPatologicas",
      letrasMaiusculas(secrecoesPatologicas || "")
    );
    setValue(
      "alteracaoComportamental",
      letrasMaiusculas(alteracaoComportamental || "")
    );
    setValue("pulso", letrasMaiusculas(pulso || ""));
    setValue("fc", letrasMaiusculas(fc || ""));
    setValue("fr", letrasMaiusculas(fr || ""));
  }, [
    anamnese,
    estado,
    linfonodos,
    inapatencia,
    secrecoesPatologicas,
    alteracaoComportamental,
    pulso,
    fc,
    fr,
  ]);

  const { setAnamnese } = useAtendimento();

  useEffect(() => {
    handleSetData(data || {});
  }, []);

  const submitForm: SubmitHandler<Anamnese> = (values) => {
    handleSubmit2(values)
  };

  return {
    submitForm,
    errors,
    register,
    handleSubmit,
  };
};
