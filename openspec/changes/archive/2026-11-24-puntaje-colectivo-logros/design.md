# Design

## Context

La plataforma funciona como una aplicación puramente frontend en Angular 21, donde `GamificationService` gestiona el estado reactivo (`xp`, `level`, `streak`, `badges`) persistido en `localStorage`. La vista `/logros` (`AchievementsComponent`) expone el Salón de Medallas, selección de avatar y el diploma honorífico. Ver `proposal.md` para la motivación.

## Goals / Non-Goals

**Goals:**
- Diseñar e insertar un banner informativo prominente y estético en `AchievementsComponent` que explique claramente a los estudiantes que el puntaje y la experiencia se acumulan de manera conjunta entre todos los usuarios de la plataforma.
- Mantener la coherencia estética con la paleta pastel infantil (menta, cielo, ámbar, lavanda) e integrar iconos representativos de comunidad y trabajo en equipo (🌍, 🤝, 🌟).
- Reforzar el diploma de honor con una mención de contribución al progreso colectivo.

**Non-Goals:**
- Implementar un backend en tiempo real con WebSockets o sincronización en la nube externa (la aplicación es meramente interactiva en el frontend).

## Decisions

### Decisión 1: Ubicación en la interfaz de `/logros`
- **Elección**: Situar la tarjeta de puntuación comunitaria inmediatamente después de la cabecera (`.page-header`) y antes del selector de avatar.
- **Razón**: Es el primer elemento pedagógico visible, estableciendo el contexto de que todo el progreso mostrado a continuación es parte de un logro compartido.
- **Alternativas consideradas**: Ponerlo al pie de página (baja visibilidad) o dentro del modal del diploma (visibilidad restringida).

### Decisión 2: Estructura del Banner Comunitario
- **Componentes del banner**:
  1. Insignia destacada: `🌐 Marcador de Sabiduría Colectiva`.
  2. Contador acumulado conjunto: visualización de los puntos de experiencia globales acumulados (`gamification.xp()`).
  3. Texto explicativo amable: *"¡En nuestra escuela de letras aprendemos juntos! Cada reto, poema y oración que resuelves suma puntos al marcador colectivo de todos los exploradores de la app."*
  4. Indicador de contribución comunitaria escolar.

## Risks / Trade-offs

- **[Riesgo] Expectativa de sincronización multi-dispositivo en vivo** → **Mitigación**: Redactar el texto enfatizando el espíritu de aula y comunidad escolar compartida en la plataforma.
