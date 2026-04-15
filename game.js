
// conexion con canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); //en que dimension

// pinto y dibujo mi lienzo
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

 
// La nave empieza en el centro del canvas
let naveX = canvas.width / 2;   // 300
let naveY = canvas.height / 2;  // 250
 
// save() guarda el estado antes de mover el origen
ctx.save();
 
// translate mueve el "origen" al centro de la nave
// asi los puntos del triangulo son relativos a la nave
ctx.translate(naveX, naveY);
 
ctx.beginPath();
ctx.moveTo(0, -20);    // punta delantera (arriba)
ctx.lineTo(14, 16);    // esquina derecha
ctx.lineTo(-14, 16);   // esquina izquierda
ctx.closePath();
 
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();
 
// restore() devuelve el origen a (0,0)
ctx.restore();
