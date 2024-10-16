document.addEventListener('DOMContentLoaded', (event) => {
    const compuestos = [
        { nombre: "Metanal", grupo: "Aldehído", formula: "HCHO", funcion: "Conservante", img: "metanal.jpeg" },
        { nombre: "Propanona", grupo: "Cetona", formula: "CH3COCH3", funcion: "Solvente", img: "propanona.jpeg" },
        { nombre: "Etanol", grupo: "Alcohol", formula: "C2H5OH", funcion: "Bebida alcohólica", img: "etanol.jpeg" },
        { nombre: "Butanal", grupo: "Aldehído", formula: "C4H8O", funcion: "Producción de resinas", img: "butanal.jpeg" },
        { nombre: "Butanona", grupo: "Cetona", formula: "C4H8O", funcion: "Solvente industrial", img: "butanona.jpeg" },
        { nombre: "Metanol", grupo: "Alcohol", formula: "CH3OH", funcion: "Combustible", img: "metanol.jpeg" },
    ];

    let puntosJugador1 = 0;
    let puntosJugador2 = 0;
    let jugadorActual = 1;
    let compuestoActual = null;
    let fase = "identificacion";

    // Referencias a elementos del DOM
    const iniciarBtn = document.getElementById('iniciar-btn');
    const preguntaEl = document.getElementById('pregunta');
    const cartasEl = document.getElementById('cartas');
    const imgContainer = document.getElementById('img-container');
    const img = document.getElementById('img');
    const puntuacionEl = document.getElementById('puntuacion');

    // Función para iniciar el juego
    function iniciarJuego() {
        puntosJugador1 = 0;
        puntosJugador2 = 0;
        actualizarPuntuacion();
        jugadorActual = 1;
        fase = "identificacion";
        iniciarBtn.style.display = 'none'; // Ocultar el botón de inicio
        siguienteTurno();
    }

    // Función para mostrar una nueva pregunta
    function siguienteTurno() {
        compuestoActual = compuestos[Math.floor(Math.random() * compuestos.length)];

        // Limpiar las opciones anteriores
        cartasEl.innerHTML = '';
        imgContainer.innerHTML = '';
        const imgElement = document.createElement('img');
        imgElement.src = `${compuestoActual.img}`;
        imgElement.className = "img";
        imgContainer.appendChild(imgElement);
        if (fase === "identificacion") {
            preguntaEl.textContent = `Fórmula: ${compuestoActual.formula} - ¿Cuál es su grupo funcional?`;
            mostrarOpciones(["Aldehído", "Cetona", "Alcohol"]);
        } else if (fase === "nomenclatura") {
            preguntaEl.textContent = `¿Cuál es el nombre correcto para la fórmula ${compuestoActual.formula}?`;
            mostrarOpciones(generarOpcionesNomenclatura(compuestoActual.nombre));
        } else if (fase === "funcion") {
            preguntaEl.textContent = `¿Cuál es la función de ${compuestoActual.nombre}?`;
            mostrarOpciones(generarOpcionesFuncion(compuestoActual.funcion));
        }
    }

    // Función para mostrar las opciones de respuesta
    function mostrarOpciones(opciones) {
        opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.textContent = opcion;
            btn.addEventListener('click', () => verificarRespuesta(opcion));
            cartasEl.appendChild(btn);
        });
    }

    // Función para generar opciones de nomenclatura
    function generarOpcionesNomenclatura(correcta) {
        const opciones = [correcta];
        while (opciones.length < 3) {
            const nombreAleatorio = compuestos[Math.floor(Math.random() * compuestos.length)].nombre;
            if (!opciones.includes(nombreAleatorio)) {
                opciones.push(nombreAleatorio);
            }
        }
        return mezclar(opciones);
    }

    // Función para generar opciones de función química
    function generarOpcionesFuncion(correcta) {
        const opciones = [correcta];
        while (opciones.length < 3) {
            const funcionAleatoria = compuestos[Math.floor(Math.random() * compuestos.length)].funcion;
            if (!opciones.includes(funcionAleatoria)) {
                opciones.push(funcionAleatoria);
            }
        }
        return mezclar(opciones);
    }

    // Función para mezclar las opciones
    function mezclar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Función para verificar la respuesta del jugador
    function verificarRespuesta(opcion) {
        if (fase === "identificacion") {
            if (opcion === compuestoActual.grupo) {
                alert("¡Correcto! +10 puntos.");
                sumarPuntos(10);
                fase = "nomenclatura";
            } else {
                alert(`Incorrecto. El grupo funcional correcto es: ${compuestoActual.grupo}`);
                fase = "identificacion";
            }
        } else if (fase === "nomenclatura") {
            if (opcion === compuestoActual.nombre) {
                alert("¡Correcto! +20 puntos.");
                sumarPuntos(20);
                fase = "funcion";
            } else {
                alert(`Incorrecto. El nombre correcto es: ${compuestoActual.nombre}`);
                fase = "identificacion";
            }
        } else if (fase === "funcion") {
            if (opcion === compuestoActual.funcion) {
                alert("¡Correcto! +30 puntos.");
                sumarPuntos(30);
                fase = "identificacion";
            } else {
                alert(`Incorrecto. La función correcta es: ${compuestoActual.funcion}`);
                fase = "identificacion";
            }
        }

        jugadorActual = jugadorActual === 1 ? 2 : 1;
        siguienteTurno();
    }

    // Función para sumar puntos
    function sumarPuntos(puntos) {
        if (jugadorActual === 1) {
            puntosJugador1 += puntos;
        } else {
            puntosJugador2 += puntos;
        }
        actualizarPuntuacion();
    }

    // Función para actualizar la puntuación
    function actualizarPuntuacion() {
        puntuacionEl.textContent = `Puntos Jugador 1: ${puntosJugador1} | Puntos Jugador 2: ${puntosJugador2}`;
    }

    // Añadir evento al botón de iniciar
    iniciarBtn.addEventListener('click', iniciarJuego);
});
