const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); //en que dimension

// pinto y dibujo mi lienzo
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//dibujando rectangulos
ctx.fillStyle = "white";
ctx.fillRect(50, 50, 100, 60);

ctx.fillStyle = "white";
ctx.fillRect(200, 150, 200, 100);

//se puede escribir texto en el canvas
ctx.font = "20px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("Hola mundoooo", 200, 80);

ctx.font = "20px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("Hola a todos", 300, 120);

//dibujando circulos, prueba para asteorids
ctx.beginPath();
ctx.arc(500, 150, 40, 0, Math.PI * 2);
ctx.strokeStyle = "white";
ctx.lineWidth = 4;
ctx.stroke();

ctx.beginPath();
ctx.arc(500, 300, 60, 30, Math.PI);
ctx.strokeStyle = "white";
ctx.lineWidth = 6;
ctx.stroke();

//dibujando la nave un tringulo
ctx.beginPath();
ctx.moveTo(300, 300); 
ctx.lineTo(330, 360); 
ctx.lineTo(270, 360); 
ctx.closePath();      // cierra la forma une el ultimo punto con el primero
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(400, 400);             
ctx.lineTo(330 + 100, 360 + 100); 
ctx.lineTo(270 + 100, 360 + 100); 
ctx.closePath();
ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke()