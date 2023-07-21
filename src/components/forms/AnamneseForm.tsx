import React, { useState } from "react";
import { Atendimento } from "@/types/types";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
interface AnamneseFormProps {
  selectedAtendimento: Atendimento;
  onClose: () => void;
}

//Formulario para cadastro de anamnese
const AnamneseForm: React.FC<AnamneseFormProps> = ({
  selectedAtendimento,
  onClose,
}) => {
  const [formValues, setFormValues] = useState({
    anamnese: "",
    estado: "",
    mucosas: "",
    linfonodos: "",
    tpc: "",
    turgorCutaneo: "",
    desidratacao: "",
    ectoparasitas: false,
    mioclonias: false,
    prurido: "",
    vomito: false,
    diarreia: false,
    inapatencia: "",
    secrecoesPatologicas: "",
    calculoDentario: "",
    auscultacaoPulmonar: "",
    auscultacaoCardiaca: "",
    reflexoToce: "",
    emagrecimento: "",
    alteracaoComportamental: "",
    observacoes: "",
    extoscopia: "",
    cavidadeAbdominal: "",
    cabecaPescoco: "",
    sistemaNervoso: "",
    sistemaLocomotor: "",
    cansaco: false,
    tosse: false,
    pulso: "",
    fc: "",
    fr: "",
    observacoes2: "",
    examesComplementares: "",
    diagnostico: "",
    prognostico: "",
    tratamento: "",
    retorno: "",
    data: "",
  });

  const { setAnamnese } = useAtendimento();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let inputValue: string | boolean;

    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;

    if (target.type === "checkbox") {
      inputValue = (target as HTMLInputElement).checked;
    } else {
      inputValue = target.value;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [target.name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAtendimento) {
      const anamneseRecord = {
        atendimentoId: selectedAtendimento.id,
        ...formValues,
      };
      http
        .post("anamnese", anamneseRecord)
        .then((r) => {
          if (r.status === 201) {
            setAnamnese(r.data);
            onClose();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="modal-container">
      <div className="w-full flex flex-col pr-2">
        <div className="w-full mb-2">
          <textarea
            className="vet-input h-full w-full"
            name="anamnese"
            placeholder="Anamnese"
            value={formValues.anamnese}
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex gap-4">
          <input
            className="vet-input w-1/3 -mr-1"
            type="text"
            name="estado"
            placeholder="Estado Geral"
            value={formValues.estado}
            onChange={handleChange}
          />
          <div className="flex w-2/3 p-1 justify-between">
            <label className="flex items-center ml-1">
              Ectoparasitas
              <input
                className="ml-1"
                type="checkbox"
                name="ectoparasitas"
                checked={formValues.ectoparasitas}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center ml-1">
              Mioclonias
              <input
                className="ml-1"
                type="checkbox"
                name="mioclonias"
                checked={formValues.mioclonias}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center ml-1">
              Vômito
              <input
                className="ml-1"
                type="checkbox"
                name="vomito"
                checked={formValues.vomito}
                onChange={handleChange}
              />
            </label>
            <label className="flex items-center ml-1">
              Diarreia
              <input
                className="ml-1"
                type="checkbox"
                name="diarreia"
                checked={formValues.diarreia}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </div>
      <form className="body-modal" onSubmit={handleSubmit}>
        <input
          className="vet-input"
          type="text"
          name="linfonodos"
          placeholder="Linfonodos? Qual(is)"
          value={formValues.linfonodos}
          onChange={handleChange}
        />
        <input
          className="vet-input"
          type="text"
          name="inapatencia"
          placeholder="Inapatencia? Tempo?"
          value={formValues.inapatencia}
          onChange={handleChange}
        />
        <input
          className="vet-input"
          type="text"
          name="secrecoesPatologicas"
          placeholder="Secreções Patológicas? Local?"
          value={formValues.secrecoesPatologicas}
          onChange={handleChange}
        />
        <input
          className="vet-input"
          type="text"
          name="alteracaoComportamental"
          placeholder="Alteração Corpontamental? Qual?"
          value={formValues.alteracaoComportamental}
          onChange={handleChange}
        />
        <select
          className="vet-input "
          name="mucosas"
          value={formValues.mucosas}
          onChange={handleChange}
        >
          <option value="">Mucosas</option>
          <option value="Normocoradas">Normocoradas</option>
          <option value="Hipocoradas">Hipocoradas</option>
          <option value="Hiperemicas">Hiperemicas</option>
          <option value="Ictéric">Ictérica</option>
        </select>
        <select
          className="vet-input "
          name="tpc"
          value={formValues.tpc}
          onChange={handleChange}
        >
          <option value="">TPC</option>
          <option value="Normal, 3 segundos">Normal, 3 segundos</option>
          <option value="Aumentado, 4/5 segundos">
            Aumentado, 4/5 segundos
          </option>
          <option value="Reduzido">Reduzido</option>
        </select>
        <select
          className="vet-input "
          name="turgorCutaneo"
          value={formValues.turgorCutaneo}
          onChange={handleChange}
        >
          <option value="">Turgor Cutâneo</option>
          <option value="Normal">Normal</option>
          <option value="Reduzido-Desidratação">Desidratação</option>
        </select>
        <select
          className="vet-input "
          name="desidratacao"
          value={formValues.desidratacao}
          onChange={handleChange}
        >
          <option value="">Desidratação</option>
          <option value="Leve (4 a 5%)">Leve (4 a 5%)</option>
          <option value="Moderada (6 a 8%)">Moderada (6 a 8%)</option>
          <option value="Grave (9 a 10%)">Grave (9 a 10%)</option>
        </select>
        <select
          className="vet-input "
          name="prurido"
          value={formValues.prurido}
          onChange={handleChange}
        >
          <option value="">Prurido</option>
          <option value="Grave">Grave</option>
          <option value="Moderado">Moderado</option>
          <option value="Leve">Leve</option>
          <option value="Ausente">Ausente</option>
        </select>
        <select
          className="vet-input "
          name="calculoDentario"
          value={formValues.calculoDentario}
          onChange={handleChange}
        >
          <option value="">Calculo Dentario</option>
          <option value="Grave">Grave</option>
          <option value="Moderado">Moderado</option>
          <option value="Leve">Leve</option>
          <option value="Ausente">Ausente</option>
        </select>
        <select
          className="vet-input "
          name="auscultacaoPulmonar"
          value={formValues.auscultacaoPulmonar}
          onChange={handleChange}
        >
          <option value="">Auscultação Pulmonar</option>
          <option value="Limpa">Limpa</option>
          <option value="Ruidosa">Ruidosa</option>
          <option value="Creptação">Creptação</option>
        </select>
        <select
          className="vet-input "
          name="auscultacaoCardiaca"
          value={formValues.auscultacaoCardiaca}
          onChange={handleChange}
        >
          <option value="">Auscultação Cardiaca</option>
          <option value="Normal">Normal</option>
          <option value="Sopro Leve">Sopro Leve</option>
          <option value="Sopro Moderado">Sopro Moderado</option>
        </select>
        <select
          className="vet-input "
          name="reflexoToce"
          value={formValues.reflexoToce}
          onChange={handleChange}
        >
          <option value="">Reflexo Tosse</option>
          <option value="Positivo">Positivo</option>
          <option value="Negativo">Negativo</option>
        </select>
        <select
          className="vet-input "
          name="emagrecimento"
          value={formValues.emagrecimento}
          onChange={handleChange}
        >
          <option value="">Emagrecimento</option>
          <option value="Acentuado">Acentuado</option>
          <option value="Progressivo">Progressivo</option>
          <option value="Leve">Leve</option>
          <option value="Ausente">Ausente</option>
        </select>
      </form>
      <div className="flex flex-col w-full items-center justify-center">
        <h2>Sistema Cardio Respiratorio</h2>
        <div className="flex w-full justify-between">
          <label className="flex items-center ml-2 w-1/8">
            Cansaço
            <input
              className="ml-2"
              type="checkbox"
              name="cansaco"
              checked={formValues.cansaco}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center ml-2  w-1/8">
            Tosse
            <input
              className="ml-2"
              type="checkbox"
              name="tosse"
              checked={formValues.tosse}
              onChange={handleChange}
            />
          </label>
          <input
            className="vet-input w-1/4"
            type="text"
            name="pulso"
            placeholder="Pulso"
            value={formValues.pulso}
            onChange={handleChange}
          />
          <input
            className="vet-input w-1/4"
            type="text"
            name="fc"
            placeholder="FC"
            value={formValues.fc}
            onChange={handleChange}
          />
          <input
            className="vet-input w-1/4"
            type="text"
            name="fr"
            placeholder="FR"
            value={formValues.fr}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={handleSubmit} className="vet-botao mt-8" type="submit">
        Adicionar
      </button>
    </div>
  );
};

export default AnamneseForm;
