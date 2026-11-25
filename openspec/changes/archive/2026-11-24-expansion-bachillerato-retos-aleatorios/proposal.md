# Proposal

## Why

La plataforma educativa actual cuenta con minijuegos didácticos iniciales. Para ampliar su alcance formativo a estudiantes de secundaria y bachillerato, se requiere incorporar retos de mayor rigor académico (sintaxis compuesta, ortografía avanzada y literatura moderna/contemporánea), dinamizar cada partida con retos aleatorios para evitar la memorización y depurar la interfaz retirando accesos de desarrollo como el botón de OpenSpec.

## What Changes

- **Juegos de Nivel Bachillerato**: Incorporación de modalidades y retos avanzados que abordan sintaxis de oraciones compuestas (coordinadas y subordinadas), ortografía crítica (tilde diacrítica, homófonos) y literatura moderna (Vanguardias, Generación del 27, Realismo Mágico).
- **Ejecución Aleatoria de Retos**: Implementación de un motor de selección y barajado aleatorio (shuffle) para que cada intento ofrezca combinaciones y órdenes diferentes de preguntas y palabras.
- **Ampliación de Retos en Todos los Juegos**: Incremento sustancial del banco de preguntas y desafíos en cada uno de los juegos existentes.
- **Expansión de la Biblioteca y Consejos Sabios**: Incorporación de nuevas guías temáticas sobre movimientos literarios modernos y análisis sintáctico en la biblioteca, junto con un repertorio enriquecido de consejos de la mascota Plumi.
- **Eliminación del Botón y Contenido "OpenSpec"**: Retiro del botón de navegación, rutas y pantallas de OpenSpec de la interfaz de usuario para mantener un entorno 100% inmersivo para el estudiante.

## Capabilities

### New Capabilities
- `juegos-bachillerato`: Módulos de juego y evaluación adaptados al currículo de bachillerato que cubren sintaxis compleja, literatura contemporánea/moderna y ortografía avanzada.

### Modified Capabilities
- `juegos-interactivos`: Adición de selección y orden aleatorio de retos en cada partida, y expansión del banco de desafíos disponibles.
- `interfaz-infantil`: Limpieza de la barra de navegación eliminando accesos visibles a OpenSpec y ampliación de guías en la biblioteca y consejos de la mascota.

## Impact

- Frontend: Componentes de juegos (`WordFill`, `WordSearch`, `Riddles`, `SentenceBuilder`, `Trivia`), nuevos componentes de bachillerato, servicio de biblioteca y navegación.
- Rutas: Retiro de la ruta `/openspec` y del enlace correspondiente en la barra de navegación.
- Algoritmos: Mecanismos de muestreo aleatorio (Fisher-Yates) para la selección de retos por intento.
