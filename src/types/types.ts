export interface Owner {
  id: number;
  nome: string;
  telefone: string;
  telefone1: string;
  telefone2: string;
  cpf: string;
  nascimento: string;
  sexo: string;
  nomeMae: string;
  divida: number;
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

export interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  sexo: string;
  peso: string;
  idade: string;
  cor: string;
  temperamento: string;
  castrado: boolean;
  data: string;
  nascimento: string;
  proprietario: Owner;
}

export interface Veterinario {
  id: number;
  username: string;
  password: string;
  nome: string;
  email: string;
  telefone: string;
  role: string;
  crmv: string;
}

export interface Atendimento {
  id: number;
  veterinario: Veterinario;
  animal: Animal;
  proprietario: Owner;
  pago: boolean;
  data: string;
  total: number;
  produtos: Produto[];
  servicos: Servico[];
}

export interface Produto {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  quantidade: number;
}

export interface Servico {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  quantidade: number;
}

export interface Anamnese {
  id: number;
  veterinarioId: number;
  animalId: number;
  anamnese: string;
  estado: string;
  mucosas: string;
  linfonodos: string;
  tpc: string;
  turgorCutaneo: string;
  desidratacao: string;
  ectoparasitas: boolean;
  mioclonias: boolean;
  prurido: string;
  vomito: boolean;
  diarreia: boolean;
  inapatencia: string;
  secrecoesPatologicas: string;
  calculoDentario: string;
  auscultacaoPulmonar: string;
  auscultacaoCardiaca: string;
  reflexoToce: string;
  emagrecimento: string;
  alteracaoComportamental: string;
  observacoes: string;
  extoscopia: string;
  cavidadeAbdominal: string;
  cabecaPescoco: string;
  sistemaNervoso: string;
  sistemaLocomotor: string;
  cansaco: boolean;
  tosse: boolean;
  pulso: string;
  fc: string;
  fr: string;
  observacoes2: string;
  examesComplementares: string;
  diagnostico: string;
  prognostico: string;
  tratamento: string;
  retorno: string;
  data: string;
}

export interface AnamneseRecord {
  id: number;
  veterinario: Veterinario;
  animal: Animal;
  anamnese: string;
  estado: string;
  mucosas: string;
  linfonodos: string;
  tpc: string;
  turgorCutaneo: string;
  desidratacao: string;
  ectoparasitas: boolean;
  mioclonias: boolean;
  prurido: string;
  vomito: boolean;
  diarreia: boolean;
  inapatencia: string;
  secrecoesPatologicas: string;
  calculoDentario: string;
  auscultacaoPulmonar: string;
  auscultacaoCardiaca: string;
  reflexoToce: string;
  emagrecimento: string;
  alteracaoComportamental: string;
  observacoes: string;
  extoscopia: string;
  cavidadeAbdominal: string;
  cabecaPescoco: string;
  sistemaNervoso: string;
  sistemaLocomotor: string;
  cansaco: boolean;
  tosse: boolean;
  pulso: string;
  fc: string;
  fr: string;
  observacoes2: string;
  examesComplementares: string;
  diagnostico: string;
  prognostico: string;
  tratamento: string;
  retorno: string;
  data: string;
}
