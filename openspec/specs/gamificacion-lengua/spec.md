# Spec: gamificacion-lengua

## Purpose
Gestionar el ciclo de gamificación escolar infantil que incluye experiencia (puntos), estrellas ganadas por nivel, racha de juego diario, medallas de maestría literaria y retroalimentación audiovisual positiva.

## Requirements

### Requirement: Registro y Actualización de Progreso
El sistema SHALL acumular puntos y estrellas al completar actividades didácticas con éxito.

#### Scenario: Niño acierta una pregunta o reto
- **WHEN** el usuario completa un desafío de lengua correctamente
- **THEN** el sistema otorga puntos, incrementa la racha actual y reproduce un sonido de éxito

#### Scenario: Desbloqueo de medallas
- **WHEN** el usuario acumula el número requerido de estrellas o completa un juego específico
- **THEN** el sistema desbloquea una medalla temática (p. ej. "Poeta Principiante", "Detective de Palabras") y dispara confeti

### Requirement: Puntuación Colectiva y Comunitaria
El sistema SHALL mostrar en la sección de logros un mensaje visible que indique que el puntaje acumulado representa el esfuerzo conjunto de todos los usuarios y exploradores que usan la aplicación.

#### Scenario: Visualización del aviso comunitario
- **WHEN** el usuario navega a la sección `/logros`
- **THEN** visualiza un banner informativo destacado que explica que los puntos se acumulan colectivamente entre todos los lectores de la plataforma

#### Scenario: Motivación de colaboración
- **WHEN** el usuario consulta su diploma o sus medallas
- **THEN** se refuerza que cada reto completado contribuye al marcador y nivel colectivo de la comunidad escolar
