
// conexion con el canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // en que dimension


// (M)odelo - Datos - Clases - estados
// 
 
class Nave {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.angulo = 0;
        this.velocidad = 3;
        this.giro = 0.05;
        this.radio = 16;
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
    chocaCon(asteroide) {
        let distancia = Math.hypot(this.x - asteroide.x, this.y - asteroide.y);
        return distancia < this.radio + asteroide.radio;
    }
}
 
class Asteroide {
    constructor(x, y, radio) {
        this.x = x;
        this.y = y;a
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    }
    mover() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0)             this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0)             this.y = canvas.height;
    }
}
 
// estado global del juego
let modelo = {
    nave: new Nave(),
    asteroides: [
        new Asteroide(100, 80,  35),
        new Asteroide(400, 60,  25),
        new Asteroide(200, 350, 30)
    ],
    juegoTerminado: false
};
 
 
// (V)ista - Dibuja
 
let vista = {
 
    dibujarFondo() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
 
    dibujarNave(nave) {
        ctx.save();
        ctx.translate(nave.x, nave.y);
        ctx.rotate(nave.angulo);
        ctx.beginPath();
        ctx.moveTo(0, -20);
        ctx.lineTo(14, 16);
        ctx.lineTo(-14, 16);
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    },
 
    dibujarAsteroide(asteroide) {
        ctx.beginPath();
        ctx.arc(asteroide.x, asteroide.y, asteroide.radio, 0, Math.PI * 2);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    },
 
    dibujarGameOver() {
        ctx.fillStyle = "white";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("FIN DEL JUEGO", canvas.width / 2, canvas.height / 2);
    }
 
};
 
 
// (C)ontrolador - Eventos - Logica de juego
 
let teclas = {};
document.addEventListener("keydown", function(e) { teclas[e.key] = true; });
document.addEventListener("keyup",   function(e) { teclas[e.key] = false; });
 
function loop() {
    if (modelo.juegoTerminado) return;
 
    // actualizar modelo
    modelo.nave.mover(teclas);
    for (let asteroide of modelo.asteroides) {
        asteroide.mover();
        if (modelo.nave.chocaCon(asteroide)) {
            modelo.juegoTerminado = true;
        }
    }
 
    // dibujar con la vista
    vista.dibujarFondo();
    vista.dibujarNave(modelo.nave);
    for (let asteroide of modelo.asteroides) {
        vista.dibujarAsteroide(asteroide);
    }
 
    if (modelo.juegoTerminado) {
        vista.dibujarGameOver();
        return;
    }
 
    requestAnimationFrame(loop);
}
 
requestAnimationFrame(loop);
