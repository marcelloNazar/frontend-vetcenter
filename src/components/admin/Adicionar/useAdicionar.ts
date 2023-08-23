import React, { useState, useEffect } from "react";
import { Veterinario } from "@/types/types";
import http from "@/utils/http";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import { Atendimento } from "@/types/types";

export const useAdicionar = ()=>{
    const [veterinarios, setVeterinarios] = useState<Veterinario[]>([]);
    const [selectedVeterinario, setSelectedVeterinario] = useState<string>("");
    const [atendimentos, setAtendimentos] = useState<any[]>([]);
    const [atendimentosConcluidos, setAtendimentoConcluidos] = useState<any[]>(
      []
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAtendimento, setCurrentAtendimento] =
      useState<Atendimento | null>(null);
    const [isPago, setIsPago] = useState(false);
  
    const { atendimento, animal, setAtendimento, setAnimal, setProprietario } =
      useAtendimento();
  
    useEffect(() => {
      fetchVeterinarios();
  
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
  
    const fetchAtendimentosConcluidos = async () => {
      http
        .get("adm/atendimento/concluidos")
        .then((r) => setAtendimentoConcluidos(r.data.content))
        .catch((e) => {
          console.error("Erro:", e);
        });
    };
  
    const abrirModal = (atendimento: Atendimento) => {
      setCurrentAtendimento(atendimento);
      setIsPago(atendimento.pago);
      setIsModalOpen(true);
    };
    const fecharModal = () => {
      setIsModalOpen(false);
    };
  
    const handlePagoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsPago(event.target.checked);
    };
    const atualizarAtendimento = () => {
      if (currentAtendimento) {
        const body = { ...currentAtendimento, pago: isPago };
  
        http
          .put(`adm/atendimento/${currentAtendimento.id}`, body)
          .then((r) => {
            if (r.status === 200) {
              fecharModal();
              fetchAtendimentosConcluidos();
            } else {
              alert(" atendimento");
            }
          })
          .catch((error) => alert("Erro ao atualizar o atendimento"));
      }
    };
  
    const criarAtendimento = () => {
      if (!animal) {
        alert("Selecione um Animal");
      }
      const body = {
        animalId: animal?.id,
        veterinarioId: selectedVeterinario ? selectedVeterinario : 1,
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
  
    const handleDelete = (id: number) => {
      http
        .delete(`atendimento/${id}`)
        .then((response) => {
          fetchAtendimentos();
        })
        .catch((error) => console.error("Error:", error));
    };
  
    const onAtendimentoClick = (atendimento: Atendimento) => {
      setAtendimento(atendimento);
      setAnimal(atendimento.animal);
      setProprietario(atendimento.proprietario);
    };

    return{
        atendimento,
        selectedVeterinario,
        setSelectedVeterinario,
        veterinarios,
        criarAtendimento,
        atendimentos,
        onAtendimentoClick,
        handleDelete,
        atendimentosConcluidos,
        abrirModal,
        isModalOpen,
        fecharModal,
        currentAtendimento,
        isPago,
        handlePagoChange,
        atualizarAtendimento
    }
}