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

    var e = document.getElementById("primerdescuento");
    var discount1 = e.value;

    e = document.getElementById("segundodescuento");
    var discount2 = e.value;

    subtotales.forEach(function(label){
        aux = label.textContent;
        aux = aux.slice(1);
        total += parseFloat(aux);
    });

    var months=0;
    if (discount2==20)
        months=1;
    else if (discount2==50)
        months=3;
    else
        months=12;

    total=total*(1-(discount1/100));
    total=total*(1-(discount2/100));

    var valueMonth = total;
    //problemas con los decimales en el caso 10 en almacenamiento, 50% en primer descuento y 1 año en segundo descuento
    console.log(total);

    valueMonth = parseFloat(valueMonth).toFixed(2);

    total=total*months;
    total=parseFloat(total).toFixed(2);
    total="$"+total+". Cada mes se pagaría: $"+valueMonth+". Primer Descuento: "+discount1+"%. Segundo Descuento: "+discount2+"%.";
    
    document.getElementById("totalLabel").textContent="Total para "+months+" mes(es): "+total; 
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
            <input type="number" id="almacenamiento" min=0>
            <label class="actualizar" id="almacenamientoLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Bases de Datos:</label>
            <input type="number" id="bd" min=0>
            <label class="actualizar" id="bdLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Backup:</label>
            <input type="number" id="backup" min=0>
            <label class="actualizar" id="backupLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">Puertos:</label>
            <input type="number" id="puertos" min=0>
            <label class="actualizar" id="puertosLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">RAM (GB):</label>
            <input type="number" id="ram" min=0>
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

//primer descuento
const cambio=()=>{
    console.log("Cambio")

}
const select=document.querySelectorAll("#primerdescuento")
document.getElementById("calcularTotal").addEventListener("click",calcularTotal);
