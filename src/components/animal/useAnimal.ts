import { useState, useEffect } from "react";
import { useAtendimento } from "@/contexts/AtendimentoContext";
import { Animal as AnimalType } from "@/types/types";
import http from "@/utils/http";

export const useAnimal = () => {
  const [animals, setAnimals] = useState<AnimalType[]>([]);
  const [newAnimal, setNewAnimal] = useState<Partial<AnimalType>>({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const { animal, proprietario, setAnimal, setAtendimento } = useAtendimento();

  useEffect(() => {
    if (proprietario) {
      fetchAnimais();
    }
  }, [proprietario]);

  useEffect(() => {
    if (animal) {
      handleClick(animal);
    }
  }, [animal]);

  const fetchAnimais = () => {
    http
      .get(`animal/proprietario/${proprietario?.id}`)
      .then((r) => setAnimals(r.data))
      .catch((e) => console.error("Error:", e));
  };

  const handleSubmit = (data: Partial<AnimalType>) => {
    if (proprietario) {
      const animalData = {
        ...data,
        proprietarioId: proprietario.id,
      };
      console.log(animalData);
      http
        .post("animal", animalData)
        .then((response) => {
          if (response.status === 201) {
            fetchAnimais();
            closeModal();
            setAnimal(null);
            setAnimal(response.data);
            setNewAnimal(response.data);
          } else {
            alert("Erro ao adicionar o animal");
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  const handleUpdate = (data: Partial<AnimalType>) => {
    http
      .put(`animal/${animal?.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          fetchAnimais();
          setAnimal(null);
          setAnimal(response.data);
          setNewAnimal(response.data);
          closeUpdateModal();
        } else {
          alert("Erro ao adicionar o animal");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalIsOpen(false);
  };

  const handleVoltar = () => {
    setAnimal(null);
    setAtendimento(null);
  };
  const handleClick = (animal: AnimalType) => {
    setAnimal(animal);
    setNewAnimal(animal);
  };

  function PrimeirasLetrasMaiusculas(str: string) {
    return str
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  }

  return {
    animal,
    proprietario,
    openModal,
    animals,
    handleClick,
    setUpdateModalIsOpen,
    handleVoltar,
    modalIsOpen,
    closeModal,
    handleSubmit,
    updateModalIsOpen,
    closeUpdateModal,
    newAnimal,
    handleUpdate,
  };
};
