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
    {
      text: "FATURA DE SERVIÇOS E PRODUTOS",
      fontSize: 15,
      bold: true,
      margin: [175, 0, 0, 0],
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
    pageMargins: [15, 50, 15, 40],

    header: [title],
    content: [servicos, produtos, adiantamento],
    footer: [adiantamento],
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default atendimentoPDF;
