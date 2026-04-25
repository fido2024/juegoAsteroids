// Modelo
// Contiene las clases y el estado del juego
// No dibuja nada, solo guarda y actualiza datos

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

        // este for genera puntos irregulares para que el asteroide no sea un circulo perfecto
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