import React from "react";

interface Owner {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  nascimento: string;
}

interface OwnerContextProps {
  contextOwner: Owner | null;
  setContextOwner: React.Dispatch<React.SetStateAction<Owner | null>>;
}

const OwnerContext = React.createContext<OwnerContextProps | undefined>(
  undefined
);

export default OwnerContext;
