import React, { useState } from "react";

interface EsteticaFormProps {
  onClose: () => void;
}

const EsteticaForm: React.FC<EsteticaFormProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    veterinarioId: 0,
    animalId: 0,
    produtosIds: [0],
    servicosIds: [0],
    recomendacaoConsulta: "",
    observacao: "",
    temperamento: "",
    sedativo: false,
    ouvido: false,
    pele: false,
    ectoparasitas: false,
    medicacao: false,
    horaTermino: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar a requisição POST
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Veterinário ID:
        <input
          type="number"
          name="veterinarioId"
          value={form.veterinarioId}
          onChange={handleChange}
        />
      </label>
      {/* Adicione os outros campos aqui */}
      <button className="vet-botao" type="submit">
        Submit
      </button>
    </form>
  );
};

export default EsteticaForm;
