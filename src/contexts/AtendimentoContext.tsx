import React, { createContext, useState, ReactNode } from "react";
import { Atendimento, Animal, Owner, AnamneseRecord } from "@/types/types";

type AtendimentoContextType = {
  atendimento: Atendimento | null;
  setAtendimento: (atendimento: Atendimento | null) => void;
  resetAtendimento: () => void;
  removeAtendimento: () => void;
  proprietario: Owner | null;
  setProprietario: (proprietario: Owner | null) => void;
  animal: Animal | null;
  setAnimal: (animal: Animal | null) => void;
  anamnese: AnamneseRecord | null;
  setAnamnese: (anamnese: AnamneseRecord | null) => void;
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
  const [anamnese, setAnamnese] = useState<AnamneseRecord | null>(null); // Adicionei a anamnese aqui

  const resetAtendimento = () => {
    setAtendimento(null);
    setProprietario(null);
    setAnimal(null);
    setAnamnese(null); // E também aqui
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
        anamnese, // E aqui
        setAnamnese, // E aqui
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
