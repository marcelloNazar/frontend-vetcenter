import React, { useEffect, useState } from "react";
import { Veterinario } from "@/types";

interface VeterinarioListProps {
  setSelectedVeterinario: (veterinario: Veterinario) => void;
  closeModal: () => void;
}

const VeterinarioList: React.FC<VeterinarioListProps> = ({
  setSelectedVeterinario,
  closeModal,
}) => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/veterinario")
      .then((response) => response.json())
      .then((data) => setVeterinarios(data.content));
  }, []);

  return (
    <div>
      {veterinarios.map((veterinario, index) => (
        <div
          key={index}
          className="item-list"
          onClick={() => {
            setSelectedVeterinario(veterinario);
            closeModal();
          }}
        >
          <h2 className="">{veterinario.nome}</h2>
          <p>{veterinario.telefone}</p>
        </div>
      ))}
    </div>
  );
};

export default VeterinarioList;
