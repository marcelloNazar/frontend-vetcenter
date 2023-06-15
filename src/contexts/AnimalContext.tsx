// AnimalContext.tsx
import { createContext, ReactNode, useState } from "react";
import { Animal } from "@/types";

interface AnimalContextType {
  animal: Animal | null;
  setAnimal: (animal: Animal | null) => void;
}

interface Props {
  children: ReactNode;
}

export const AnimalContext = createContext<AnimalContextType>({
  animal: null,
  setAnimal: () => {},
});

export const AnimalProvider: React.FC<Props> = ({ children }) => {
  const [animal, setAnimal] = useState<Animal | null>(null);

  return (
    <AnimalContext.Provider value={{ animal, setAnimal }}>
      {children}
    </AnimalContext.Provider>
  );
};
