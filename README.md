# 🚀 Asteroids Canvas Engine

![Asteroids Engine Logo](https://imagenes.hobbyconsolas.com/files/image_1280_720/uploads/imagenes/2023/09/05/6903b87e02190.jpeg)

[![GitHub license](https://img.shields.io/github/license/TuUsuario/asteroids-engine?style=flat-square)](https://github.com/fido2024/juegoAsteroids/blob/main/LICENSE)
[![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/API/Canvas_API)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)

Un motor de videojuego 2D ligero y moderno construido desde cero para comprender las bases del renderizado gráfico, la física vectorial y las transformaciones lineales espaciales. Proyecto académico desarrollado en la **Universidad Mayor de San Simón (UMSS)**.

[![Descargar Código](https://img.shields.io/badge/Descargar_Código-ZIP-blue?style=for-the-badge&logo=download)](https://github.com/TuUsuario/asteroids-engine/archive/refs/heads/main.zip)
[![Jugar Demo](https://img.shields.io/badge/Jugar_Demo-Online-success?style=for-the-badge&logo=play)](https://github.com/fido2024/juegoAsteroids)

## Features 🚀

**Motor de Física Vectorial:** Descomposición trigonométrica para aceleración e inercia (`Math.sin`, `Math.cos`).

**Sistema de Control Híbrido:** Soporte nativo para esquemas de control simultáneos (WASD + Flechas) mediante un Hash Map de estados `O(1)`.

**Renderizado Acelerado:** Transformaciones de matriz (`translate`, `rotate`) sobre el contexto local de la nave.

**Topología Espacial:** Entorno toroidal infinito (wrapping borders).

**100% Vanilla:** Cero dependencias, cero frameworks externos. Pura lógica matemática y JavaScript.

**Performance Estable:** Game Loop optimizado y bloqueado a \~60 FPS (16ms).

## Screenshots 

*(Agrega aquí capturas de pantalla de tu nave moviéndose por el espacio)*

## Instalación y Ejecución 

A diferencia de las aplicaciones de escritorio, este motor gráfico corre directamente en el navegador de tu preferencia, sin necesidad de compiladores ni entornos de ejecución pesados.

  - **Forma Tradicional (Local)**

    Simplemente clona el repositorio o descarga el archivo ZIP, extrae los archivos y abre el archivo `index.html` con cualquier navegador moderno (Chrome, Firefox, Edge, Safari).

    ```bash
    git clone https://github.com/fido2024/juegoAsteroids.git
    cd juegoAsteroids
    ```

  - **Servidor de Desarrollo (Live Server)**

    Si usas VS Code y quieres probar modificaciones en tiempo real, puedes instalar la extensión **Live Server** y hacer clic derecho sobre `index.html` \> *Open with Live Server*.

## Controles 
El sistema de input soporta combinaciones diagonales (ej. Avanzar + Girar) sin bloqueos:

| Acción | Tecla Principal | Tecla Alternativa |
| :--- | :--- | :--- |
| **Propulsión** | `W` | `Flecha Arriba` |
| **Rotación Izquierda** | `A` | `Flecha Izquierda` |
| **Rotación Derecha** | `D` | `Flecha Derecha` |

## Tecnologías Utilizadas 
  - [HTML5 Canvas API](https://developer.mozilla.org/es/docs/Web/API/Canvas_API) - Motor de renderizado 2D
  - [JavaScript (ES6+)](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lógica y Game Loop
  - [Flaticon](https://www.flaticon.com/) - Recursos iconográficos

## Autor 👨‍💻

**Est. de Ingeneria Informatica Fidel Vasquez**
Desarrollador, Diseñador, Técnico.

Si este proyecto te ha sido útil para entender cómo funcionan los motores de videojuegos por debajo, considera dejar una ⭐ en el repositorio.