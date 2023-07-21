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

const proprietarioValidator = Yup.object({
  nome: Yup.string().required("Obrigado informar o Nome"),
  telefone: Yup.string().required("Obrigado informar o telefone"),
  telefone1: Yup.string(),
  telefone2: Yup.string(),
  cpf: Yup.string().required("Obrigado informar o Cpf"),
  nascimento: Yup.string(),
  nomeMae: Yup.string().required("Obrigado informar o Nome da Mãe"),
  sexo: Yup.string().required("Obrigado informar o Sexo"),
  rua: Yup.string().required("Obrigado informar a Rua"),
  bairro: Yup.string().required("Obrigado informar o Bairro"),
  cep: Yup.string().required("Obrigado informar o CEP"),
  cidade: Yup.string().required("Obrigado informar a Cidade"),
  uf: Yup.string().required("Obrigado informar o Estado"),
  numero: Yup.string().required("Obrigado informar o Numero"),
  complemento: Yup.string(),
});

export const ProprietarioResolver = yupResolver(proprietarioValidator);

const veterinarioValidator = Yup.object({
  username: Yup.string().required("Obrigado informar o Sexo"),
  password: Yup.string().required("Obrigado informar a Senha"),
  role: Yup.string().required("Obrigado informar a Permissão"),
  nome: Yup.string().required("Obrigado informar o Nome"),
  telefone: Yup.string().required("Obrigado informar o telefone"),
  crmv: Yup.string().required("Obrigado informar o CRMV"),
  email: Yup.string().required("Obrigado informar o E-mail"),
});

export const VeterinarioResolver = yupResolver(veterinarioValidator);

const prodServValidator = Yup.object({
  nome: Yup.string().required("Obrigado informar o Nome"),
  descricao: Yup.string().required("Obrigado informar a Descrição"),
  valor: Yup.string().required("Obrigado informar o Preço"),
});

export const ProdServResolver = yupResolver(prodServValidator);
