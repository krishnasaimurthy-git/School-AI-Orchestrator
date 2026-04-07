async function runOCR() {
  document.getElementById("status").innerText = "Running OCR...";

  let result = await Tesseract.recognize(canvas, 'eng');

  let text = result.data.text;
  let confidence = result.data.confidence;

  console.log(text);

  if (confidence < 85) {
    document.getElementById("status").innerText =
      "⚠ Need Manual Scrutiny (" + confidence.toFixed(1) + "%)";
  } else {
    document.getElementById("status").innerText =
      "✔ OCR OK (" + confidence.toFixed(1) + "%)";
  }

  validateSheet(text);
}

function validateSheet(text) {
  if (!text.toLowerCase().includes("essay")) {
    alert("❌ Upload Essay Sheet!");
  }
}
