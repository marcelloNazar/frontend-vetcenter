import React, { useState, useContext, useEffect } from "react";
import { Veterinario } from "@/types/types";
import { AnimalContext } from "../../contexts/AnimalContext";
import http from "@/utils/http";

const Estetica: React.FC = () => {
  const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
  const [selectedVeterinario, setSelectedVeterinario] = useState<string>("");
  const [atendimentos, setAtendimentos] = useState<any[]>([]);
  const { animal } = useContext(AnimalContext);

  useEffect(() => {
    fetchVeterinarios();
    fetchAtendimentos();
  }, []);

  const fetchVeterinarios = () => {
    http
      .get("adm/atendimento/veterinario")
      .then((r) => setVeterinarios(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchAtendimentos = async () => {
    http
      .get("adm/atendimento")
      .then((r) => setAtendimentos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const criarAtendimento = () => {
    const body = {
      animalId: animal?.id,
      veterinarioId: selectedVeterinario,
    };
    http
      .post("adm/atendimento", body)
      .then((r) => {
        if (r.status === 201) {
          fetchAtendimentos();
        } else {
          alert("Erro ao adicionar o atendimento");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="flex justify-center w-full  border-black border-b">
        <h2>Lista de estetica</h2>
      </div>
      <header className="flex w-full justify-between p-4">
        <div></div>
        <button onClick={criarAtendimento}>Criar Estetica</button>
      </header>
      <div className="vet-container flex-col h-full gap-1 justify-start overflow-auto"></div>
    </div>
  );
};

export default Estetica;
