# Spec Delta: juegos-interactivos

## ADDED Requirements

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
