const algListDiv = document.getElementById("algList");
const methodSelect = document.getElementById("methodSelect");
const randomBtn = document.getElementById("randomBtn");
let algsData = {};

async function loadAlgs() {
  const response = await fetch("algs.json");
  algsData = await response.json();
  populateMethods();
  showAlgorithms();
}

function populateMethods() {
  for (const key in algsData) {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${key} (${algsData[key].length})`;
    methodSelect.appendChild(option);
  }
}

function showAlgorithms() {
  const method = methodSelect.value;
  algListDiv.innerHTML = "";
  let items = method === "all" ? Object.values(algsData).flat() : algsData[method] || [];
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "algItem";
    const img = document.createElement("img");
    img.className = "alg-image";
    img.src = generateCaseImage(item.case); // automatic image generation
    div.innerHTML = `<span class="case-name">${item.case}</span><span class="alg-code">${item.alg}</span>`;
    div.appendChild(img);
    algListDiv.appendChild(div);
  });
}

function generateCaseImage(caseName) {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#3498db";
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(caseName, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

function showRandom() {
  let items = methodSelect.value === "all" ? Object.values(algsData).flat() : algsData[methodSelect.value] || [];
  if (items.length === 0) return;
  const rand = items[Math.floor(Math.random() * items.length)];
  alert(`Random Case Practice:\n\n${rand.case}\nAlgorithm: ${rand.alg}`);
}

methodSelect.addEventListener("change", showAlgorithms);
randomBtn.addEventListener("click", showRandom);

loadAlgs();
