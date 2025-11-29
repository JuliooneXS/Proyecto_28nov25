
console.log("Main.js cargado correctamente");

const btnCargar = document.getElementById('btn-cargar');
const btnEjecutar = document.getElementById('btn-ejecutar');
const btnBipartito = document.getElementById('btn-bipartito');
const txtMatriz = document.getElementById("matriz-input");
const salida = document.getElementById("resultado");

btnCargar.addEventListener('click', () => {
    const txt = txtMatriz.value.trim();
    if (!txt) {
        alert("Inserta una matriz primero");
        return;
    }

    const matriz = txt.split("\n").map(row =>
        row.trim().split(/\s+/).map(Number)
    );

    window.grafo = matriz;
    salida.textContent = "Matriz cargada:\n" + JSON.stringify(matriz, null, 2);
    console.log("Grafo cargado:", matriz);

    alert("Grafo cargado");
});

btnEjecutar.addEventListener('click', () => {
    console.log("Ejecutando algoritmo...");
    
});

btnBipartito.addEventListener('click', () => {
    if (typeof ejecutarBipartito === "function") {
        ejecutarBipartito();
    } else {
        alert("No se encontró bipartito.js");
    }
});

