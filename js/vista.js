// Vista
// Solo se encarga de dibujar en el canvas
// No mueve nada ni toma decisiones, solo pinta

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