let categorias = {};
let currentCategory = "";
let currentIndex = 0;
let puntos = 0;

const rueda = [100, 200, 300, 500, "Pasa", "Perder Turno", "Doble"];

async function cargarDatos() {
  const res = await fetch("data.json");
  categorias = await res.json();
  const select = document.getElementById("categoria");

  Object.keys(categorias.categorias).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.onchange = () => {
    currentCategory = select.value;
    currentIndex = 0;
    document.getElementById("juego").style.display = "block";
    mostrarPregunta();
  };
}

function mostrarPregunta() {
  const datos = categorias.categorias[currentCategory][currentIndex];
  document.getElementById("letra").textContent = datos.letra;
  document.getElementById("pregunta").textContent = datos.pregunta;
  document.getElementById("respuesta").value = "";
}

function verificarRespuesta() {
  const datos = categorias.categorias[currentCategory][currentIndex];
  const userAnswer = document.getElementById("respuesta").value.toLowerCase().trim();

  if (userAnswer === datos.respuesta) {
    alert("✅ Correcto!");
    currentIndex++;
    if (currentIndex < categorias.categorias[currentCategory].length) {
      mostrarPregunta();
    } else {
      alert("🎉 Has terminado esta categoría!");
    }
  } else {
    alert("❌ Incorrecto. Vuelve a intentarlo.");
  }
}

function girarRueda() {
  const valor = rueda[Math.floor(Math.random() * rueda.length)];
  let total = parseInt(document.getElementById("puntos").textContent);

  if (valor === "Pasa") {
    alert("🔁 Pasas al siguiente turno.");
  } else if (valor === "Perder Turno") {
    alert("💥 Pierdes tu turno.");
    total = 0;
  } else if (valor === "Doble") {
    total *= 2;
    alert(`🎯 ¡Doble! Ahora tienes ${total} puntos.`);
  } else {
    total += valor;
    alert(`💰 Ganaste ${valor} puntos.`);
  }

  document.getElementById("puntos").textContent = total;
  document.getElementById("resultadoRueda").textContent = valor;
}

cargarDatos();
