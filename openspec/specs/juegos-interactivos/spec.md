# Spec: juegos-interactivos

## Purpose
Proporcionar una suite de 5 juegos didácticos interactivos basados en el currículo de Lengua y Literatura para niños: completar oraciones, sopa de letras, adivinanzas literarias, ordenar la oración y trivia de lenguaje.

## Requirements

### Requirement: 5 Minijuegos de Lengua y Literatura
El sistema SHALL ofrecer exactamente cinco modalidades lúdicas interactivas enfocadas en vocabulario, ortografía, sintaxis y literatura.

#### Scenario: Juego 1 - Rellena la Palabra
- **WHEN** el estudiante interactúa con una oración incompleta
- **THEN** puede seleccionar la palabra u ortografía adecuada (ej: b/v, sinónimos, concordancia) recibiendo feedback inmediato

#### Scenario: Juego 2 - Sopa de Letras Literaria
- **WHEN** el estudiante localiza y selecciona las letras de una palabra de literatura en la matriz
- **THEN** la palabra se resalta con color suave, se tacha de la lista de pendientes y se suma progreso

#### Scenario: Juego 3 - Adivinanzas del Sabio Búho
- **WHEN** el estudiante lee un acertijo o rima infantil
- **THEN** puede solicitar pistas progresivas o adivinar la respuesta con letras interactivas

#### Scenario: Juego 4 - Ordena la Fábula
- **WHEN** el estudiante recibe bloques de palabras desordenados que conforman un verso o moraleja
- **THEN** puede mover o reorganizar las tarjetas hasta formar la frase correcta

#### Scenario: Juego 5 - Trivia de Lengua y Letras
- **WHEN** el estudiante participa en una ronda de preguntas rápidas
- **THEN** responde preguntas sobre géneros literarios, partes de la oración y autores infantiles

### Requirement: Aleatorización Dinámica de Retos
El sistema SHALL presentar los retos, preguntas y opciones de forma aleatoria en cada intento de juego para evitar patrones repetitivos.

#### Scenario: Inicio o reinicio de partida
- **WHEN** el estudiante inicia o reinicia cualquiera de los juegos interactivos
- **THEN** el sistema baraja y selecciona un subconjunto aleatorio del banco de preguntas mediante un algoritmo de barajado

### Requirement: Expansión de Bancos de Desafíos
El sistema SHALL contar con un banco ampliado de preguntas, oraciones y acertijos para cada una de las modalidades didácticas.

#### Scenario: Variedad entre intentos sucesivos
- **WHEN** el usuario juega múltiples partidas consecutivas
- **THEN** encuentra retos distintos extraídos del repertorio ampliado
