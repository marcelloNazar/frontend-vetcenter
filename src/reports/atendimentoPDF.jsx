import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

function atendimentoPDF(atendimento) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const title = [];
  const produtos = [];
  const servicos = [];
  const adiantamento = [];

  const docDefinitions = {
    pagesize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [title],
    content: [produtos],
    footer: [title],
  };

  pdfMake.createPdf(docDefinitions).download();
}

export default atendimentoPDF;
