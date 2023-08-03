import React, { useState, useEffect } from "react";
import http from "@/utils/http";
import ProdServ from "./ProdServ";
import { Atendimento } from "@/types/types";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import { TrashIcon } from "@heroicons/react/24/outline";

//Componente de atendimento para a screen do veterinario
const AtendimentoComponent: React.FC = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [atendimentosConcluidos, setAtendimentosConcluidos] = useState<
    Atendimento[]
  >([]);
  const [showAddProducts, setShowAddProducts] = useState(false);

  const {
    atendimento,
    animal,
    setAtendimento,
    setAnimal,
    setProprietario,
    setAnamnese,
  } = useAtendimento();

  useEffect(() => {
    fetchAtendimentos();
    fetchAtendimentosConcluidos();
    const interval = setInterval(() => {
      fetchAtendimentos();
      fetchAtendimentosConcluidos();
    }, 1 * 5 * 1000);
    return () => {
      clearInterval(interval);
    };
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
    setAnamnese(null);
    http
      .get(`anamnese/atendimento/${atendimento.id}`)
      .then((r) => setAnamnese(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const criarAtendimento = () => {
    if (animal) {
      const data = {
        animalId: animal.id,
      };

      http
        .post("atendimento", data)
        .then((response) => {
          const novoAtendimento = response.data;
          setAtendimento(novoAtendimento);
          setShowAddProducts(true);
          setAnamnese(null);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  const handleDelete = (id: number) => {
    http
      .delete(`atendimento/${id}`)
      .then((response) => {
        fetchAtendimentos();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="vet-container flex-col h-full w-full px-2 justify-start overflow-hidden">
      {!atendimento ? (
        <>
          <div className="flex flex-col justify-start items-center w-full h-1/2 overflow-auto">
            <div className="flex justify-center w-full mb-2 border-black border-b">
              <h2>Lista de Espera</h2>{" "}
            </div>
            {animal && (
              <div className="flex w-full justify-end pb-2 mb-2 border-b border-black">
                <button className="vet-botao" onClick={criarAtendimento}>
                  Criar Atendimento
                </button>
              </div>
            )}
            {atendimentos.map((atendimento, index) => (
              <div
                key={index}
                className="item-list dark:bg-gray-950"
                onClick={() => onAtendimentoClick(atendimento)}
              >
                <p className="flex w-1/2">
                  {atendimento.proprietario.nome
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </p>
                <p className="flex w-1/2">
                  <p className="mr-2">Animal:</p>
                  {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
                </p>
                <button onClick={() => handleDelete(atendimento.id)}>
                  <TrashIcon className="h-5 transform transition duration-500 hover:scale-110" />
                </button>
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
                <p>
                  {atendimento.proprietario.nome
                    .split(" ")
                    .slice(0, 2)
                    .join(" ")}
                </p>
                <p className="flex w-1/2">
                  <p className="mr-2">Animal:</p>
                  {atendimento.animal.nome.split(" ").slice(0, 1).join(" ")}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <ProdServ />
      )}
    </div>
  );
};

export default AtendimentoComponent;
