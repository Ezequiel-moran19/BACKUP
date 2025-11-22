export function convertirHtmlPdf(divElement) {
    
  const original = document.getElementById(divElement);
  const clone = original.cloneNode(true);

  const botones = clone.querySelectorAll("button, a.btn");
  botones.forEach(b => b.remove());

  const titulo = clone.querySelector("#idTitulo");
  if (titulo) titulo.textContent = "Resumen de Compra";

  const opciones = {
    margin: [10, 10, 10, 10],
    filename: "comprobante.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf().set(opciones).from(clone).save();
}
