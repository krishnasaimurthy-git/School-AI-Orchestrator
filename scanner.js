function ensurePortrait(canvas) {
  if (canvas.width > canvas.height) {
    let temp = document.createElement("canvas");
    temp.width = canvas.height;
    temp.height = canvas.width;

    let tctx = temp.getContext("2d");
    tctx.translate(temp.width / 2, temp.height / 2);
    tctx.rotate(Math.PI / 2);
    tctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    canvas.width = temp.width;
    canvas.height = temp.height;
    canvas.getContext("2d").drawImage(temp, 0, 0);
  }
}

function enhance(canvas) {
  let src = cv.imread(canvas);
  let gray = new cv.Mat();
  let dst = new cv.Mat();

  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

  cv.adaptiveThreshold(
    gray, dst, 255,
    cv.ADAPTIVE_THRESH_GAUSSIAN_C,
    cv.THRESH_BINARY,
    11, 2
  );

  cv.imshow(canvas, dst);

  src.delete(); gray.delete(); dst.delete();
}

function processScan() {
  ensurePortrait(canvas);
  enhance(canvas);
  document.getElementById("status").innerText = "Processed";
}

let stream;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }
    });

    document.getElementById("camera").srcObject = stream;
  } catch (err) {
    alert("Camera not working: " + err.message);
  }
}

function capture() {
  const video = document.getElementById("camera");
  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const img = canvas.toDataURL("image/jpeg");

  const preview = document.getElementById("preview");
  const image = document.createElement("img");
  image.src = img;
  image.style.width = "100px";

  preview.appendChild(image);
}
