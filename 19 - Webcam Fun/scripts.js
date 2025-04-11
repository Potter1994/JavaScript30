const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

canvas.width = 640;
canvas.height = 480;

// 1. 先拿到用戶的視訊權限
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    // srcObject 才能接受 stream 的，必須 play 才會開始
    video.srcObject = stream;
    video.play();
  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });

/** 2.
 * canvas 使用 setInterval 或 requestAnimationFrame 來做到不斷更新畫布
 * 
 * requestAnimationFrame 效能較好是因為他是"瀏覽器主動安排"，setInterval 是你強制每隔多久做一次

差異一：時機配合螢幕刷新率
requestAnimationFrame：會在瀏覽器下一次畫面重繪之前執行 callback（通常 60 次/秒，也就是每 16.67ms 一次）。

setInterval(fn, 16)：則是不管畫面有沒有在更新，都會硬跑 fn。

📌 所以當你畫面沒有變、tab 是背景、畫面暫停時：

requestAnimationFrame：⚠️ 自動暫停執行，省電省 CPU！

setInterval：💥 還是一直跑，白白浪費資源！
 */
function startAnimation() {
  requestAnimationFrame(animation);

  function animation(t) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.putImageData(rgbSplit(imgData), 0, 0);

    requestAnimationFrame(animation);
  }
}

// 3. 效果，這也太難 XD
// 這邊是尻解答的作法
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function playSnapShotAudio() {
  snap.currentTime = 0;
  snap.play();
}

function takePhoto() {
  playSnapShotAudio();

  const data = canvas.toDataURL("image/webp");

  const img = document.createElement("img");
  const a = document.createElement("a");
  a.href = data;
  a.download = "handsome";
  img.src = data;

  a.append(img);
  strip.append(a);
}

// 4. 監聽視訊開始撥放 canvas 才開始畫
video.addEventListener("playing", startAnimation);
