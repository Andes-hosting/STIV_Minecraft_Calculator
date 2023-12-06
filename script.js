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
            if(unitario === 1){
                subtotal = optionsRam[0];
                subtotal = subtotal.toFixed(2);
            }
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
        console.log(subtotal);
        //Se actualiza la label con el valor calculado arriba
        if (currency === "clp") {
            if(subtotal == 0) {
                label.textContent = "$0"
            } else {
                label.textContent = "$" + subtotal.slice(0,-3);
            }
        } else {
            if(subtotal == 0) {
                label.textContent = "$0.00"
            } else {
                label.textContent = "$" + subtotal;
            }
        }

        actualizarSubtotal(sub);
        calcularTotal();
    };
}

function actualizarEtiqueta3(input, label, sub) {
    item = input.getAttribute('id');
    unitario = Number(input.value);
    subtotal = 0
    moneda = currency === "clp" ? clp : usd
    optionsRam = currency === "clp" ? [ram[1],ram[2],ram[3]] : [ram[4],ram[5],ram[6]];
    if(item == 'ram'){
        if(unitario === 1){
            subtotal = optionsRam[0];
            subtotal = subtotal.toFixed(2);
        }
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
            subtotal = subtotal.toFixed(2);
        } else{
            subtotal = unitario - base[item];
            subtotal = subtotal * moneda[item];
            subtotal = subtotal.toFixed(2);
        }
    }
    //Se actualiza la label con el valor calculado arriba
    label.textContent = currency === "clp" ? "$"+subtotal.slice(0,-3) : "$"+subtotal;
    for (let i=0; i < sub.length; i++){
        actualizarSubtotal(sub[i]);
    }
}

//Función que calcula el valor total de todos los subtotales de los componentes
function calcularTotal(){
    const subtotales = document.querySelectorAll("#actualizar");
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

    let descuentoTotal = total*(discount2/100)*months;
    descuentoTotal = descuentoTotal.toFixed(2);

    total = total *( 1 - (discount2 / 100));
    total = total.toFixed(6)
    var valueMonth = total;

    valueMonth = parseFloat(valueMonth).toFixed(2);

    total = total * months;
    total = parseFloat(total).toFixed(2);

    descuentoTotal = currency === "clp" ? descuentoTotal.slice(0,-3) : descuentoTotal;
    valueMonth = currency === "clp" ? valueMonth.slice(0,-3) : valueMonth;
    total = currency === "clp" ? total.slice(0,-3) : total;

    document.getElementById("descuntoTotal").textContent = "Descuento: -$" + descuentoTotal;
    document.getElementById("totalMes").textContent = "Precio por mes: $" + valueMonth;
    document.getElementById("totalLabel").textContent = "Precio Final: $" + total;
}

function changeLabelCurrency(){
    const labels = document.querySelectorAll("#actualizar");
    const inputs = document.querySelectorAll("input");
    const subs = document.querySelectorAll("#subtotal .subtotal");
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
    componente.id = "tarjeta"
    componente.innerHTML = `
        <div>
            <h2 class="p-3 display-5 display-font-3 fs-1 fw-bold">Servidor Minecraft Java Vanilla</h2>
            <div>
                <span id="textRam" class="badge rounded-pill fs-2 m-1">1GB RAM</span>
            </div>
        </div>
        <hr class="hr-blurry">
        <div class="fs-4" id="etiquetas">
            <div class="">
            <label class="textos">
                Servidor Minecraft
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="Estas opciones tenemos disponibles para que uses como base de tu nuevo Servidor de Minecraft, si no sabes cuál quieres puedes elegir 'Vanilla' y después hablar con nosotros para que te ayudemos en la elección."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center" id="ante">
                <select class="form-select text-center w-50 fs-4" id="versions">
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
                <div class="w-25"></div>
            </div>
        </div>
        <div class="fs-4" id="etiquetas">
            <label class="texto" id="texto">
                Almacenamiento (GB)
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="En general no necesitas más de 4GB a menos que uses muchos mods o tengas muchos jugadores en tu Server, puedes seleccionar 4 y más adelante aumentarlo según tus necesidades."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            <div class="d-flex flex-row align-items-center justify-content-center">
                <input type="number" id="almacenamiento" min=0 value="4" class="form-control text-center w-50 fs-4">
                <div class="w-25">
                    <label class="actualizar" id="actualizar">$0.00</label>
                </div>
            </div>
        </div>
        <div class="fs-4" id="etiquetas">
            <label class="texto" id="texto">
                Bases de Datos
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="Algunos mods pueden necesitar 1 o más bases de datos, si no lo necesitas en lo inmediato lo puedes agregar más adelante."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            <div class="d-flex flex-row align-items-center justify-content-center">
                <input type="number" id="bd" min=0 value="0" class="form-control text-center w-50 fs-4">
                <div class="w-25">
                    <label class="actualizar" id="actualizar">$0.00</label>
                </div>
            </div>
        </div>
        <div class="fs-4" id="etiquetas">
            <label class="texto" id="texto">
                Backup
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="Si quieres tener forma de hacer un respaldo de tu servidor, puedes agregar 1 o más respaldos (backup) después puedes volver en el tiempo de tu servidor al momento en que hiciste el backup."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            <div class="d-flex flex-row align-items-center justify-content-center">
                <input type="number" id="backup" min=0 value="0" class="form-control text-center w-50 fs-4">
                <div class="w-25">
                    <label class="actualizar" id="actualizar">$0.00</label>
                </div>
            </div>
        </div>
        <div class="fs-4" id="etiquetas">
            <label class="texto" id="texto">
                Puertos
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="En general un puerto es suficiente a menos que agregues un mod que requiera puertos extras."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            <div class="d-flex flex-row align-items-center justify-content-center">
                <input type="number" id="puertos" min=0 value="1" class="form-control text-center w-50 fs-4">
                <div class="w-25">
                    <label class="actualizar" id="actualizar">$0.00</label>
                </div>
            </div>
        </div>
        <div class="fs-4" id="etiquetas">
            <label class="texto" id="texto">
                RAM (GB)
                <i class="icon-info-sign fs-6"
                    id="iconInfo"
                    data-bs-toggle="popover"
                    data-bs-content="Dependiendo de la versión de minecraft, mods, plugins y cantidad de usuarios, la cantidad de RAM que necesites puede variar de 1GB en Bedrock Vanilla a 6GB en Java Forge con algunos mods (puedes contactarnos para saber más)."
                    data-bs-trigger="hover"
                    data-bs-auto-close="outside"
                    data-bs-html="true"
                    data-bs-placement="auto">
                </i>
            </label>
            <div class="d-flex flex-row align-items-center justify-content-center">
                <input type="number" id="ram" min=0 value="1" class="form-control text-center w-50 fs-4">
                <div class="w-25">
                    <label class="actualizar" id="actualizar">$0.00</label>
                </div>
            </div>
        </div>
        <div class="d-flex flex-column align-items-center" id="subtotal">
            <label class="subtotal" id="subtotal">
                Subtotal : $0.00
            </label>
        </div>
    `;

    //agregar botón par borrar componente
    if(cerrar){
        const botonCerrar = document.createElement("button");
        botonCerrar.className = "close";
        botonCerrar.textContent = "";
        botonCerrar.addEventListener("click", function(){
            borrarComponente(componente);
        });
        componente.appendChild(botonCerrar);

        const iconSvgClose = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPathClose = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        iconSvgClose.setAttribute('height', '16');
        iconSvgClose.setAttribute('width', '16');
        iconSvgClose.setAttribute('viewBox', '0 0 384 512');

        iconPathClose.setAttribute(
            'd',
            'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
        );

        iconSvgClose.appendChild(iconPathClose);
        botonCerrar.appendChild(iconSvgClose);
    }

    const botonMinimizar = document.createElement("button");
    botonMinimizar.className = "minimizar";
    botonMinimizar.textContent = "";
    botonMinimizar.id = "minimizar";
    botonMinimizar.addEventListener("click", function(){
        minimizarComponente(componente);
    });

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );
    iconSvg.setAttribute('height', '16');
    iconSvg.setAttribute('width', '16');
    iconSvg.setAttribute('viewBox', '0 0 512 512');
    //iconSvg.classList.add('post-icon');

    iconPath.setAttribute(
        'd',
        'M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z'
    );

    iconSvg.appendChild(iconPath);

    botonMinimizar.appendChild(iconSvg);

    componente.appendChild(botonMinimizar);

    // Agregar el componente al DOM
    document.body.appendChild(componente);



    //Inicializar los popovers
    inicializarPopovers();


    // Configurar eventos para las etiquetas independientes de este componente
    const inputs = componente.querySelectorAll("input");
    const labels = componente.querySelectorAll("#actualizar");
    const sub = componente.querySelector("#subtotal .subtotal");

    const h2 = componente.querySelector("h2");
    const ramText = componente.querySelector("#textRam");

    const vers = componente.querySelector("select.text-center");
    const ramInput = componente.querySelector("#ram");

    vers.addEventListener('change', function(){
        let selectedOption = this.options[vers.selectedIndex];
        actualizarH2(selectedOption.text, ramInput.value);
    });

    ramInput.addEventListener('input', function() {
        let selectedOption = vers.options[vers.selectedIndex];
        actualizarH2(selectedOption.text, ramInput.value);
    });

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", actualizarEtiqueta(inputs[i], labels[i], sub));
        actualizarEtiqueta3(inputs[i], labels[i],sub);
    }

    // Función para actualizar el texto del elemento <h2>
    function actualizarH2(version, ram) {
        h2.textContent = "Servidor Minecraft " + version;
        ramText.textContent = ram + "GB RAM"
    }

    return componente;
}

function minimizarComponente(componente){
    let targets = componente.querySelectorAll("#etiquetas");
    let hr = componente.querySelector("hr");
    let icon = componente.querySelector("#minimizar svg path");

    targets.forEach(function(target) {
        if(target.style.display === "none"){
            target.style.display = "block";
            hr.style.display = "block";
            icon.setAttribute(
                'd',
                'M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z'
            );
        } else {
            target.style.display = "none";
            hr.style.display = "none";
            icon.setAttribute(
                'd',
                'M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
            );
        }
    });


}

// Funcion para inicializar los popovers
function inicializarPopovers() {
    // Obtener todos los elementos con la clase icon-info-sign
    const iconosInfo = document.querySelectorAll('#iconInfo');

    // Iterar sobre cada elemento y aplicar la inicialización del popover
    iconosInfo.forEach((icono) => {
        new bootstrap.Popover(icono, {
            trigger: 'hover',
            autoClose: 'outside',
            html: true,
            placement: 'right',
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
    const opt = document.querySelectorAll("#ante .text-center")
    comps = opt.length;

    let final = [];

    entradas = document.querySelectorAll("input");
    actualizaciones = document.querySelectorAll("#actualizar");
    etiquetas = document.querySelectorAll("#texto");
    let totaltotal = 0;

    for (let index = 0; index < comps; index++) {
        final.push([opt[index].value, entradas[((5 - 1) + (index * 5))].value + "GB RAM"]);
        final.push(["Atributo","Cantidad","Precio"]);
        let subt = 0
        for(let abc  = 0+(5*index); abc < 5+(5*index); abc++){
            let a = etiquetas[abc].textContent;
            let b = Number(entradas[abc].value);
            let c = actualizaciones[abc].textContent;
            final.push([a,b,c]);
            c = c.slice(1);
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
    const inputs = sub.parentNode.parentNode.querySelectorAll("#actualizar");
    let subtotal = 0;
    inputs.forEach(function(input) {
        let content = currency === "clp" ? input.textContent.slice(1) : input.textContent.slice(1);
        subtotal += parseFloat(content);
    });
    subtotal = subtotal.toFixed(2);

    sub.textContent = currency === "clp" ? 'Subtotal: $' + subtotal.slice(0,-3) : 'Subtotal: $' + subtotal;
}

function changeDiscount(){
    const discount = document.getElementById("segundodescuento").value;
    const labelChange = document.getElementById("changeDiscount");
    labelChange.textContent = "Dscto " + discount + "%";
    calcularTotal();
}

//Pone en order las funciones llamadas al inicio de la página
function main(){
    // Agregar un componente inicial
    const componenteInicial = crearComponente(false);
    document.getElementById("componenteInicial").appendChild(componenteInicial);
    const subini = componenteInicial.querySelector("#subtotal .subtotal");
    actualizarSubtotal(subini);
    // Escucha los evento de click en el boton + para agregar otro componente
    document.querySelector("#containerAddComponent button").addEventListener("click", function() {
        const contenedor = document.getElementById("contenedor");
        const nuevoComponente = crearComponente();
        contenedor.appendChild(nuevoComponente);
        calcularTotal();
        const sub = nuevoComponente.querySelector("#subtotal .subtotal");
        actualizarSubtotal(sub);
    });
    // Identifica si el usuario es de chile y si es, define la moneda por defecto como clp
    Intl.DateTimeFormat().resolvedOptions().timeZone === "America/Santiago" ? null : setCurrency();

    // Actualizar etiquetas al inicio para los valores bases de cada item
    const inputs2 = document.querySelectorAll("input");
    const labels2 = document.querySelectorAll("#actualizar");
    const sub = document.querySelector("#subtotal .subtotal");
    for (let i = 0; i < inputs2.length; i++) {
        actualizarEtiqueta3(inputs2[i], labels2[i],sub);
    }

    // Escucha los eventos de cambio de moneda
    document.getElementById("currency").addEventListener("change", changeCurrency);
    // Escucha los eventos de click en el boton para descargar el excel con los valores de la calculadora
    document.getElementById("excel").addEventListener("click", downloadExcel);
    // Escucha los eventos de cambio del descuento por meses y llama al funcion changeDiscount
    document.getElementById("segundodescuento").addEventListener("change", changeDiscount);

    calcularTotal();
}

main();