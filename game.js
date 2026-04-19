
// Conexión 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // en que dimension


let naveX = canvas.width / 2;
let naveY = canvas.height / 2;
let angulo = 0;
let velocidad = 3;
let giro = 0.05;
let teclas = {};
 
document.addEventListener("keydown", function(e) { teclas[e.key] = true; });
document.addEventListener("keyup",   function(e) { teclas[e.key] = false; });
 
function dibujar() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    if (teclas["ArrowLeft"]  || teclas["a"]) angulo -= giro;
    if (teclas["ArrowRight"] || teclas["d"]) angulo += giro;
    if (teclas["ArrowUp"]    || teclas["w"]) {
        naveX += Math.sin(angulo) * velocidad;
        naveY -= Math.cos(angulo) * velocidad;
    }
 
    if (naveX > canvas.width)  naveX = 0;
    if (naveX < 0)             naveX = canvas.width;
    if (naveY > canvas.height) naveY = 0;
    if (naveY < 0)             naveY = canvas.height;
 
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
 
    requestAnimationFrame(dibujar);
}
 
// arrancar el loop por primera vez
requestAnimationFrame(dibujar);
