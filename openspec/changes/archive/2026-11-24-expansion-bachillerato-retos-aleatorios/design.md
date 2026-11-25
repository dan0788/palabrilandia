# Design

## Context

La aplicación cuenta con una suite inicial de 5 juegos didácticos con estética minimalista pastel infantil. El usuario solicita extender la plataforma hacia el nivel de bachillerato, enriquecer los retos existentes con aleatoriedad para cada sesión, añadir más consejos y guías a la biblioteca, y eliminar el botón visible de OpenSpec de la interfaz para mantener una experiencia de usuario 100% pedagógica.

## Goals / Non-Goals

**Goals:**
- Implementar módulos de bachillerato con rigor académico (oraciones compuestas, tilde diacrítica, figuras literarias de vanguardia y realismo mágico).
- Crear un motor de barajado aleatorio (Fisher-Yates) reutilizable para que ningún intento presente el mismo orden ni el mismo conjunto estático de retos.
- Ampliar significativamente los bancos de preguntas de todos los juegos.
- Expandir la biblioteca con fichas de consulta avanzadas y el repertorio de consejos sabios de Plumi.
- Eliminar la pestaña/botón "OpenSpec" de la barra de navegación y retirar su componente/ruta visible.

**Non-Goals:**
- No eliminar la infraestructura ni las especificaciones de OpenSpec del repositorio del proyecto (sigue siendo el estándar SDD); solo se remueve su exposición en la interfaz de usuario.
- No perder la estética minimalista ni la paleta pastel, adaptándola armónicamente para acoger tanto retos primarios como de bachillerato.

## Decisions

1. **Selector de Nivel / Modo Bachillerato**:
   - Incorporar un selector de dificultad/nivel (Primaria / Bachillerato) o acceso directo a retos de bachillerato dentro de los juegos y la biblioteca.
2. **Utilidad de Barajado Aleatorio (`shuffleArray`)**:
   - Implementar un helper puro `shuffleArray<T>(array: T[]): T[]` para barajar preguntas y opciones cada vez que un componente se inicializa o reinicia.
3. **Ampliación de Contenidos**:
   - Ortografía: Tilde diacrítica (*aun/aún*, *si/sí*, *de/dé*), grafías homófonas (*echo/hecho*, *tubo/tuvo*, *bello/vello*).
   - Gramática: Nexos coordinantes y subordinantes, proposiciones subordinadas sustantivas, adjetivas y adverbiales.
   - Literatura Moderna: Generación del 27 (Lorca, Cernuda), Realismo Mágico (García Márquez), Vanguardias (Ultraísmo, Creacionismo) y Modernismo (Rubén Darío).
4. **Remoción de UI de OpenSpec**:
   - Eliminar `app-navbar.component.html` pill de OpenSpec.
   - Eliminar ruta `/openspec` de `app.routes.ts`.

## Risks / Trade-offs

- *Riesgo*: Mayor dificultad de las preguntas de bachillerato que contraste con la sencillez inicial.
  *Mitigación*: Indicador visual claro de nivel (Etiquetas "Bachillerato", "Avanzado") y explicaciones pedagógicas detalladas en caso de error.
