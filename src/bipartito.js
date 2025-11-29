function ejecutarBipartito() {


    const texto = document.getElementById("matriz_input").value.trim();
    const matriz = texto.split("\n").map(fila =>
        fila.trim().split(/\s+/).map(Number)
    );
    const n= matriz.length;
    const color = Array(n).fill(-1);
    function bfs(inicio) {
        const cola = [inicio];
        color[inicio] = 0;
        while (cola.length > 0) {
            let u = cola.shift();
            for (let v = 0; v < n; v++) {
                if (matriz[u][v] === 1) {  
                    if (color[v] === -1) {
                        color[v] = 1 - color[u];
                        cola.push(v);
                    } else if (color[v] === color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    let bipartito = true;

    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            if (!bfs(i)) {
                bipartito = false;
                break;
            }
        }
    }
    if (bipartito){
        alert("El grafo si es bipartito")
    }else{
        alert("El grafo NO es bipartito")
    }
}
