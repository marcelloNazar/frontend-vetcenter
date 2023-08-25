import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function atendimentoPDF(atendimento, pagamentos, totalPagamentos, restante) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  function formatarValor(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  function formatarData(dataStr) {
    const partes = dataStr.toString().split(",");

    if (partes.length !== 3) {
      return "Formato de data inválido. Use AAAA,M,D";
    }

    const ano = partes[0].trim();
    const mes = partes[1].trim().padStart(2, "0");
    const dia = partes[2].trim().padStart(2, "0");

    return `${dia}/${mes}/${ano}`;
  }

  function formatarData2(data) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return new Intl.DateTimeFormat("pt-BR", options).format(new Date(data));
  }

  const produtosList = atendimento.produtos.map((prod) => {
    return [
      prod.nome,
      prod.quantidade,
      formatarValor(prod.valor),
      formatarValor(prod.valor * prod.quantidade),
    ];
  });
  const ServicosList = atendimento.servicos.map((prod) => {
    return [
      prod.nome,
      prod.quantidade,
      formatarValor(prod.valor),
      formatarValor(prod.valor * prod.quantidade),
    ];
  });
  const PagamentosList = pagamentos.map((prod) => {
    return ["Adiantamento", prod.data, prod.metodo, formatarValor(prod.valor)];
  });

  const title = [
    {
      text: "FATURA DE SERVIÇOS E PRODUTOS",
      fontSize: 15,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 0],
    },
  ];

  const subTitle = [
    {
      alignment: "between",
      margin: [15, 0, 0, 0],
      columns: [
        {
          width: "*",
          text: `Data Abertura: ${formatarData(atendimento.data)}`,
        },
        {
          width: "*",
          text: `Emitido em: ${formatarData2(Date())}`,
        },
      ],
    },
    {
      margin: [3, 0, 0, 0],
      text: " _____________________________________________________________________________________________________________",
    },
  ];

  const subTitle2 = [
    {
      alignment: "between",
      margin: [0, 0, 0, 0],
      columns: [
        {
          width: "*",
          text: `Responsavel: ${atendimento.veterinario.nome}`,
        },
        {
          width: "*",
          text: `-`,
        },
      ],
    },

    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `Proprietario: ${atendimento.proprietario.nome}`,
        },
        {
          width: "*",
          text: `CPF/CNPJ: ${atendimento.proprietario.cpf}`,
        },
      ],
    },
    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `Animal: ${atendimento.animal.nome}`,
        },
        {
          width: "*",
          text: `Especie: ${atendimento.animal.especie}`,
        },
        {
          width: "*",
          text: `Raça: ${atendimento.animal.raca}`,
        },
        {
          width: "*",
          text: `Sexo: ${atendimento.animal.sexo}`,
        },
      ],
    },
    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `Endereço: ${atendimento.proprietario.endereco.rua}, ${atendimento.proprietario.endereco.numero} - ${atendimento.proprietario.endereco.complemento}`,
        },
        {
          width: 198,
          text: `Telefone 1: ${atendimento.proprietario.telefone}`,
        },
      ],
    },
    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `Bairro: ${atendimento.proprietario.endereco.bairro}`,
        },
        {
          width: 198,
          text: `Telefone 2: ${atendimento.proprietario.telefone1}`,
        },
      ],
    },
    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `Cidade / UF: ${atendimento.proprietario.endereco.cidade} / ${atendimento.proprietario.endereco.uf}`,
        },
        {
          width: 198,
          text: `Telefone 3: ${atendimento.proprietario.telefone2}`,
        },
      ],
    },
    {
      alignment: "between",
      columns: [
        {
          width: "*",
          text: `CEP: ${atendimento.proprietario.endereco.cep}`,
        },
        {
          width: 198,
          text: `-`,
        },
      ],
    },
    {
      margin: [4, 0, 0, 0],
      text: " _______________________________________________________________________________________________________",
    },
  ];

  const rodape = [
    {
      margin: [4, 0, 0, 0],
      text: "VetCenter __________________________________________________________________________________________________",
    },
  ];

  const produtos = [
    {
      style: "tableExample",
      table: {
        headerRows: 1,
        widths: ["*", 10, 80, 80],
        body: [
          [
            { text: "PRODUTOS", style: "tableHeader" },
            { text: "Q", style: "tableHeader" },
            { text: "Preço Unit.", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ...produtosList,
          [
            { text: "SUBTOTAL:" },
            { text: "" },
            { text: "" },
            { text: formatarValor(atendimento.total) },
          ],
          [{ text: "" }, { text: "" }, { text: "" }, { text: "-" }],
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];
  const servicos = [
    {
      style: "tableExample",
      table: {
        headerRows: 1,
        widths: ["*", 10, 80, 80],
        body: [
          [
            { text: "SERVIÇOS", style: "tableHeader" },
            { text: "Q", style: "tableHeader" },
            { text: "Preço Unit.", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ...ServicosList,
          [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];
  const adiantamento = [
    {
      style: "tableExample",
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", 80],
        body: [
          [
            { text: "ADIANTAMENTOS", style: "tableHeader" },
            { text: "Data", style: "tableHeader" },
            { text: "Metodo de Pagamento", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ...PagamentosList,

          [
            { text: "SUBTOTAL:" },
            { text: "" },
            { text: "" },
            { text: formatarValor(totalPagamentos) },
          ],
          [{ text: "" }, { text: "" }, { text: "" }, { text: "-" }],
          [
            { text: "TOTAL A PAGAR:" },
            { text: "" },
            { text: "" },
            { text: formatarValor(restante) },
          ],
          [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        ],
      },
      layout: "lightHorizontalLines",
    },
  ];

  const docDefinitions = {
    pagesize: "A4",
    pageMargins: [15, 50, 15, 25],

    header: [title, subTitle],
    content: [subTitle2, servicos, produtos, adiantamento],
    footer: [rodape],
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default atendimentoPDF;
