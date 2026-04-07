async function generatePDF() {
  const { jsPDF } = window.jspdf;

  let pdf = new jsPDF('p', 'mm', 'a4');

  let img = canvas.toDataURL("image/jpeg", 0.7);

  pdf.addImage(img, 'JPEG', 10, 10, 190, 270);

  pdf.save("scan.pdf");

  document.getElementById("status").innerText = "PDF Generated";
}
