const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); //en que dimension

// pinto y dibujo mi lienzo
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

//dibujando rectangulos
ctx.fillStyle = "white";
ctx.fillRect(50, 50, 100, 60);

ctx.fillStyle = "white";
ctx.fillRect(250, 250, 200, 100);

//se puede escribir texto en el canvas
ctx.font = "20px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("Hola mundoooo", 200, 80);

ctx.font = "20px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("Hola a todos", 300, 120);