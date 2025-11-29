/**
 * Algoritmo BFS (Breadth-First Search) para Matriz de Adyacencia
 * Hecho por: Julio.
 */

function ejecutarBFS() {
    if (!window.grafo) {
        alert("Primero carga una matriz en el botón 'Cargar'.");
        return;
    }

    const grafo = window.grafo;
    const numVertices = grafo.length;  
    const nodoInicio = 0; 

    let visitados = new Array(numVertices).fill(false);
    let cola = [];
    let recorrido = [];

    visitados[nodoInicio] = true;
    cola.push(nodoInicio);

    while (cola.length > 0) {
        let nodoActual = cola.shift();
        recorrido.push(nodoActual);

        for (let i = 0; i < numVertices; i++) {
            if (grafo[nodoActual][i] === 1 && !visitados[i]) {
                visitados[i] = true;
                cola.push(i);
            }
        }
    }

    const resultadoDiv = document.getElementById("resultado");
    const tiempoDiv = document.getElementById("tiempo-analisis");
    const espacioDiv = document.getElementById("espacio-analisis");

    resultadoDiv.textContent = "Recorrido BFS (iniciando en 0): " + recorrido.join(" -> ");
    
    tiempoDiv.textContent = "O(V²)";
    espacioDiv.textContent = "O(V)";
    
    console.log("BFS ejecutado:", recorrido);
}