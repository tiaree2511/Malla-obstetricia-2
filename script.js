const ramos = [
  { id: "BIO130", nombre: "Biología celular", requisitos: [] },
  { id: "OBST001", nombre: "Introducción a la matronería", requisitos: [] },
  { id: "QUIM075", nombre: "Química general y orgánica", requisitos: [] },
  { id: "CEGHC11", nombre: "Habilidades comunicativas", requisitos: [] },
  { id: "ING119", nombre: "Inglés I", requisitos: [] },
  { id: "MORF017", nombre: "Morfología general", requisitos: [] },
  { id: "SPAB113", nombre: "Salud pública", requisitos: [] },
  { id: "OBST002", nombre: "Cuidados Médico-Quirúrgicos I", requisitos: ["OBST001"] },
  { id: "OBST003", nombre: "Microbiología y parasitología", requisitos: ["BIO130"] },
  { id: "ING129", nombre: "Inglés II", requisitos: ["ING119"] },
  { id: "OBST004", nombre: "Bases perinatales y ginecológicas", requisitos: ["MORF017", "OBST003"] },
  { id: "OBST005", nombre: "Cuidados Médico-Quirúrgicos II", requisitos: ["OBST002", "OBST003", "MORF017"] },
  { id: "OBST006", nombre: "Políticas salud sexual y reproductiva", requisitos: ["SPAB113"] },
  { id: "CEGPC13", nombre: "Pensamiento crítico", requisitos: [] },
  { id: "ING239", nombre: "Inglés III", requisitos: ["ING129"] },
  { id: "OBST007", nombre: "Matronería y Bases fisiopatológicas", requisitos: ["OBST004"] },
  { id: "SPAB112", nombre: "Gestión en salud", requisitos: ["SPAB113"] },
  { id: "OBST008", nombre: "Salud sexual y Gestión I", requisitos: ["OBST005", "OBST006"] },
  { id: "OBST009", nombre: "Integrador I", requisitos: ["OBST004", "OBST005", "OBST006", "ING239"] },
  { id: "ING249", nombre: "Inglés IV", requisitos: ["ING239"] },
  { id: "FARM151", nombre: "Farmacología General", requisitos: ["BIO130", "QUIM075"] },
  { id: "OBST010", nombre: "Neonatología y Gestión", requisitos: ["SPAB112", "OBST004", "OBST006"] },
  { id: "OBST011", nombre: "Salud sexual y Gestión II", requisitos: ["OBST008", "OBST007"] },
  { id: "OBST012", nombre: "Psicología y entrevista clínica", requisitos: ["OBST006"] },
  { id: "OBST013", nombre: "Educación con enfoque vida", requisitos: ["OBST006", "OBST008", "OBST010"] },
  { id: "OBST014", nombre: "Matronería patológica integrada", requisitos: ["OBST010", "OBST011", "FARM151"] },
  { id: "SPAB300", nombre: "Bioestadística", requisitos: ["SPAB112"] },
  { id: "OBST015", nombre: "Salud familiar y comunitaria", requisitos: ["OBST006", "OBST008", "OBST010"] },
  { id: "SPAB303", nombre: "Metodología de la investigación", requisitos: ["SPAB300", "OBST006"] },
  { id: "OBST016", nombre: "Sexología, género y derecho", requisitos: ["OBST011"] },
  { id: "OBST017", nombre: "Intervención en contextos sociales", requisitos: ["OBST012", "OBST015"] },
  { id: "OBST018", nombre: "Matronería legal y bioética", requisitos: ["OBST006", "OBST007"] },
  { id: "OBST019", nombre: "Integrador II: Práctica comunidad", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"] },
  { id: "OBST020", nombre: "Imagenología en matronería", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"] },
  { id: "OBST021", nombre: "Oncológica y reproducción asistida", requisitos: ["SPAB303", "OBST013", "OBST014", "OBST016", "OBST017", "OBST018"] },
  { id: "OBST022", nombre: "Proyecto de Matronería", requisitos: ["SPAB303"] },
  { id: "OBST023", nombre: "Habilitación profesional I", requisitos: ["OBST019", "OBST020", "OBST021", "OBST022"] },
  { id: "OBST024", nombre: "Habilitación profesional II", requisitos: ["OBST019", "OBST020", "OBST021", "OBST022"] },
];

const estadoRamos = {};

function estaDesbloqueado(ramo) {
  return ramo.requisitos.every(req => estadoRamos[req]);
}

function renderMalla() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  ramos.forEach(ramo => {
    const desbloqueado = estaDesbloqueado(ramo);
    const aprobado = estadoRamos[ramo.id];

    const div = document.createElement("div");
    div.className = "ramo";
    if (aprobado) div.classList.add("aprobado");
    else if (desbloqueado || ramo.requisitos.length === 0) div.classList.add("desbloqueado");

    const titulo = document.createElement("h3");
    titulo.textContent = ramo.nombre;
    div.appendChild(titulo);

    const codigo = document.createElement("small");
    codigo.textContent = ramo.id;
    div.appendChild(codigo);

    const boton = document.createElement("button");
    boton.textContent = aprobado ? "Aprobado" : "Aprobar (C)";
    boton.disabled = aprobado || (!desbloqueado && ramo.requisitos.length > 0);
    boton.onclick = () => {
      estadoRamos[ramo.id] = true;
      renderMalla();
    };
    div.appendChild(boton);

    malla.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", renderMalla);
