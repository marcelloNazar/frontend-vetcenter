import React, { useState, useEffect } from "react";
import { Anamnese, Atendimento } from "@/types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import { AnamnseseResolver } from "@/utils/validator";
import { letrasMaiusculas } from "@/functions/format";
import Input from "@/components/partials/Input";
import { useAnamnseseForm } from "./useAnamneseForm";

interface AnamneseFormProps {
  data?: Partial<Anamnese>;
  handleSubmit2: (data: Partial<Anamnese>) => void;
}

//Formulario para cadastro de anamnese
const AnamneseForm: React.FC<AnamneseFormProps> = ({
  data = {},
  handleSubmit2,
}) => {
  const { submitForm, errors, register, handleSubmit } = useAnamnseseForm(
    data,
    handleSubmit2
  );

  return (
    <div className="modal-container">
      <form
        className="flex flex-col w-full"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="w-full flex flex-col pr-2">
          <div className="w-full mb-2">
            <textarea
              className="vet-input h-full w-full"
              {...register("anamnese")}
              placeholder="Anamnese"
            />
          </div>
          <div className="w-full flex ">
            <div className="w-1/3 flex ">
              <Input
                type="text"
                {...register("estado")}
                placeholder="Estado"
                error={errors?.estado?.message}
              />
            </div>
            <div className="flex w-2/3 justify-between mt-2">
              <div>
                <label className="flex items-center ml-1">
                  Ectoparasitas
                  <input
                    className="ml-1"
                    {...register("ectoparasitas")}
                    type="checkbox"
                    name="ectoparasitas"
                  />
                </label>
              </div>
              <div>
                <label className="flex items-center ml-1">
                  Mioclonias
                  <input
                    {...register("mioclonias")}
                    className="ml-1"
                    type="checkbox"
                  />
                </label>
              </div>
              <div>
                <label className="flex items-center ml-1">
                  Vômito
                  <input
                    className="ml-1"
                    {...register("vomito")}
                    type="checkbox"
                  />
                </label>
              </div>
              <div>
                <label className="flex items-center ml-1">
                  Diarreia
                  <input
                    className="ml-1"
                    {...register("diarreia")}
                    type="checkbox"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="body-modal">
          <Input
            type="text"
            {...register("linfonodos")}
            placeholder="Linfonodos"
            error={errors?.linfonodos?.message}
          />
          <Input
            type="text"
            {...register("inapatencia")}
            placeholder="Inapatencia"
            error={errors?.inapatencia?.message}
          />
          <Input
            type="text"
            {...register("secrecoesPatologicas")}
            placeholder="Secreções Patológicas? Local?"
            error={errors?.secrecoesPatologicas?.message}
          />
          <Input
            type="text"
            {...register("alteracaoComportamental")}
            placeholder="Alteração Corpontamental? Qual?"
            error={errors?.alteracaoComportamental?.message}
          />

          <select className="vet-input " {...register("mucosas")}>
            <option value="">Mucosas</option>
            <option value="Normocoradas">Normocoradas</option>
            <option value="Hipocoradas">Hipocoradas</option>
            <option value="Hiperemicas">Hiperemicas</option>
            <option value="Ictéric">Ictérica</option>
          </select>
          <select className="vet-input " {...register("tpc")}>
            <option value="">TPC</option>
            <option value="Normal, 3 segundos">Normal, 3 segundos</option>
            <option value="Aumentado, 4/5 segundos">
              Aumentado, 4/5 segundos
            </option>
            <option value="Reduzido">Reduzido</option>
          </select>
          <select className="vet-input " {...register("turgorCutaneo")}>
            <option value="">Turgor Cutâneo</option>
            <option value="Normal">Normal</option>
            <option value="Reduzido-Desidratação">Desidratação</option>
          </select>
          <select className="vet-input " {...register("desidratacao")}>
            <option value="">Desidratação</option>
            <option value="Leve (4 a 5%)">Leve (4 a 5%)</option>
            <option value="Moderada (6 a 8%)">Moderada (6 a 8%)</option>
            <option value="Grave (9 a 10%)">Grave (9 a 10%)</option>
          </select>
          <select className="vet-input " {...register("prurido")}>
            <option value="">Prurido</option>
            <option value="Grave">Grave</option>
            <option value="Moderado">Moderado</option>
            <option value="Leve">Leve</option>
            <option value="Ausente">Ausente</option>
          </select>
          <select className="vet-input " {...register("calculoDentario")}>
            <option value="">Calculo Dentario</option>
            <option value="Grave">Grave</option>
            <option value="Moderado">Moderado</option>
            <option value="Leve">Leve</option>
            <option value="Ausente">Ausente</option>
          </select>
          <select className="vet-input " {...register("auscultacaoPulmonar")}>
            <option value="">Auscultação Pulmonar</option>
            <option value="Limpa">Limpa</option>
            <option value="Ruidosa">Ruidosa</option>
            <option value="Creptação">Creptação</option>
          </select>
          <select className="vet-input " {...register("auscultacaoCardiaca")}>
            <option value="">Auscultação Cardiaca</option>
            <option value="Normal">Normal</option>
            <option value="Sopro Leve">Sopro Leve</option>
            <option value="Sopro Moderado">Sopro Moderado</option>
          </select>
          <select className="vet-input " {...register("reflexoToce")}>
            <option value="">Reflexo Tosse</option>
            <option value="Positivo">Positivo</option>
            <option value="Negativo">Negativo</option>
          </select>
          <select className="vet-input " {...register("emagrecimento")}>
            <option value="">Emagrecimento</option>
            <option value="Acentuado">Acentuado</option>
            <option value="Progressivo">Progressivo</option>
            <option value="Leve">Leve</option>
            <option value="Ausente">Ausente</option>
          </select>
        </div>
        <div className="flex flex-col w-full items-center justify-center">
          <h2>Sistema Cardio Respiratorio</h2>
          <div className="flex w-full justify-between">
            <label className="flex items-center ml-2 w-1/8">
              Cansaço
              <input
                className="ml-2"
                {...register("cansaco")}
                type="checkbox"
              />
            </label>
            <label className="flex items-center ml-2 w-2/8">
              Tosse
              <input className="ml-2" {...register("tosse")} type="checkbox" />
            </label>
            <Input
              type="text"
              {...register("pulso")}
              placeholder="Pulso"
              error={errors?.pulso?.message}
            />
            <Input
              type="text"
              {...register("fc")}
              placeholder="FC"
              error={errors?.fc?.message}
            />
            <Input
              type="text"
              {...register("fr")}
              placeholder="FR"
              error={errors?.fr?.message}
            />
          </div>
        </div>
      </form>
      <button
        onClick={handleSubmit(submitForm)}
        className="vet-botao mt-4"
        type="submit"
      >
        Adicionar
      </button>
    </div>
  );
};

export default AnamneseForm;
