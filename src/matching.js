document.getElementById('btn-matching').addEventListener('click', () => {
    const input = document.getElementById('matriz_input').value.trim();
    if (!input) {
        alert("Por favor ingresa una matriz de adyacencia.");
        return;
    }

    // 1. Parsear la matriz de entrada a un array 2D
    const matriz = input.split('\n').map(row => 
        row.trim().split(/\s+/).map(Number)
    );

    const numVertices = matriz.length;
    
    // Validar que sea cuadrada
    if (matriz.some(row => row.length !== numVertices)) {
        alert("La matriz debe ser cuadrada.");
        return;
    }

    // ----------------------------------------------------
    // EJECUCIÓN DE ALGORITMOS
    // ----------------------------------------------------

    // A) Emparejamiento Maximal (Algoritmo Voraz / Greedy)
    const resMaximal = calcEmparejamientoMaximal(matriz, numVertices);

    // B) Emparejamiento Máximo (Algoritmo basado en Caminos de Aumento / DFS)
    // Nota: Asume comportamiento bipartito para simplicidad escolar.
    const resMaximo = calcEmparejamientoMaximo(matriz, numVertices);

    // ----------------------------------------------------
    // MOSTRAR RESULTADOS
    // ----------------------------------------------------
    const output = document.getElementById('resultado');
    output.textContent = 
    `=== Emparejamiento Maximal (Greedy) ===\n` +
    `Cardinalidad: ${resMaximal.length}\n` +
    `Pares: ${JSON.stringify(resMaximal)}\n\n` +
    `=== Emparejamiento Máximo (Maximum) ===\n` +
    `Cardinalidad: ${resMaximo.length}\n` +
    `Pares: ${JSON.stringify(resMaximo)}`;

    // Actualizar análisis complejidad (Estimado)
    document.getElementById('tiempo-analisis').innerText = "Maximal: O(E) | Máximo: O(V*E)";
    document.getElementById('espacio-analisis').innerText = "O(V)";
});

/**
 * Algoritmo Greedy: Itera aristas y toma la primera disponible si ambos nodos están libres.
 * No garantiza el máximo, solo que no se pueden añadir más aristas al conjunto actual.
 */
function calcEmparejamientoMaximal(matriz, n) {
    let visitados = new Array(n).fill(false);
    let matching = [];

    for (let u = 0; u < n; u++) {
        for (let v = u + 1; v < n; v++) { // v = u+1 asume grafo no dirigido (simétrico)
            if (matriz[u][v] !== 0) { // Si hay arista
                if (!visitados[u] && !visitados[v]) {
                    matching.push([u, v]);
                    visitados[u] = true;
                    visitados[v] = true;
                }
            }
        }
    }
    return matching;
}

/**
 * Algoritmo para Emparejamiento Máximo (Enfoque Bipartito/DFS).
 * Intenta encontrar caminos de aumento para mejorar el emparejamiento.
 */
function calcEmparejamientoMaximo(matriz, n) {
    // matchR[v] almacena el nodo emparejado con v (del lado derecho/destino)
    // Usamos -1 para indicar que no está emparejado
    let matchR = new Array(n).fill(-1);
    let result = 0;

    // Función auxiliar DFS para encontrar camino de aumento
    function bpm(u, visitados, matchR, matrix, n) {
        for (let v = 0; v < n; v++) {
            // Si hay arista y v no ha sido visitado en este intento
            if (matrix[u][v] !== 0 && !visitados[v]) {
                visitados[v] = true; 

                // Si v no está emparejado O si el emparejado de v puede encontrar otro match
                if (matchR[v] < 0 || bpm(matchR[v], visitados, matchR, matrix, n)) {
                    matchR[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    // Iteramos sobre todos los vértices
    // Nota: En un grafo bipartito estricto, solo iteraríamos sobre el conjunto U.
    // Aquí intentamos emparejar todos, dividiendo el resultado por 2 al final para no dirigidos.
    let matches = [];
    
    // Clonamos la matriz para no afectar la original si necesitamos manipularla
    // Para grafo general, este enfoque es una aproximación si el grafo no es bipartito.
    for (let u = 0; u < n; u++) {
        let visitados = new Array(n).fill(false);
        if (bpm(u, visitados, matchR, matriz, n)) {
            result++;
        }
    }

    // Reconstruir el resultado legible
    let paresUnicos = new Set();
    let resultadoFinal = [];

    for (let v = 0; v < n; v++) {
        if (matchR[v] !== -1) {
            let u = matchR[v];
            // Ordenamos para evitar duplicados como [0,1] y [1,0] en grafo no dirigido
            let min = Math.min(u, v);
            let max = Math.max(u, v);
            let clave = `${min}-${max}`;
            
            if (!paresUnicos.has(clave)) {
                paresUnicos.add(clave);
                resultadoFinal.push([min, max]);
            }
        }
    }

    return resultadoFinal;
}