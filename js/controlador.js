// Controlador
// Maneja la logica del juego: mover, colisiones, eventos
// Conecta el modelo con la vista

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

    // limpiar destruidos y disparos fuera del canvas
    modelo.asteroides = modelo.asteroides.filter(function(a) {
        return !a.destruido;
    });

    modelo.disparos = modelo.disparos.filter(function(d) {
        return !d.destruido && d.dentroDeLienzo();
    });

    // si quedan menos de 3 asteroides crear nueva oleada
    if (modelo.asteroides.length < 3) {
        modelo.asteroides = crearOleada();
    }

    // colision nave con asteroide
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


// esta funcion reinicia el juego creando un nuevo modelo
function reiniciar() {
    if (loopActivo) return;
    modelo.nave = new Nave();
    modelo.asteroides = crearOleada();
    modelo.disparos = [];
    modelo.juegoTerminado = false;
    loopActivo = true;
    requestAnimationFrame(loop);
}