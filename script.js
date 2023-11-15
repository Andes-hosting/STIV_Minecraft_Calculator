//const almacenamiento123 = 200;

//Función que actualiza los precios en relación al input numerico
function actualizarEtiqueta(input, label) {
    return function() {
        aux = Number(input.value) + 1;
        label.textContent = "$"+aux+".00";
    };
}

//Función que calcula el valor total de todos los subtotales de los componentes
function calcularTotal(){
    const subtotales = document.querySelectorAll(".actualizar");
    let total = 0;

    subtotales.forEach(function(label){
        aux = label.textContent;
        aux = aux.slice(1);
        total += parseFloat(aux);
    });
    total="$"+total+".00"
    
    document.getElementById("totalLabel").textContent="Total: "+total; 
}

//Función base que crea el componente de cada tarjeta
function crearComponente() {
    // Crear el componente
    const componente = document.createElement("div");
    componente.className = "tarjeta";
    componente.innerHTML = `
        <h2>Calculadora</h2>
        <div class="etiquetas">
            <label class="texto">Almacenamiento (GB) :</label>
            <input type="number" id="almacenamiento">
            <label class="actualizar" id="almacenamientoLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Bases de Datos:</label>
            <input type="number" id="bd">
            <label class="actualizar" id="bdLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Backup:</label>
            <input type="number" id="backup">
            <label class="actualizar" id="backupLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Puertos:</label>
            <input type="number" id="puertos">
            <label class="actualizar" id="puertosLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">RAM (GB):</label>
            <input type="number" id="ram">
            <label class="actualizar" id="ramLabel">$0.00</label>
        </div>
    `;

    // Configurar eventos para las etiquetas independientes de este componente
    const inputs = componente.querySelectorAll("input");
    const labels = componente.querySelectorAll(".actualizar");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", actualizarEtiqueta(inputs[i], labels[i]));
    }

    return componente;
}

// Agregar un componente inicial
const componenteInicial = crearComponente();
document.getElementById("componenteInicial").appendChild(componenteInicial);

document.getElementById("agregarComponente").addEventListener("click", function() {
    const contenedor = document.getElementById("contenedor");
    const nuevoComponente = crearComponente();
    contenedor.appendChild(nuevoComponente);
});

document.getElementById("calcularTotal").addEventListener("click",calcularTotal);
