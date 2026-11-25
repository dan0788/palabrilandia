# Design

## Context

La plataforma busca enseñar conceptos de Lengua y Literatura (morfología, sintaxis, ortografía de b/v, c/s/z, tipos de rima, recursos literarios y fábulas) a niños de primaria mediante interacción directa en el navegador. La interfaz no debe sobrecargar al estudiante con elementos ruidosos, sino usar un minimalismo cálido con microinteracciones gratificantes.

## Goals / Non-Goals

**Goals:**
- Proporcionar 5 juegos interactivos únicos, dinámicos y sin dependencias de backend.
- Feedback inmediato con explicaciones claras adaptadas a niños ("¡Genial! Los adjetivos calificativos describen al sustantivo").
- Paleta visual pastel: Turquesa menta, Amarillo sol, Melocotón/Coral suave, Azul cielo y Lavanda.
- Sintetizador de audio nativo mediante Web Audio API para no depender de archivos externos de audio que puedan fallar.
- Efectos de celebración con confeti en hitos completados.
- Persistencia del progreso en LocalStorage para guardar estrellas, rachas y medallas.

**Non-Goals:**
- No requiere backend ni base de datos remota; la aplicación es 100% frontend y autónoma.
- No sobrepasar el límite de 5 juegos interactivos establecido en el requerimiento.

## Decisions

1. **Angular Standalone Components + Signals**:
   - Usar Signals de Angular (`signal`, `computed`) para manejar el estado del juego, temporizadores y puntajes con reactividad ultra-eficiente sin boilerplate.
2. **Audio Sintetizado con Web Audio API**:
   - En lugar de archivos MP3 externos pesados que puedan sufrir errores de red o CORS, implementamos un servicio de audio que sintetiza notas alegres, campanadas de éxito y sonidos de toque mediante osciladores (`OscillatorNode`).
3. **5 Juegos Especializados**:
   - *Palabras al Rescate*: Arrastre o selección de fichas para completar oraciones gramaticales y ortográficas.
   - *Caza de Letras Literarias*: Matriz interactiva de sopa de letras con selección de casillas y trazado visual.
   - *El Búho Sabio*: Adivinanzas con pistas progresivas y sistema de pistas con letras.
   - *El Taller de Cuentos*: Arrastre y organización de bloques de palabras para formar oraciones y versos coherentes.
   - *Rueda de Letras (Trivia)*: Preguntas de opción múltiple con categorías infantiles de literatura y ortografía.
4. **Mascota Acompañante ("Plumi")**:
   - Proporciona retroalimentación emocional, celebra aciertos y anima al niño tras errores sin frustración.

## Risks / Trade-offs

- *Riesgo*: Complejidad de interacción en dispositivos táctiles en la sopa de letras.
  *Mitigación*: Soporte tanto para clic/touch en casilla inicio-fin como para selección de celdas accesibles.
- *Riesgo*: Accesibilidad para niños con problemas de visión.
  *Mitigación*: Colores con alto contraste de texto sobre fondos pastel, fuentes grandes y legibles.
