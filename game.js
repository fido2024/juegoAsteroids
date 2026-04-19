
// Conexión 
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // en que dimension


class Nave {
 
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angulo = 0;
        this.velocidad = 3;
        this.giro = 0.05;
    }
 
    mover(teclas) {
        if (teclas["ArrowLeft"]  || teclas["a"]) this.angulo -= this.giro;
        if (teclas["ArrowRight"] || teclas["d"]) this.angulo += this.giro;
        if (teclas["ArrowUp"]    || teclas["w"]) {
            this.x += Math.sin(this.angulo) * this.velocidad;
            this.y -= Math.cos(this.angulo) * this.velocidad;
        }
        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0)             this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0)             this.y = canvas.height;
    }
 
    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angulo);
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
 
}
 
class Asteroide {
 
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;
        this.radio = radio;
        // velocidad aleatoria en X e Y
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    }
 
    mover() {
        this.x += this.dx;
        this.y += this.dy;
 
        // aparecer por el lado opuesto al salir
        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0)             this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0)             this.y = canvas.height;
    }
 
    dibujar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
 
}
 
// --- setup ---
let teclas = {};
document.addEventListener("keydown", function(e) { teclas[e.key] = true; });
document.addEventListener("keyup",   function(e) { teclas[e.key] = false; });
 
let nave = new Nave();
 
// crear 3 asteroides en posiciones distintas
let asteroides = [
    new Asteroide(100, 80,  35),
    new Asteroide(400, 60,  25),
    new Asteroide(200, 350, 30)
];
 
function loop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    nave.mover(teclas);
    nave.dibujar();
 
    // mover y dibujar TODOS los asteroides con un for
    for (let asteroide of asteroides) {
        asteroide.mover();
        asteroide.dibujar();
    }
 
    requestAnimationFrame(loop);
}
 
requestAnimationFrame(loop);
