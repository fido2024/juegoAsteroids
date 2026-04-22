
// conexion con el canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); // en que dimension


// Modelo
// ---- MODEL ----
 
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
        this.y = y;
        this.radio = radio;
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
 
        
        this.puntos = [];
        let numPuntos = 10; // cuantos vertices tiene el poligono
 
        for (let i = 0; i < numPuntos; i++) {
           
            let angulo = (i / numPuntos) * Math.PI * 2;
 
            let r = this.radio * (0.7 + Math.random() * 0.6);
 
            
            this.puntos.push({
                x: Math.cos(angulo) * r,
                y: Math.sin(angulo) * r
            });
        }
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
 
function crearAsteroides() {
    return [
        new Asteroide(100, 80,  35),
        new Asteroide(400, 60,  25),
        new Asteroide(300, 50,  20),
        new Asteroide(200, 350, 30)
    ];
}
 
let modelo = {
    nave: new Nave(),
    asteroides: crearAsteroides(),
    juegoTerminado: false
};
 
 
// Vista
 
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
        ctx.save();
        ctx.translate(asteroide.x, asteroide.y);
 
        // recorre los puntos irregulares generados en el constructor
        ctx.beginPath();
        ctx.moveTo(asteroide.puntos[0].x, asteroide.puntos[0].y);
 
        for (let i = 1; i < asteroide.puntos.length; i++) {
            ctx.lineTo(asteroide.puntos[i].x, asteroide.puntos[i].y);
        }
 
        ctx.closePath(); 
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
 
        ctx.restore();
    },
 
    dibujarGameOver() {
        ctx.fillStyle = "white";
        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("FIN DEL JUEGO", canvas.width / 2, canvas.height / 2);
    }
 
};
 
 
// Controlador
 
let teclas = {};
document.addEventListener("keydown", function(e) { teclas[e.key] = true; });
document.addEventListener("keyup",   function(e) { teclas[e.key] = false; });
 
function loop() {
    if (modelo.juegoTerminado) return;
 
    modelo.nave.mover(teclas);
    for (let asteroide of modelo.asteroides) {
        asteroide.mover();
        if (modelo.nave.chocaCon(asteroide)) {
            modelo.juegoTerminado = true;
        }
    }
 
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
 
function reiniciar() {
    modelo.nave = new Nave();
    modelo.asteroides = crearAsteroides();
    modelo.juegoTerminado = false;
    requestAnimationFrame(loop);
}
 
requestAnimationFrame(loop);