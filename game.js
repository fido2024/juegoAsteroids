const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "white";
ctx.fillRect(250, 250, 100, 60);

/**ctx.font = "20px Arial";
ctx.fillStyle = "yellow";
ctx.fillText("Hola me presento [SOY] Fidel", 200, 80);
*/