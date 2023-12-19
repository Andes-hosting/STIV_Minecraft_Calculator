const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// Valores de los componentes del servidor en pesos chilenos
const clp = {
    'almacenamiento': 100,
    'bd': 200,
    'backup': 1000,
    'puertos': 500,
    'ram': 1500
}
// Valores de los componentes del servidor en dolares
const usd = {
    'almacenamiento': 0.11,
    'bd': 0.22,
    'backup': 1.11,
    'puertos': 0.56,
    'ram': 1.67
}
// Cantidad base de cada uno de los componentes del servidor
const base = {
    'almacenamiento': 4,
    'bd': 0,
    'backup': 0,
    'puertos': 1,
    'ram': 1
}
//V alores especiales de la ram
const ram = {
    '1':2000,//clp
    '2':50,
    '3':1500,
    '4':2.22,//usd
    '5':0.055,
    '6':1.67
}
// Valores para los descuentos
const discounts = {
    '0':1,
    '4.5':3,
    '10':12
}
// Valor de la moneda actual
let currency = "clp";
// arreglo de los componentes actuales
let totalComponents = [];
// Template del componente de la calculadora
const componentTemplate = `
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

// Clase principal de la calculadora
class CalculatorComponent {
    constructor(flag) {
        this.flag = flag;
        this.create();

        this.inputVersion = this.componentCreated.querySelector("select.text-center");

        this.inputStorage = this.componentCreated.querySelectorAll("input")[0];
        this.labelStorage = this.componentCreated.querySelectorAll("#actualizar")[0];

        this.inputDataBase = this.componentCreated.querySelectorAll("input")[1];
        this.labelDataBase = this.componentCreated.querySelectorAll("#actualizar")[1];

        this.inputBackup = this.componentCreated.querySelectorAll("input")[2];
        this.labelBackup = this.componentCreated.querySelectorAll("#actualizar")[2];

        this.inputPort = this.componentCreated.querySelectorAll("input")[3];
        this.labelPort = this.componentCreated.querySelectorAll("#actualizar")[3];

        this.inputRam = this.componentCreated.querySelectorAll("input")[4];
        this.labelRam = this.componentCreated.querySelectorAll("#actualizar")[4];

        this.minimizerButton = this.componentCreated.querySelector("#minimizar");
        this.closeButton = this.componentCreated.querySelector("#close");

        this.setter();
        this.inputVersion.addEventListener('change', () => this.updateTitle());
        this.inputStorage.addEventListener('input', () => this.update(this.inputStorage, this.labelStorage));
        this.inputDataBase.addEventListener('input', () => this.update(this.inputDataBase, this.labelDataBase));
        this.inputBackup.addEventListener('input', () => this.update(this.inputBackup, this.labelBackup));
        this.inputPort.addEventListener('input', () => this.update(this.inputPort, this.labelPort));
        this.inputRam.addEventListener('input', () => {this.update(this.inputRam, this.labelRam);this.updateTitle()});
        this.minimizerButton.addEventListener('click', () => this.minimizer());

        if(this.flag) {
            this.closeButton.addEventListener('click', () => this.close());
        }

        this.currentCurrency = currency === "clp" ? clp : usd;
    }
    // Función que crea el componente en html
    create() {
        const component = document.createElement("div");
        component.className = "tarjeta";
        component.id = "tarjeta";
        component.innerHTML = componentTemplate;

        //Inicializar los popovers
        inicializarPopovers(component);

        if(this.flag){
            const closeButton = document.createElement("button");
            closeButton.className = "close";
            closeButton.id = "close"
            closeButton.textContent = "";
            component.appendChild(closeButton);

            const iconSvgClose = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg');
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
            closeButton.appendChild(iconSvgClose);
        }

        const minimizeButton = document.createElement("button");
        minimizeButton.className = "minimizar";
        minimizeButton.id = "minimizar";
        minimizeButton.textContent = "";

        const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const iconPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        iconSvg.setAttribute('height', '16');
        iconSvg.setAttribute('width', '16');
        iconSvg.setAttribute('viewBox', '0 0 512 512');

        iconPath.setAttribute(
            'd',
            'M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z'
        );

        iconSvg.appendChild(iconPath);

        minimizeButton.appendChild(iconSvg);

        component.appendChild(minimizeButton);

        // Agregar el componente al DOM
        document.body.appendChild(component);

        let contenedor = document.getElementById("contenedor");
        contenedor.appendChild(component);

        this.componentCreated = component;
    }
    // Función que establece valores iniciales del componente y realiza una actualización de los elementos de este
    setter() {
        this.ramOptions = currency === "clp" ? [ram[1], ram[2], ram[3]] : [ram[4], ram[5], ram[6]];

        this.update(this.inputStorage, this.labelStorage);
        this.update(this.inputDataBase, this.labelDataBase);
        this.update(this.inputBackup, this.labelBackup);
        this.update(this.inputPort, this.labelPort);
        this.update(this.inputRam, this.labelRam);
    }
    // Función para actualizar la label que acompaña al input del componente
    update(input, label) {
        let item = input.getAttribute('id');

        const unitario = Number(input.value);
        let subtotal = 0;
        if(item == 'ram'){
            if(unitario === 1){
                subtotal = this.ramOptions[0];
                subtotal = subtotal.toFixed(2);
            }
            else if(unitario < 12){
                subtotal = unitario - 2;
                subtotal = subtotal * this.ramOptions[1];
                subtotal = this.ramOptions[0] - subtotal;
                subtotal = subtotal * unitario;
                subtotal = subtotal.toFixed(2);
            }else{
                subtotal = this.ramOptions[2] * unitario;
                subtotal = subtotal.toFixed(2);
            }
        } else if(true){
            //Formula para calcular el valor de cada componente del servidor que no sea la ram
            if(unitario <= base[item]){
                subtotal = 0;
                //aqui
            } else{
                subtotal = unitario - base[item];
                subtotal = subtotal * this.currentCurrency[item];
                subtotal = subtotal.toFixed(2);
            }
        }
        //Se actualiza la label con el valor calculado arriba
        if (currency === "clp"){
            label.textContent = subtotal == 0 ? "$0" : "$" + subtotal.slice(0, -3);
        } else {
            label.textContent = subtotal == 0 ? "$0.00" : "$" + subtotal;
        }

        this.updateSub();
        calcularTotal();
    }
    // Función para actualizar el subtotal del componente
    updateSub() {
        const inputs = this.componentCreated.querySelectorAll("#actualizar");
        let subtotal = 0;
        inputs.forEach(input => {
            let content = currency === "clp" ? input.textContent.slice(1) : input.textContent.slice(1);
            subtotal += parseFloat(content);
        });
        subtotal = subtotal.toFixed(2);
        this.componentCreated.querySelector("#subtotal").textContent = currency === "clp" ? 'Subtotal: $' + subtotal.slice(0,-3) : 'Subtotal: $' + subtotal;
    }
    // Función para actualizar el título del componente en relacion al input de versiones y ram
    updateTitle() {
        const h2 = this.componentCreated.querySelector("h2");
        const version = this.componentCreated.querySelector("select.text-center").options[this.componentCreated.querySelector("select.text-center").selectedIndex].value;
        const ramInput = this.componentCreated.querySelector("#ram").value;
        const ramTitle = this.componentCreated.querySelector("#textRam");

        h2.textContent = "Servidor Minecraft " + version;
        ramTitle.textContent = ramInput + "GB RAM";
    }
    // Función que minimiza el componente
    minimizer() {
        let targets = this.componentCreated.querySelectorAll("#etiquetas");
        let hr = this.componentCreated.querySelector("hr");
        let icon = this.componentCreated.querySelector("#minimizar svg path");

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
    // Función que elimina al componente
    close() {
        this.componentCreated.remove();
        calcularTotal();
    }
}

//Función que calcula el valor total de todos los subtotales de los componentes
function calcularTotal(){
    const subtotales = document.querySelectorAll("#actualizar");
    let total = 0;

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

// Función que cambia el tipo de moneda de los valores de los componentes
function changeCurrency(){
    currency = document.getElementById("currency").value;
    for( i = 0; i < totalComponents.length; i++) {
        totalComponents[i].setter();
    }
    calcularTotal();
}

// Función para inicializar los popovers
function inicializarPopovers(component) {
    // Obtener todos los elementos con la clase icon-info-sign
    const iconosInfo = component.querySelectorAll('#iconInfo');

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

// Función para establecer la moneda seleccionada al principio del ingreso a la página
function setCurrency(){
    chileanPesos = document.getElementById("clp");
    dollar = document.getElementById("usd");
    chileanPesos.removeAttribute("selected");
    dollar.setAttribute("selected","");
    currency="usd";
}

// Función para crear un excel con los datos de la calculadora y descargarlo
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

// Función para cambiar la etiqueta de descuento
function changeDiscount(){
    const discount = document.getElementById("segundodescuento").value;
    const labelChange = document.getElementById("changeDiscount");
    labelChange.textContent = "Dscto " + discount + "%";
    calcularTotal();
}

//Pone en order las funciones llamadas al inicio de la página
function main(){
    // Agregar un componente inicial
    let initialComponent = new CalculatorComponent(false);
    totalComponents.push(initialComponent);
    // Escucha los evento de click en el boton agregar otro componente
    document.querySelector("#containerAddComponent button").addEventListener("click", function() {
        const nuevoComponente = new CalculatorComponent(true);
        totalComponents.push(nuevoComponente);
    });
    // Identifica si el usuario es de chile y si es, define la moneda por defecto como clp
    Intl.DateTimeFormat().resolvedOptions().timeZone === "America/Santiago" ? null : setCurrency();
    // Escucha los eventos de cambio de moneda
    document.getElementById("currency").addEventListener("change", changeCurrency);
    // Escucha los eventos de click en el boton para descargar el excel con los valores de la calculadora
    document.getElementById("excel").addEventListener("click", downloadExcel);
    // Escucha los eventos de cambio del descuento por meses y llama al funcion changeDiscount
    document.getElementById("segundodescuento").addEventListener("change", changeDiscount);
    calcularTotal();
}

main();