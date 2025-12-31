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
    img.src = generateCaseImage(item.case); // automatic cube image

    const caseSpan = document.createElement("span");
    caseSpan.className = "case-name";
    caseSpan.textContent = item.case;

    const algSpan = document.createElement("span");
    algSpan.className = "alg-code";
    algSpan.textContent = item.alg;

    div.appendChild(img);
    div.appendChild(caseSpan);
    div.appendChild(algSpan);
    algListDiv.appendChild(div);
  });
}

function generateCaseImage(caseName) {
  const canvas = document.createElement("canvas");
  canvas.width = 120;
  canvas.height = 120;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const size = 30;
  const startX = 15;
  const startY = 15;

  // placeholder 3x3 cube pattern
  const colors = [
    ["yellow", "yellow", "yellow"],
    ["yellow", "yellow", "yellow"],
    ["yellow", "yellow", "yellow"]
  ];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      ctx.fillStyle = colors[i][j];
      ctx.fillRect(startX + j * size, startY + i * size, size, size);
      ctx.strokeStyle = "#000";
      ctx.strokeRect(startX + j * size, startY + i * size, size, size);
    }
  }

  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(caseName, canvas.width / 2, canvas.height - 5);

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

