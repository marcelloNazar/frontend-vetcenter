import React, { createContext, useState, ReactNode } from "react";
import { Atendimento, Animal, Owner } from "@/types/types";

type AtendimentoContextType = {
  atendimento: Atendimento | null;
  setAtendimento: (atendimento: Atendimento | null) => void;
  resetAtendimento: () => void;
  removeAtendimento: () => void;
  proprietario: Owner | null;
  setProprietario: (proprietario: Owner | null) => void;
  animal: Animal | null;
  setAnimal: (animal: Animal | null) => void;
};

const AtendimentoContext = createContext<AtendimentoContextType | undefined>(
  undefined
);

type AtendimentoProviderProps = {
  children: ReactNode;
};

export const AtendimentoProvider: React.FC<AtendimentoProviderProps> = ({
  children,
}) => {
  const [atendimento, setAtendimento] = useState<Atendimento | null>(null);
  const [proprietario, setProprietario] = useState<Owner | null>(null);
  const [animal, setAnimal] = useState<Animal | null>(null);

  const resetAtendimento = () => {
    setAtendimento(null);
    setProprietario(null);
    setAnimal(null);
  };

  const removeAtendimento = () => {
    setAtendimento(null);
  };

  return (
    <AtendimentoContext.Provider
      value={{
        atendimento,
        setAtendimento,
        resetAtendimento,
        removeAtendimento,
        proprietario,
        setProprietario,
        animal,
        setAnimal,
      }}
    >
      {children}
    </AtendimentoContext.Provider>
  );
};

export const useAtendimento = () => {
  const context = React.useContext(AtendimentoContext);
  if (context === undefined) {
    throw new Error("useAtendimento must be used within a AtendimentoProvider");
  }
  return context;
};

export default AtendimentoContext;
