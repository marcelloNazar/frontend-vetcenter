import { createContext, useContext, useState } from "react";

interface Owner {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  nascimento: string;
  sexo: string;
  nomeMae: string;
  endereco: {
    rua: string;
    bairro: string;
    cep: string;
    cidade: string;
    uf: string;
    numero: string;
    complemento: string;
  };
}

interface SelectedOwnerContextType {
  selectedOwner: Owner | null;
  setSelectedOwner: React.Dispatch<React.SetStateAction<Owner | null>>;
}

const SelectedOwnerContext = createContext<
  SelectedOwnerContextType | undefined
>(undefined);

// New interface for children props
interface SelectedOwnerProviderProps {
  children: React.ReactNode;
}

// Updated SelectedOwnerProvider using the new interface
export const SelectedOwnerProvider: React.FC<SelectedOwnerProviderProps> = ({
  children,
}) => {
  const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);

  return (
    <SelectedOwnerContext.Provider value={{ selectedOwner, setSelectedOwner }}>
      {children}
    </SelectedOwnerContext.Provider>
  );
};

export const useSelectedOwner = (): SelectedOwnerContextType => {
  const context = useContext(SelectedOwnerContext);
  if (!context) {
    throw new Error(
      "useSelectedOwner must be used within a SelectedOwnerProvider"
    );
  }
  return context;
};
