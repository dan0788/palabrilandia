# Proposal

## Why

El aprendizaje de la lengua castellana y la literatura en etapas escolares tempranas requiere un enfoque dinámico y estimulante que aleje a los niños de la memorización pasiva. Esta plataforma ofrece un entorno interactivo y gamificado diseñado específicamente para niños en edad escolar, combinando retos didácticos con una interfaz minimalista, accesible y estimulante.

## What Changes

Creación de una aplicación web completa en Angular con arquitectura moderna (Standalone Components, Signals, Reactive State, SCSS y Web Audio API) que incluye:
1. Motor de gamificación infantil (estrellas, puntos de experiencia, rachas, medallas de maestría lectora y feedback sonoro).
2. Cinco juegos interactivos educativos de Lengua y Literatura:
   - Juego 1: Rellena la Palabra (Completar oraciones con opciones gramaticales y ortográficas).
   - Juego 2: Sopa de Letras Literaria (Búsqueda interactiva de términos poéticos y narrativos).
   - Juego 3: Adivinanzas del Sabio Búho (Acertijos con pistas progresivas y revelación lúdica).
   - Juego 4: Ordena la Fábula / Versos (Reordenar sintagmas y versos literarios desordenados).
   - Juego 5: Trivia de Lengua y Letras (Desafío por rondas con categorías gramaticales y literarias).
3. Sistema visual minimalista con paleta pastel adaptada para niños, tipografía legible y mascota guía interactiva ("Plumi").
4. Integración de OpenSpec para trazabilidad y especificación formal de requerimientos.

## Capabilities

### New Capabilities
- `gamificacion-lengua`: Sistema de puntuación, progresión por niveles, estrellas, medallas de maestría y recompensas audiovisuales para niños.
- `juegos-interactivos`: Los cinco minijuegos interactivos de Lengua y Literatura con retroalimentación inmediata y explicaciones pedagógicas.
- `interfaz-infantil`: Sistema de diseño minimalista con paleta de colores suave para niños, componentes redondeados y navegación fluida.

### Modified Capabilities

None.

## Impact

- Frontend: Proyecto Angular 21 Standalone con soporte de SCSS y componentes reactivos.
- Estándar OpenSpec configurado en `.agents/` y `openspec/`.
- Dependencias añadidas: `canvas-confetti`, `@fission-ai/openspec`.
