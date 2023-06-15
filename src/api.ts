interface Endereco {
  rua: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  numero: string;
  complemento: string;
}

interface Veterinario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  crv: string;
  especialidade: string;
  endereco: Endereco;
}

export async function fetchVeterinarios(): Promise<Veterinario[]> {
  try {
    const response = await fetch("http://localhost:8080/veterinario");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const veterinarios: Veterinario[] = await response.json();
    return veterinarios;
  } catch (error) {
    console.error("There was an error fetching the veterinarios", error);
    // Você pode decidir o que retornar em caso de erro.
    // Neste exemplo, retornamos um array vazio.
    return [];
  }
}
