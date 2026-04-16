
// Conexión 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // en que dimension


let naveX = canvas.width / 2;
let naveY = canvas.height / 2;
let angulo = 0;      
let velocidad = 3; 
let giro = 0.05; 

// almacena el estado de cada tecla
let teclas = {};

// eventos para actualizar el estado de las teclas
document.addEventListener("keydown", function(e) {
    teclas[e.key] = true;
});

document.addEventListener("keyup", function(e) {
    teclas[e.key] = false;
});

//loop
function dibujar() {
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // para girar la nave izquierda o derecha
    if (teclas["ArrowLeft"] || teclas["a"]) angulo = angulo - giro;
    if (teclas["ArrowRight"] || teclas["d"]) angulo = angulo + giro;

    // acelerar la nave hacia adelante
    if (teclas["ArrowUp"] || teclas["w"]) {
        naveX = naveX + Math.sin(angulo) * velocidad;
        naveY = naveY - Math.cos(angulo) * velocidad;
    }

    if (naveX > canvas.width)  naveX = 0;
    if (naveX < 0)             naveX = canvas.width;
    if (naveY > canvas.height) naveY = 0;
    if (naveY < 0)             naveY = canvas.height;

    // dibujo de la nave
    ctx.save();
    ctx.translate(naveX, naveY); 
    ctx.rotate(angulo);          

    ctx.beginPath();
    ctx.moveTo(0, -20);          
    ctx.lineTo(14, 16);          
    ctx.lineTo(-14, 16);         
    ctx.closePath();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();               
}



setInterval(dibujar, 16); // 16 ms para aproximadamente 60 FPS