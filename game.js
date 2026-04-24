
// conexion con el canvas en el html
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// Modelo
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

        if (teclas["ArrowUp"] || teclas["w"]) {
            this.x += Math.sin(this.angulo) * this.velocidad;
            this.y -= Math.cos(this.angulo) * this.velocidad;
        }

        if (this.x > canvas.width)  this.x = 0;
        if (this.x < 0)             this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0)             this.y = canvas.height;
    }

    // esta funcion devuelve true si la nave choca con el asteroide
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
        this.destruido = false;

        
        this.puntos = [];
        let numPuntos = 10; // numero de vertices del asteroide

        //este for genera puntos irregulares para que el asteroide no sea un circulo perfecto
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


class Disparo {
    constructor(x, y, angulo) {
        this.x = x;
        this.y = y;
        this.dx = Math.sin(angulo) * 7;
        this.dy = -Math.cos(angulo) * 7;
        this.radio = 3;
        this.destruido = false;
    }

    mover() {
        this.x += this.dx;
        this.y += this.dy;
    }

    dentroDeLienzo() {
        return this.x > 0 && this.x < canvas.width &&
               this.y > 0 && this.y < canvas.height;
    }

    chocaCon(asteroide) {
        let distancia = Math.hypot(this.x - asteroide.x, this.y - asteroide.y);
        return distancia < this.radio + asteroide.radio;
    }
}


// crea una oleada de 5 asteroides en los bordes del canvas
function crearOleada() {
    let oleada = [];
    let cantidad = 5;

    
    for (let i = 0; i < cantidad; i++) {
        // elige aleatoriamente en que borde aparece cada asteroide usando floor y random
        let borde = Math.floor(Math.random() * 4);
        let x, y;

        if (borde === 0) { x = Math.random() * canvas.width;  y = 0; }
        if (borde === 1) { x = Math.random() * canvas.width;  y = canvas.height; }
        if (borde === 2) { x = 0;            y = Math.random() * canvas.height; }
        if (borde === 3) { x = canvas.width; y = Math.random() * canvas.height; }

        // radio aleatorio entre 20 y 40px
        let radio = 20 + Math.random() * 20;

        oleada.push(new Asteroide(x, y, radio));
    }

    return oleada;
}

// esta variable contiene el estado actual del juego
let modelo = {
    nave: new Nave(),
    asteroides: crearOleada(),
    disparos: [],
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

    dibujarDisparo(disparo) {
        ctx.beginPath();
        ctx.arc(disparo.x, disparo.y, disparo.radio, 0, Math.PI * 2);
        ctx.fillStyle = "yellow";
        ctx.fill();
    },

    dibujarFinDelJuego() {
        ctx.fillStyle = "white";
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("FIN DEL JUEGO", canvas.width / 2, canvas.height / 2 - 20);

        ctx.fillStyle = "lime";
        ctx.font = "20px Arial";
        ctx.fillText("presiona << Enter >> para nuevo juego", canvas.width / 2, canvas.height / 2 + 30);
    }

};


// Controlador

let teclas = {};

document.addEventListener("keydown", function(e) {
    teclas[e.key] = true;

    if (e.key === " " && !modelo.juegoTerminado) {
        let puntaX = modelo.nave.x + Math.sin(modelo.nave.angulo) * 20;
        let puntaY = modelo.nave.y - Math.cos(modelo.nave.angulo) * 20;
        modelo.disparos.push(new Disparo(puntaX, puntaY, modelo.nave.angulo));
    }

    if (e.key === "Enter" && modelo.juegoTerminado) {
        reiniciar();
    }
});

document.addEventListener("keyup", function(e) {
    teclas[e.key] = false;
});


let loopActivo = false;

function loop() {
    if (modelo.juegoTerminado) {
        loopActivo = false;
        vista.dibujarFinDelJuego();
        return;
    }

    // movemos todo antes de dibujar 
    modelo.nave.mover(teclas);

    for (let asteroide of modelo.asteroides) {
        asteroide.mover();
    }

    for (let disparo of modelo.disparos) {
        disparo.mover();
    }

    
    // cada disparo solo puede destruir UN asteroide
    for (let disparo of modelo.disparos) {
        if (disparo.destruido) continue; 
        for (let asteroide of modelo.asteroides) {
            if (asteroide.destruido) continue; 
            if (disparo.chocaCon(asteroide)) {
                disparo.destruido = true;
                asteroide.destruido = true;
                break; 
            }
        }
    }

    //  limpiar destruidos y disparos fuera del canvas
    modelo.asteroides = modelo.asteroides.filter(function(a) {
        return !a.destruido;
    });

    modelo.disparos = modelo.disparos.filter(function(d) {
        return !d.destruido && d.dentroDeLienzo();
    });

    //  si no quedan asteroides crear nueva oleada
    if (modelo.asteroides.length <3) {
        modelo.asteroides = crearOleada();
    }

    // hace colision nave con asteroide 
    for (let asteroide of modelo.asteroides) {
        if (modelo.nave.chocaCon(asteroide)) {
            modelo.juegoTerminado = true;
        }
    }

    // llamo a vista para dibujar
    vista.dibujarFondo();
    vista.dibujarNave(modelo.nave);

    for (let asteroide of modelo.asteroides) {
        vista.dibujarAsteroide(asteroide);
    }

    for (let disparo of modelo.disparos) {
        vista.dibujarDisparo(disparo);
    }

    requestAnimationFrame(loop);
}

//esta funcion reinicia el juego creando un nuevo modelo
function reiniciar() {
    if (loopActivo) return;
    modelo.nave = new Nave();
    modelo.asteroides = crearOleada();
    modelo.disparos = [];
    modelo.juegoTerminado = false;
    loopActivo = true;
    requestAnimationFrame(loop);
}

loopActivo = true; // activa el loop 
requestAnimationFrame(loop);