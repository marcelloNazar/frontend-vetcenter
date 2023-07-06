import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import ProdServ from "./ProdServ";
import { Atendimento } from "@/types/types";
import { useAtendimento } from "@/contexts/AtendimentoContext";

//Componente de atendimento para a screen do veterinario
const AtendimentoComponent: React.FC = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [atendimentosConcluidos, setAtendimentosConcluidos] = useState<
    Atendimento[]
  >([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  const { atendimento, setAtendimento, setAnimal, setProprietario } =
    useAtendimento();

  useEffect(() => {
    fetchAtendimentos();
    fetchAtendimentosConcluidos();
  }, [atendimento]);

  const fetchAtendimentos = async () => {
    http
      .get("atendimento/lista")
      .then((r) => setAtendimentos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const fetchAtendimentosConcluidos = async () => {
    http
      .get("atendimento/concluidos")
      .then((r) => setAtendimentosConcluidos(r.data.content))
      .catch((e) => {
        console.error("Erro:", e);
      });
  };

  const onAtendimentoClick = (atendimento: Atendimento) => {
    setAtendimento(atendimento);
    setAnimal(atendimento.animal);
    setProprietario(atendimento.proprietario);
    setShowAddProducts(true);
  };

  return (
    <div className="vet-container overflow-hidden">
      <div className="vet-container flex-col h-full w-full justify-start p-2 overflow-hidden">
        {!atendimento ? (
          <>
            <div className="flex flex-col justify-start items-center w-full h-1/2 overflow-auto">
              <div className="flex justify-center w-full mb-2 border-black border-b">
                <h2>Lista de Espera</h2>
              </div>
              {atendimentos.map((atendimento, index) => (
                <div
                  key={index}
                  className="item-list dark:bg-gray-950"
                  onClick={() => onAtendimentoClick(atendimento)}
                >
                  <p>{atendimento.veterinario.nome}</p>
                  <p>{atendimento.animal.nome}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full h-1/2 overflow-auto justify-start ">
              <div className="flex justify-center border-t mb-2 border-black border-b ">
                <h2>Atendimentos Concluídos</h2>
              </div>
              {atendimentosConcluidos.map((atendimento, index) => (
                <div
                  key={index}
                  className="item-list dark:bg-gray-950"
                  onClick={() => onAtendimentoClick(atendimento)}
                >
                  <p>{atendimento.veterinario.nome}</p>
                  <p>{atendimento.animal.nome}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <ProdServ />
        )}
      </div>
    </div>
  );
};

export default AtendimentoComponent;
