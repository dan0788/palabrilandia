# Spec Delta: gamificacion-lengua

## ADDED Requirements

### Requirement: Puntuación Colectiva y Comunitaria
El sistema SHALL mostrar en la sección de logros un mensaje visible que indique que el puntaje acumulado representa el esfuerzo conjunto de todos los usuarios y exploradores que usan la aplicación.

#### Scenario: Visualización del aviso comunitario
- **WHEN** el usuario navega a la sección `/logros`
- **THEN** visualiza un banner informativo destacado que explica que los puntos se acumulan colectivamente entre todos los lectores de la plataforma

#### Scenario: Motivación de colaboración
- **WHEN** el usuario consulta su diploma o sus medallas
- **THEN** se refuerza que cada reto completado contribuye al marcador y nivel colectivo de la comunidad escolar
