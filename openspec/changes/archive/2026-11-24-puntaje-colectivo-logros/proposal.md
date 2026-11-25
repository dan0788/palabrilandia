# Proposal

## Why

Actualmente en la sección `/logros`, los estudiantes visualizan su progreso, medallas y diplomas sin una indicación clara de que la sabiduría y puntos de experiencia se suman en conjunto entre todos los usuarios que utilizan la plataforma. Mostrar un mensaje explícito sobre la puntuación colectiva refuerza la cooperación pedagógica, incentivando a cada estudiante a aportar al esfuerzo grupal y motivando el aprendizaje compartido.

## What Changes

- Incorporar en la sección de logros (`/logros`) un aviso o banner informativo visualmente destacado que comunique con claridad que los puntos de experiencia y el progreso se acumulan de forma colectiva y colaborativa entre todos los usuarios de la plataforma.
- Integrar diseño estilizado en tonos pastel con iconografía comunitaria (manos unidas, mundo de lectores o comunidad de exploradores) perfectamente armónico con la estética infantil y juvenil de la app.
- Incluir un contador o indicador de "Fuerza Lectora Colectiva / Sabiduría Compartida" que resalte el valor de la aportación de cada usuario a la comunidad.

## Capabilities

### Modified Capabilities
- `gamificacion-lengua`: Incorpora el requisito de comunicación y visualización de la puntuación colectiva acumulada entre todos los usuarios en la sección de logros.

## Impact

- Modificación de la plantilla y estilos del componente `AchievementsComponent` (`src/app/features/achievements/achievements.component.html` y `.scss`).
- Integración en el servicio `GamificationService` si se requiere exponer datos o mensajes contextuales de la comunidad.
