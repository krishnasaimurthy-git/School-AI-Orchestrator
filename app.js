let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

async function startCamera() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" }
  });
  video.srcObject = stream;
}
function capture() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  document.getElementById("status").innerText = "Captured";
}
function goToPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function goBack(pageId) {
  goToPage(pageId);
}

// Show designation only for School Authority
document.getElementById("userType").addEventListener("change", function () {
  if (this.value === "school") {
    document.getElementById("schoolRole").style.display = "block";
  } else {
    document.getElementById("schoolRole").style.display = "none";
  }
});
