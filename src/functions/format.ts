export function formatCPF(value: string) {
    if (!value) return "";

    const cleanedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanedValue.length <= 11) {
      // Formatação para CPF
      if (cleanedValue.length === 11) {
        const cpfDigits = cleanedValue.slice(0, 11);
        return cpfDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
      }
    } else {
      // Formatação para CNPJ
      const cnpjDigits = cleanedValue.slice(0, 14);
      return cnpjDigits.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }

    return cleanedValue; // Retorna o valor não formatado se não for válido
  }

  export function formatNumber(phoneNumber: string) {
    if (!phoneNumber) return "";

    let cleanedNumber = phoneNumber.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanedNumber.length > 11) {
      cleanedNumber = cleanedNumber.slice(0, 11); // Limita a 11 dígitos
    }

    if (cleanedNumber.length <= 10) {
      // Formatação para telefone fixo
      return cleanedNumber.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      // Formatação para telefone móvel
      return cleanedNumber.replace(
        /(\d{2})(\d{1})(\d{4})(\d{4})/,
        "($1) $2 $3-$4"
      );
    }
  }

  export function formatCEP(cep: string) {
    if (!cep) return "";

    let cleanedCEP = cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cleanedCEP.length > 8) {
      cleanedCEP = cleanedCEP.slice(0, 8); // Limita a 8 dígitos
    }

    return cleanedCEP.replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  export function formatWeight(peso: string) {
    if (!peso) return "";
  
    const cleanedPeso = peso.replace(/[^\d.]/g, ""); // Remove caracteres não numéricos exceto ponto
  
    const parts = cleanedPeso.split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
  
    const formattedDecimalPart = decimalPart.padEnd(3, '0'); // Adiciona zeros à direita se necessário
  
    return `${integerPart}.${formattedDecimalPart} Kg`;
  }

  export function formatarData(data: string) {
    const partesData = data.split("-");
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    return `${dia}/${mes}/${ano}`;
  }

  export function PrimeirasLetrasMaiusculas(str: string) {
    return str
      .split(" ")
      .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ");
  }

  export function letrasMaiusculas(str: string) {
    return str.toUpperCase()
  }