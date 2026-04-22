\<div align="center"\>
\<img src="[https://cdn-icons-png.flaticon.com/512/744/744422.png](https://www.google.com/search?q=https://cdn-icons-png.flaticon.com/512/744/744422.png)" style="width:100px;" alt="Asteroids Engine Logo"\>

# Asteroids Canvas Engine

[](https://www.google.com/search?q=https://github.com/TuUsuario/asteroids-engine/blob/main/LICENSE)
[](https://www.google.com/search?q=https://github.com/TuUsuario/asteroids-engine/stargazers)
[](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
[](https://developer.mozilla.org/es/docs/Web/JavaScript)

\</div\>

<br>

Un motor de videojuego 2D ligero y moderno construido desde cero para comprender las bases del renderizado gráfico, la física vectorial y las transformaciones lineales espaciales. Proyecto académico desarrollado en la **Universidad Mayor de San Simón (UMSS)**.

\<div align="center"\>
\<a href="[https://github.com/TuUsuario/asteroids-engine/archive/refs/heads/main.zip](https://www.google.com/search?q=https://github.com/TuUsuario/asteroids-engine/archive/refs/heads/main.zip)"\>\<img src="[https://img.shields.io/badge/Descargar\_Código-ZIP-blue?style=for-the-badge\&logo=download](https://www.google.com/search?q=https://img.shields.io/badge/Descargar_C%C3%B3digo-ZIP-blue%3Fstyle%3Dfor-the-badge%26logo%3Ddownload)" alt="Download"\>\</a\>
\<a href="[https://TuUsuario.github.io/asteroids-engine/](https://www.google.com/search?q=https://TuUsuario.github.io/asteroids-engine/)"\>\<img src="[https://img.shields.io/badge/Jugar\_Demo-Online-success?style=for-the-badge\&logo=play](https://www.google.com/search?q=https://img.shields.io/badge/Jugar_Demo-Online-success%3Fstyle%3Dfor-the-badge%26logo%3Dplay)" alt="Play Demo"\>\</a\>
\</div\>

## Features 🚀

✅ **Motor de Física Vectorial:** Descomposición trigonométrica para aceleración e inercia (`Math.sin`, `Math.cos`).

✅ **Sistema de Control Híbrido:** Soporte nativo para esquemas de control simultáneos (WASD + Flechas) mediante un Hash Map de estados `O(1)`.

✅ **Renderizado Acelerado:** Transformaciones de matriz (`translate`, `rotate`) sobre el contexto local de la nave.

✅ **Topología Espacial:** Entorno toroidal infinito (wrapping borders).

✅ **100% Vanilla:** Cero dependencias, cero frameworks externos. Pura lógica matemática y JavaScript.

✅ **Performance Estable:** Game Loop optimizado y bloqueado a \~60 FPS (16ms).

## Screenshots 📸

*(Agrega aquí capturas de pantalla de tu nave moviéndose por el espacio)*

## Instalación y Ejecución 🪟🐧🍎

A diferencia de las aplicaciones de escritorio, este motor gráfico corre directamente en el navegador de tu preferencia, sin necesidad de compiladores ni entornos de ejecución pesados.

  - **Forma Tradicional (Local)**

    Simplemente clona el repositorio o descarga el archivo ZIP, extrae los archivos y abre el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

    ```bash
    git clone https://github.com/TuUsuario/asteroids-engine.git
    cd asteroids-engine
    ```

  - **Servidor de Desarrollo (Live Server)**

    Si usas VS Code y quieres probar modificaciones en tiempo real, puedes instalar la extensión **Live Server** y hacer clic derecho sobre `index.html` \> *Open with Live Server*.

## Controles 🎮

El sistema de input soporta combinaciones diagonales (ej. Avanzar + Girar) sin bloqueos:

| Acción | Tecla Principal | Tecla Alternativa |
| :--- | :--- | :--- |
| **Propulsión** | `W` | `Flecha Arriba` |
| **Rotación Izquierda** | `A` | `Flecha Izquierda` |
| **Rotación Derecha** | `D` | `Flecha Derecha` |

## Tecnologías Utilizadas 🛠️

  - [HTML5 Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API) - Motor de renderizado 2D
  - [JavaScript (ES6+)](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lógica y Game Loop
  - [Flaticon](https://www.flaticon.com/) - Recursos iconográficos

## Autor 👨‍💻

**Ing. Fidel Vasquez**
Desarrollador del motor y de la lógica vectorial.

Si este proyecto te ha sido útil para entender cómo funcionan los motores de videojuegos por debajo, considera dejar una ⭐ en el repositorio.