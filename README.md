# 📚 Palabrilandia | Aprendizaje Gamificado de Lengua y Literatura

Plataforma educativa web interactiva desarrollada en **Angular** (arquitectura standalone, signals y SCSS) con un sistema de diseño **minimalista y paleta pastel dedicada para niños**, enriquecida con un motor de gamificación completo y gobernada bajo el estándar **OpenSpec** (Spec-Driven Development).

---

## 🎨 Diseño y Paleta de Colores Infantil Minimalista

La interfaz fue diseñada evitando el ruido visual y saturación excesiva, priorizando la legibilidad, la suavidad y el confort visual para niños en edad escolar:

- **🌱 Menta Suave (`#4ECDC4` / `#EBF8F6`):** Gramática, aciertos y retroalimentación positiva.
- **☀️ Sol Ámbar (`#FFD166` / `#FFF9EB`):** Puntos de experiencia (XP), estrellas y recompensas.
- **🍓 Coral Melocotón (`#FF6B6B` / `#FFEFEF`):** Botones de acción, acentuación y ortografía.
- **☁️ Azul Nube (`#54A0FF` / `#EFF6FF`):** Comprensión lectora, trivia y categorías.
- **🌸 Lavanda Sabia (`#9B59B6` / `#F7EFFC`):** Poesía, rima y adivinanzas del búho.
- **Tipografía Amigable:** Familias *Quicksand* y *Nunito*, con formas curvas, caracteres claros y espaciado generoso.
- **Botones con relieve 3D táctil:** Feedback visual al presionar con desplazamiento suave.

---

## 🎮 Los 5 Juegos Didácticos Interactivos

La plataforma integra exactamente **cinco juegos interactivos** centrados en la rama de **Lengua y Literatura**:

### 1. 🧩 Palabras al Rescate (Completar Oraciones)
- **Ruta:** `/juegos/palabras`
- **Contenido:** Ortografía (reglas de *b* y *v*, tildes agudas, llanas y esdrújulas), morfología (sustantivos, adjetivos, verbos) y sinónimos.
- **Mecánica:** Frases con un hueco interactivo `[ ? ]`. El niño toca la ficha correcta para completar la oración y recibe explicaciones pedagógicas inmediatas.

### 2. 🔍 Caza de Letras Literarias (Sopa de Letras)
- **Ruta:** `/juegos/sopa`
- **Contenido:** Vocabulario literario clave (*Poema, Cuento, Verso, Rima, Fábula*).
- **Mecánica:** Matriz de letras interactiva. El estudiante hace clic en las letras en orden; al descubrir una palabra, se resalta con colores pasteles, se tacha del checklist y se muestra su definición literaria. Incluye botón de pista.

### 3. 🦉 El Búho Sabio: Adivinanzas (Acertijos y Poesía)
- **Ruta:** `/juegos/adivinanzas`
- **Contenido:** Poesía en estrofas rimadas sobre el libro, el lápiz, las letras, la biblioteca y los signos de puntuación.
- **Mecánica:** Pergamino poético con rimas. Permite solicitar pistas progresivas al búho y seleccionar entre alternativas ilustradas, explicando la figura literaria empleada (personificación, metáfora, rima consonante).

### 4. 📜 El Taller de Fábulas y Versos (Ordenar la Oración)
- **Ruta:** `/juegos/fabulas`
- **Contenido:** Estructura sintáctica (Sujeto + Verbo + Predicado), versos de autores como Antonio Machado y fábulas de Esopo (*La liebre y la tortuga*, *El poder de la lectura*).
- **Mecánica:** Banco de fichas desordenadas. El estudiante ensambla las palabras en la línea de trabajo y las comprueba para aprender la moraleja.

### 5. ⭐ Trivia: Rueda de las Letras (Desafío Rápido)
- **Ruta:** `/juegos/trivia`
- **Contenido:** Cuatro categorías infantiles (*Cuentos Clásicos*, *Poesía y Rima*, *Gramática Divertida*, *Ortografía Mágica*).
- **Mecánica:** Rondas interactivas con multiplicador de combo de racha (x1, x2, x3, x4) y explicaciones detalladas para cada respuesta.

---

## 🏆 Sistema de Gamificación y Multimedia

- **Puntos de Experiencia (XP) y Estrellas (⭐):** Acumulables por cada acierto y juego completado.
- **Sistema de Niveles:**
  - Nivel 1: *Aprendiz de Letras*
  - Nivel 2: *Explorador de Palabras*
  - Nivel 3: *Cazador de Rimas*
  - Nivel 4: *Cuentacuentos Sabio*
  - Nivel 5: *Maestro de la Pluma*
- **Medallero:** 6 insignias desbloqueables con animación de confeti (*Primer Paso Lector*, *Guardián de la Ortografía*, *Ojo de Halcón Literario*, etc.).
- **Mascota Interactiva ("Plumi el Búho"):** Ofrece ánimos, datos curiosos de ortografía y celebra cada victoria.
- **Efectos de Audio Nativos (Web Audio API):** Sonidos sintetizados en tiempo real mediante osciladores (notas alegres, campanadas de pista, fanfarria de victoria y sonido de clic), sin depender de archivos de audio externos. Incluye botón para silenciar.
- **Persistencia en LocalStorage:** El progreso del niño se guarda automáticamente en el navegador.

---

## 📐 OpenSpec: Desarrollo Guiado por Especificaciones

El proyecto incorpora **OpenSpec** (`@fission-ai/openspec`) formalmente configurado para auditar y validar los requerimientos de la plataforma:

- **Configuración:** `openspec/config.yaml`
- **Propuesta de Cambio Activa:** `openspec/changes/plataforma-aprendizaje-lengua/`
  - `proposal.md`: Justificación, motivación y alcance pedagógico.
  - `design.md`: Decisiones arquitectónicas, mitigación de riesgos y enfoque técnico.
  - `tasks.md`: Lista de tareas de implementación.
  - `specs/`: Especificaciones delta de capacidades.
- **Especificaciones Base:** `openspec/specs/`
  - `gamificacion-lengua/spec.md`: Reglas del motor de puntos, niveles y medallas.
  - `juegos-interactivos/spec.md`: Requerimientos de los 5 minijuegos educativos.
  - `interfaz-infantil/spec.md`: Criterios de diseño visual, contraste y accesibilidad para niños.

### Comandos de OpenSpec

Validar todas las especificaciones y propuestas del proyecto:
```bash
npm run openspec:validate
```

Consultar el estado del sistema con el CLI de OpenSpec:
```bash
npm run openspec -- list
```

---

## 🚀 Puesta en Marcha

### Prerrequisitos
- Node.js (v18 o superior)
- npm (v9 o superior)

### Ejecutar en Desarrollo
```bash
npm start
```
Abre tu navegador en `http://localhost:4200`.

### Compilar para Producción
```bash
npm run build
```
Los artefactos optimizados se generarán en la carpeta `dist/lengua-aventura`.

---

## 📁 Estructura del Código

```text
proyecto_aprendizaje/
├── openspec/                     # Especificaciones formales OpenSpec
│   ├── config.yaml
│   ├── specs/                    # Especificaciones maestras
│   │   ├── gamificacion-lengua/
│   │   ├── juegos-interactivos/
│   │   └── interfaz-infantil/
│   └── changes/                  # Propuesta plataforma-aprendizaje-lengua
├── src/
│   ├── app/
│   │   ├── components/           # Componentes comunes (Navbar, Mascota Plumi)
│   │   ├── core/
│   │   │   ├── models/           # Modelos de datos TypeScript (Juegos, Medallas, Stats)
│   │   │   └── services/         # Servicios reactivos (GamificationService, SoundService)
│   │   └── features/
│   │       ├── home/             # Dashboard principal con catálogo de juegos
│   │       ├── achievements/     # Salón de medallas, avatares y diploma
│   │       ├── library/          # Biblioteca de conceptos clave de Lengua
│   │       ├── openspec-info/    # Vista interactiva del estado de OpenSpec
│   │       └── games/            # Los 5 juegos interactivos:
│   │           ├── word-fill/
│   │           ├── word-search/
│   │           ├── riddles/
│   │           ├── sentence-builder/
│   │           └── trivia/
│   ├── styles.scss               # Tokens CSS y sistema de diseño pastel
│   └── index.html                # Fuentes Google (Nunito & Quicksand)
└── package.json
```
