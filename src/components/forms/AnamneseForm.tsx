import React, { useState } from "react";
import { Veterinario, Animal } from "@/types";

interface AnamneseFormProps {
  selectedVeterinario: Veterinario;
  animal: Animal;
  onClose: () => void;
}

const AnamneseForm: React.FC<AnamneseFormProps> = ({
  selectedVeterinario,
  animal,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let inputValue: string | boolean;

    if ((e.target as HTMLInputElement).type === "checkbox") {
      inputValue = (e.target as HTMLInputElement).checked;
    } else {
      inputValue = e.target.value;
    }

    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: inputValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const anamneseRecord = {
      veterinarioId: selectedVeterinario.id,
      animalId: animal.id,
      ...formValues,
    };

    const response = await fetch("http://localhost:8080/anamnese", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(anamneseRecord),
    });

    if (response.ok) {
      onClose();
    } else {
      console.error("Erro ao enviar o formulário de anamnese");
    }
  };

  return (
    <div className="modal-container">
      <form className="body-modal" onSubmit={handleSubmit}>
        <input
          className="vet-input"
          type="text"
          name="anamnese"
          placeholder="Anamnese"
          value={formValues.anamnese}
          onChange={handleChange}
        />
        <input
          className="vet-input"
          type="text"
          name="estado"
          placeholder="Estado Geral"
          value={formValues.estado}
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
        <input
          className="vet-input"
          type="text"
          name="linfonodos"
          placeholder="Linfonodos"
          value={formValues.linfonodos}
          onChange={handleChange}
        />
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
        <div className="flex p-2 justify-between">
          <label className="flex items-center ml-2">
            Ectoparasitas
            <input
              className="ml-2"
              type="checkbox"
              name="ectoparasitas"
              checked={formValues.ectoparasitas}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center ml-2">
            Mioclonias
            <input
              className="ml-2"
              type="checkbox"
              name="mioclonias"
              checked={formValues.mioclonias}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center ml-2">
            Vômito
            <input
              className="ml-2"
              type="checkbox"
              name="vomito"
              checked={formValues.vomito}
              onChange={handleChange}
            />
          </label>
          <label className="flex items-center ml-2">
            Diarreia
            <input
              className="ml-2"
              type="checkbox"
              name="diarreia"
              checked={formValues.diarreia}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
      <button onClick={handleSubmit} className="vet-botao mt-8" type="submit">
        Adicionar
      </button>
    </div>
  );
};

export default AnamneseForm;
