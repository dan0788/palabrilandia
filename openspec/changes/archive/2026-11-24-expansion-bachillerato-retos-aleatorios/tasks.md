# Tasks

## 1. Limpieza de Interfaz y Navegación

- [x] 1.1 Eliminar el botón y píldora "OpenSpec" de la barra de navegación en `navbar.component.html` y depurar estilos en `navbar.component.scss`.
- [x] 1.2 Retirar la ruta `/openspec` de `app.routes.ts` y limpiar referencias huérfanas en la aplicación.

## 2. Motor de Aleatorización y Retos Dinámicos

- [x] 2.1 Crear utilidad de barajado aleatorio (`shuffleArray`, `sampleRandom`) en `core/utils/random.util.ts` para muestreo sin repetición por sesión.
- [x] 2.2 Ampliar el banco de oraciones en `WordFillComponent` y aplicar barajado aleatorio en cada intento.
- [x] 2.3 Ampliar el repertorio de términos en `WordSearchComponent` y aleatorizar selección de tableros temáticos en cada partida.
- [x] 2.4 Ampliar el banco de adivinanzas poéticas en `RiddlesComponent` con selección aleatoria por intento.
- [x] 2.5 Ampliar las oraciones y fábulas en `SentenceBuilderComponent` integrando barajado aleatorio de retos.
- [x] 2.6 Ampliar sustancialmente el banco de preguntas de `TriviaComponent` seleccionando rondas aleatorias por partida.

## 3. Retos y 7 Nuevos Juegos Interactivos de Nivel Bachillerato

- [x] 3.1 Implementar `SyntaxLabComponent` (`/juegos/sintaxis`): Laboratorio de análisis sintáctico de oraciones compuestas (coordinadas y subordinadas sustantivas, adjetivas y adverbiales).
- [x] 3.2 Implementar `LiteraryTimelineComponent` (`/juegos/cronos`): Cronos literario para clasificar autores y obras en Gen 98, Gen 27, Vanguardias y Realismo Mágico.
- [x] 3.3 Implementar `DiacriticDuelComponent` (`/juegos/tildes`): Duelo rápido de tildes diacríticas según normas RAE (dé/de, sí/si, aún/aun, mas/más, etc.).
- [x] 3.4 Implementar `RhetoricalFiguresComponent` (`/juegos/figuras`): El Ojo Poético para detectar metáforas, sinestesias, oxímoros, hipérboles y anáforas.
- [x] 3.5 Implementar `HomophonesComponent` (`/juegos/homofonos`): Batalla de homófonos dudosos (revelar/rebelar, gravar/grabar, valla/vaya, etc.).
- [x] 3.6 Implementar `MicrofictionComponent` (`/juegos/microficcion`): Relámpago de letras con microrrelatos de Monterroso, Borges y García Márquez para comprensión crítica y subtexto.
- [x] 3.7 Implementar `QuoteAnagramsComponent` (`/juegos/anagramas`): Descifrador del 27 con anagramas interactivos de citas célebres.
- [x] 3.8 Configurar el enrutador `app.routes.ts` con las 12 rutas de juegos activas.

## 4. Expansión del Sistema de Gamificación (Medallas)

- [x] 4.1 Expandir el catálogo de medallas en `GamificationService` de 6 a 14 medallas con insignias exclusivas para bachillerato (Analista Sintáctico, Cronista Literario, Francotirador de la Tilde, Ojo Retórico, Maestro de Homófonos, Lector de Microficción, Descifrador de Versos, Erudito de Bachillerato).
- [x] 4.2 Integrar el selector de filtro por niveles (Todos [12], Primaria [5], Bachillerato [7]) en el portal de Inicio `HomeComponent`.

## 5. Biblioteca Extendida y Consejos Sabios

- [x] 5.1 Expandir el repertorio de consejos sabios de la mascota Plumi en `MascotComponent` con 13 citas, advertencias gramaticales y trucos poéticos.
- [x] 5.2 Añadir 7 guías didácticas completas y secretos a `LibraryComponent` sobre sintaxis de oraciones compuestas, tildes diacríticas y movimientos literarios modernos.

## 6. Verificación y Validación

- [x] 6.1 Validar la propuesta y especificaciones del cambio ejecutando `npm run openspec:validate`.
- [x] 6.2 Compilar el proyecto con `npm run build` y comprobar ausencia de errores en TypeScript y SCSS.
