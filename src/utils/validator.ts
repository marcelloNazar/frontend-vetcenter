import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const animalValidator = Yup.object({
  nome: Yup.string().required("Obrigado informar o Nome"),
  especie: Yup.string().required("Obrigado informar a Especie"),
  sexo: Yup.string().required("Obrigado informar o Sexo"),
  temperamento: Yup.string().required("Obrigado informar o Temperamento"),
  raca: Yup.string().required("Obrigado informar a Raça"),
  peso: Yup.string().required("Obrigado informar o Peso"),
  nascimento: Yup.string(),
  cor: Yup.string().required("Obrigado informar a Cor"),
  castrado: Yup.boolean(),
});

export const AnimalResolver = yupResolver(animalValidator);

const enderecoSchema = Yup.object({
  rua: Yup.string().required("Obrigado informar a Rua"),
  bairro: Yup.string().required("Obrigado informar o Bairro"),
  cep: Yup.string().required("Obrigado informar o CEP"),
  cidade: Yup.string().required("Obrigado informar a Cidade"),
  uf: Yup.string().required("Obrigado informar o Estado"),
  numero: Yup.string().required("Obrigado informar o Numero"),
  complemento: Yup.string(),
});

const proprietarioValidator = Yup.object({
  nome: Yup.string().required("Obrigado informar o Nome"),
  telefone: Yup.string()
    .required("Obrigado informar o telefone")
    .min(10, "O telefone deve ter no mínimo 10 caracteres")
    .max(16, "O telefone deve ter no máximo 11 caracteres"),
  telefone1: Yup.string()
    .required("Obrigado informar o telefone")
    .min(10, "O telefone deve ter no mínimo 10 caracteres")
    .max(16, "O telefone deve ter no máximo 11 caracteres"),
  telefone2: Yup.string(),
  cpf: Yup.string()
    .required("Obrigado informar o Cpf")
    .min(11, "O CPF deve ter no mínimo 11 caracteres")
    .max(18, "O CNPJ deve ter no mínimo 14 caracteres"),
  nascimento: Yup.string().required("Obrigado informar a Data de Nascimento"),
  nomeMae: Yup.string().required("Obrigado informar o Nome da Mãe"),
  sexo: Yup.string().required("Obrigado informar o Sexo"),
  endereco: enderecoSchema,
});

export const ProprietarioResolver = yupResolver(proprietarioValidator);

const veterinarioValidator = Yup.object({
  username: Yup.string().required("Obrigado informar o Nome de Usuario"),
  password: Yup.string().required("Obrigado informar a Senha"),
  role: Yup.string().required("Obrigado informar a Permissão"),
  nome: Yup.string().required("Obrigado informar o Nome"),
  telefone: Yup.string().required("Obrigado informar o telefone"),
  crmv: Yup.string().required("Obrigado informar o CRMV"),
  email: Yup.string(),
});

export const VeterinarioResolver = yupResolver(veterinarioValidator);

const prodServValidator = Yup.object({
  nome: Yup.string().required("Obrigado informar o Nome"),
  descricao: Yup.string(),
  valor: Yup.string().required("Obrigado informar o Preço"),
});

export const ProdServResolver = yupResolver(prodServValidator);

const anamnseseValidator = Yup.object({
  anamnese: Yup.string().required("Obrigado informar a Anamnese"),
  estado: Yup.string().required("Obrigado informar o Estado Geral"),
  mucosas: Yup.string().required("Campo Obrigatorio"),
  linfonodos: Yup.string().required("Campo Obrigatorio"),
  tpc: Yup.string().required("Campo Obrigatorio"),
  turgorCutaneo: Yup.string().required("Campo Obrigatorio"),
  desidratacao: Yup.string().required("Campo Obrigatorio"),
  ectoparasitas: Yup.boolean().required("Campo Obrigatorio"),
  mioclonias: Yup.boolean(),
  prurido: Yup.string().required("Campo Obrigatorio"),
  vomito: Yup.boolean(),
  diarreia: Yup.boolean(),
  inapatencia: Yup.string().required("Campo Obrigatorio"),
  secrecoesPatologicas: Yup.string().required("Campo Obrigatorio"),
  calculoDentario: Yup.string().required("Campo Obrigatorio"),
  auscultacaoPulmonar: Yup.string().required("Campo Obrigatorio"),
  auscultacaoCardiaca: Yup.string().required("Campo Obrigatorio"),
  reflexoToce: Yup.string().required("Campo Obrigatorio"),
  emagrecimento: Yup.string().required("Campo Obrigatorio"),
  alteracaoComportamental: Yup.string().required("Campo Obrigatorio"),
  cansaco: Yup.boolean(),
  tosse: Yup.boolean(),
  pulso: Yup.string().required("Obrigado informar o Nome de Usuario"),
  fc: Yup.string().required("Obrigado informar o Nome de Usuario"),
  fr: Yup.string().required("Obrigado informar o Nome de Usuario"),
});

export const AnamnseseResolver = yupResolver(anamnseseValidator);
