const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

//Valores de los componentes del servidor en pesos chilenos
const clp = {
    'almacenamiento': 100,
    'bd': 200,
    'backup': 1000,
    'puertos': 500,
    'ram': 1500
}
//Valores de los componentes del servidor en dolares
const usd = {
    'almacenamiento': 0.11,
    'bd': 0.22,
    'backup': 1.11,
    'puertos': 0.56,
    'ram': 1.67
}
//Cantidad base de cada uno de los componentes del servidor
const base = {
    'almacenamiento': 4,
    'bd': 0,
    'backup': 0,
    'puertos': 1,
    'ram': 1
}
//Valores especiales de la ram
const ram = {
    '1':2000,//clp
    '2':50,
    '3':1500,
    '4':2.22,//usd
    '5':0.055,
    '6':1.67
}

const discounts = {
    '0':1,
    '4.5':3,
    '10':12
}

let currency = "clp"

//Función que actualiza los precios en relación al input numerico
function actualizarEtiqueta(input, label, sub) {
    return function() {
        item = input.getAttribute('id');
        unitario = Number(input.value);
        subtotal = 0
        moneda = currency === "clp" ? clp : usd
        optionsRam = currency === "clp" ? [ram[1], ram[2], ram[3]] : [ram[4], ram[5], ram[6]];
        if(item == 'ram'){
            if(unitario === 1)
                subtotal = optionsRam[0];
            else if(unitario < 12){
                subtotal = unitario - 2;
                subtotal = subtotal * optionsRam[1];                
                subtotal = optionsRam[0] - subtotal;                
                subtotal = subtotal * unitario;
                subtotal = subtotal.toFixed(2);                
            }else{
                subtotal = optionsRam[2] * unitario;
                subtotal = subtotal.toFixed(2);
            }
        } else if(true){
            //Formula para calcular el valor de cada componente del servidor que no sea la ram
            if(unitario <= base[item]){
                subtotal = 0;
            } else{
                subtotal = unitario - base[item];                
                subtotal = subtotal * moneda[item];
                subtotal = subtotal.toFixed(2);
            }
        }
        
        //Se actualiza la label con el valor calculado arriba
        console.log(subtotal);
        label.textContent = "$" + subtotal;

        actualizarSubtotal(sub);
        calcularTotal();
    };
}

function actualizarEtiqueta2(input, label, sub) {
    item = input.getAttribute('id');
    unitario = Number(input.value);
    subtotal = 0
    moneda = currency === "clp" ? clp : usd
    optionsRam = currency === "clp" ? [ram[1],ram[2],ram[3]] : [ram[4],ram[5],ram[6]];
    if(item == 'ram'){
        if(unitario === 1)
            subtotal = optionsRam[0];
        else if(unitario < 12){
            subtotal = unitario - 2;
            subtotal = subtotal * optionsRam[1];                
            subtotal = optionsRam[0] - subtotal;                
            subtotal = subtotal * unitario;
            subtotal = subtotal.toFixed(2);                
        }else{
            subtotal = optionsRam[2] * unitario;
            subtotal = subtotal.toFixed(2);
        }
    } else if(true){
        //Formula para calcular el valor de cada componente del servidor que no sea la ram
        if(unitario <= base[item]){
            subtotal = 0;
        } else{
            subtotal = unitario - base[item];                
            subtotal = subtotal * moneda[item];
            subtotal = subtotal.toFixed(2);
        }
    }
    //Se actualiza la label con el valor calculado arriba
    label.textContent = currency === "clp" ? "$"+subtotal+".00" : "$"+subtotal;

    actualizarSubtotal(sub);
}

function actualizarEtiqueta3(input, label, sub) {
    item = input.getAttribute('id');
    unitario = Number(input.value);
    subtotal = 0
    moneda = currency === "clp" ? clp : usd
    optionsRam = currency === "clp" ? [ram[1],ram[2],ram[3]] : [ram[4],ram[5],ram[6]];
    if(item == 'ram'){
        if(unitario === 1)
            subtotal = optionsRam[0];
        else if(unitario < 12){
            subtotal = unitario - 2;
            subtotal = subtotal * optionsRam[1];                
            subtotal = optionsRam[0] - subtotal;                
            subtotal = subtotal * unitario;
            subtotal = subtotal.toFixed(2);                
        }else{
            subtotal = optionsRam[2] * unitario;
            subtotal = subtotal.toFixed(2);
        }
    } else if(true){
        //Formula para calcular el valor de cada componente del servidor que no sea la ram
        if(unitario <= base[item]){
            subtotal = 0;
        } else{
            subtotal = unitario - base[item];                
            subtotal = subtotal * moneda[item];
            subtotal = subtotal.toFixed(2);
        }
    }
    //Se actualiza la label con el valor calculado arriba
    label.textContent = currency === "clp" ? "$"+subtotal+".00" : "$"+subtotal;
    for (let i=0; i < sub.length; i++){
        actualizarSubtotal(sub[i]);
    }    
}

//Función que calcula el valor total de todos los subtotales de los componentes
function calcularTotal(){
    const subtotales = document.querySelectorAll(".actualizar");
    let total = 0;

    /* let e = document.getElementById("primerdescuento");
    let discount1 = e.value; */

    e = document.getElementById("segundodescuento");
    let discount2 = e.value;

    subtotales.forEach(function(label){
        aux = label.textContent;
        aux = aux.slice(1);
        total += parseFloat(aux);
    });
    let months = discounts[discount2];
    //total=total*(1-(discount1/100));
    total = total *( 1 - (discount2 / 100));
    total = total.toFixed(6)
    var valueMonth = total;

    valueMonth = parseFloat(valueMonth).toFixed(2);

    total=total*months;
    total=parseFloat(total).toFixed(2);
    total="$"+total+". Cada mes se pagaría: $"+valueMonth+". " + /* "Primer Descuento: " + discount1 +"%." +   */"Segundo Descuento: "+discount2+"%.";
    
    document.getElementById("totalLabel").textContent="Total para "+months+" mes(es): "+total;
}

function changeLabelCurrency(){
    const labels = document.querySelectorAll(".actualizar");
    const inputs = document.querySelectorAll("input");
    const subs = document.querySelectorAll(".subtotal");

    for (i = 0; i < inputs.length; i++){
        actualizarEtiqueta3(inputs[i], labels[i], subs)
    }    
}

function changeCurrency(){
    currency = document.getElementById("currency").value;

    changeLabelCurrency();
    calcularTotal();
}

//Función base que crea el componente de cada tarjeta
function crearComponente(cerrar = true) {
    // Crear el componente
    const componente = document.createElement("div");
    componente.className = "tarjeta";
    componente.innerHTML = `
        <h2>Calculadora</h2>
        <div class="etiquetas">
            <label class="textoS">
                Servidor Minecraft
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="Estas opciones tenemos disponibles para que uses como base de tu nuevo Servidor de Minecraft, si no sabes cuál quieres puedes elegir "Vanilla" y después hablar con nosotros para que te ayudemos en la elección." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>
            <select class="versions">
                <optgroup label="Minecraft Java">
                    <option value="Java-Java Vanilla" selected>Java Vanilla</option>
                    <option value="Java-Bungeecord">Bungeecord</option>
                    <option value="Java-Cuberite">Cuberite</option>
                    <option value="Java-CurseForge">CurseForge</option>
                    <option value="Java-Fabric">Fabric</option>
                    <option value="Java-Feather">Feather</option>
                    <option value="Java-Forge">Forge</option>
                    <option value="Java-Feed The Beast">Feed The Beast</option>
                    <option value="Java-Glowstone">Glowstone</option>
                    <option value="Java-Limbo">Limbo</option>
                    <option value="Java-Krypton">Krypton</option>
                    <option value="Java-Magma">Magma</option>
                    <option value="Java-Modrinth">Modrinth</option>
                    <option value="Java-Mohist">Mohist</option>
                    <option value="Java-NanoLimbo">NanoLimbo</option>
                    <option value="Java-Paper">Paper</option>
                    <option value="Java-Folia">Folia</option>
                    <option value="Java-Purpur">Purpur</option>
                    <option value="Java-Quilt">Quilt</option>
                    <option value="Java-Spigot">Spigot</option>
                    <option value="Java-SpongeForge" disabled>SpongeForge</option>
                    <option value="Java-SpongeVanilla">SpongeVanilla</option>
                    <option value="Java-Technic">Technic</option>
                    <option value="Java-VanillaCord">VanillaCord</option>
                </optgroup>
                <optgroup label="Minecraft Bedrock">
                    <option value="Bedrock-Bedrock Vanilla">Bedrock Vanilla</option>
                    <option value="Bedrock-gomint">gomint</option>
                    <option value="Bedrock-LiteLoaderBDS">LiteLoaderBDS</option>
                    <option value="Bedrock-Nukkit">Nukkit</option>
                    <option value="Bedrock-PocketMine">PocketMine MP</option>
                </optgroup>
            </select>
        </div>
        <div class="etiquetas">
            <label class="texto">
                Almacenamiento (GB)
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="En general no necesitas más de 4GB a menos que uses muchos mods o tengas muchos jugadores en tu Server, puedes seleccionar 4 y más adelante aumentarlo según tus necesidades." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>            
            <input type="number" id="almacenamiento" min=0 value="4">
            <label class="actualizar" id="almacenamientoLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">
                Bases de Datos
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="Algunos mods pueden necesitar 1 o más bases de datos, si no lo necesitas en lo inmediato lo puedes agregar más adelante." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>
            <input type="number" id="bd" min=0 value="0">
            <label class="actualizar" id="bdLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">
                Backup
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="Si quieres tener forma de hacer un respaldo de tu servidor, puedes agregar 1 o más respaldos (backup) después puedes volver en el tiempo de tu servidor al momento en que hiciste el backup." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>
            <input type="number" id="backup" min=0 value="0">
            <label class="actualizar" id="backupLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">
                Puertos
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="En general un puerto es suficiente a menos que agregues un mod que requiera puertos extras." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>
            <input type="number" id="puertos" min=0 value="1">
            <label class="actualizar" id="puertosLabel">$0.00</label>
        </div>
        <div class="etiquetas">
            <label class="texto">
                RAM (GB)
                <i class="icon-info-sign" 
                    data-bs-toggle="popover" 
                    data-bs-content="Dependiendo de la versión de minecraft, mods, plugins y cantidad de usuarios, la cantidad de RAM que necesites puede variar de 1GB en Bedrock Vanilla a 6GB en Java Forge con algunos mods(Puedes contactarnos para saber más)." 
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">            
                </i>
            </label>
            <input type="number" id="ram" min=0 value="1">
            <label class="actualizar" id="ramLabel">$0.00</label>
        </div>        
        <label class="subtotal">Subtotal : $0.00</label>
        
    `;

    //agregar botón par borrar componente
    if(cerrar){
        const botonCerrar = document.createElement("button");
        botonCerrar.className = "close";
        botonCerrar.textContent = "X";
        botonCerrar.addEventListener("click", function(){
            borrarComponente(componente);
        });
        componente.appendChild(botonCerrar);
    }

    // Agregar el componente al DOM
    document.body.appendChild(componente);

    //Inicializar los popovers
    inicializarPopovers();
    

    // Configurar eventos para las etiquetas independientes de este componente
    const inputs = componente.querySelectorAll("input");
    const labels = componente.querySelectorAll(".actualizar");
    const sub = componente.querySelector(".subtotal");
    for (let i = 0; i < inputs.length; i++) {        
        inputs[i].addEventListener("input", actualizarEtiqueta(inputs[i], labels[i], sub));
        actualizarEtiqueta2(inputs[i], labels[i],sub);
    }

    return componente;
}

// Funcion para inicializar los popovers
function inicializarPopovers() {
    // Obtener todos los elementos con la clase icon-info-sign
    const iconosInfo = document.querySelectorAll('.icon-info-sign');

    // Iterar sobre cada elemento y aplicar la inicialización del popover
    iconosInfo.forEach((icono) => {
        new bootstrap.Popover(icono, {
            trigger: 'hover',
            autoClose: 'outside',
            html: true,
            placement: 'right'
            // ... otras opciones del popover ...
        });
    });
}

//Borrar componente
function borrarComponente(componente){
    componente.remove();
    calcularTotal();
}

// funcion para establecer la moneda seleccionada al principio del ingreso a la página
function setCurrency(){
    chileanPesos = document.getElementById("clp");
    dollar = document.getElementById("usd");
    chileanPesos.removeAttribute("selected");
    dollar.setAttribute("selected","");
    currency="usd";
}

function downloadExcel(){  
    const opt = document.querySelectorAll("select.versions")
    comps = opt.length;

    let final = [];

    entradas = document.querySelectorAll("input");
    actualizaciones = document.querySelectorAll(".actualizar");
    etiquetas = document.querySelectorAll(".texto");
    let totaltotal = 0;    

    for (let index = 0; index < comps; index++) {
        final.push([opt[index].value, entradas[((5-1)+(index*5))].value + "GB RAM"]);
        final.push(["Atributo","Cantidad","Precio"]);
        let subt = 0
        for(let abc  = 0+(5*index); abc < 5+(5*index); abc++){
            let a = etiquetas[abc].textContent;
            let b = Number(entradas[abc].value);
            let c = actualizaciones[abc].textContent;
            final.push([a,b,c]);
            c = c.slice(1, -3);
            subt = subt + Number(c);
        }
        final.push([,"Sub-Total Server", "$"+subt, "Por mes"]);
        final.push([]);
        totaltotal = totaltotal + subt;
    }

    final.push([,"Sub-total Final", "$" + totaltotal, "Por mes"]);

    let dis2 = document.getElementById("segundodescuento").value;
    let aux2 = dis2;
    if(dis2 == 0){
        dis2 = "1 mes";
    }
    else if(dis2 == 4.5){
        dis2 = "3 meses";
        totaltotal = totaltotal * 3;
    }
    else{
        dis2 = "1 año";
        totaltotal = totaltotal * 12;
    }
    
    final.push([,"Sub-total Final", "$" + totaltotal, "Por "+ dis2]);
    let descuento = totaltotal - ((1 - ((Number(aux2))/100)) * totaltotal);
    final.push([, "Descuento", aux2 + "%", "$-" + descuento,"Descuento por " + dis2]);

    final.push([]);
    let finalfinal = totaltotal - descuento;
    final.push([, "Precio Final", "$" + finalfinal, "Por " + dis2]);

    const ws = XLSX.utils.aoa_to_sheet(final);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Calculos")
    XLSX.writeFile(wb, "calculo.xlsx")
}

function actualizarSubtotal(sub){
    const inputs = sub.parentNode.querySelectorAll(".actualizar");
    let subtotal = 0;
    
    inputs.forEach(function(input) {
        let content = currency === "clp" ? input.textContent.slice(1,-3) : input.textContent.slice(1);
        subtotal += parseFloat(content);
    });
    subtotal = subtotal.toFixed(2);
    sub.textContent = 'Subtotal: $' + subtotal;
}

//Pone en order las funciones llamadas al inicio de la página
function main(){
    // Agregar un componente inicial
    const componenteInicial = crearComponente(false);
    document.getElementById("componenteInicial").appendChild(componenteInicial);
    // Escucha los evento de click en el boton + para agregar otro componente
    document.getElementById("agregarComponente").addEventListener("click", function() {
        const contenedor = document.getElementById("contenedor");
        const nuevoComponente = crearComponente();
        contenedor.appendChild(nuevoComponente);
        calcularTotal();
    });
    // Identifica si el usuario es de chile y si es, define la moneda por defecto como clp
    Intl.DateTimeFormat().resolvedOptions().timeZone === "America/Santiago" ? null : setCurrency();

    // Actualizar etiquetas al inicio para los valores bases de cada item
    const inputs2 = document.querySelectorAll("input");
    const labels2 = document.querySelectorAll(".actualizar");
    const sub = document.querySelector(".subtotal");
    for (let i = 0; i < inputs2.length; i++) {
        actualizarEtiqueta2(inputs2[i], labels2[i],sub);
    }

    // Escucha los eventos de cambio de moneda
    document.getElementById("currency").addEventListener("change", changeCurrency);
    // Escucha los eventos de click en el boton de calcular total
    document.getElementById("calcularTotal").addEventListener("click",calcularTotal);
    // Escucha los eventos de click en el boton para descargar el excel con los valores de la calculadora
    document.getElementById("excel").addEventListener("click", downloadExcel);

    calcularTotal();
}

main();