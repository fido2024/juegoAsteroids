const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d"); //en que dimension

// pinto y dibujo mi lienzo
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);