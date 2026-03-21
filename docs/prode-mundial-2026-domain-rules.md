# Prode Mundial 2026 --- Reglas Oficiales del Dominio

## 1. Concepto General

**Nombre:** Prode Mundial 2026\
**Objetivo Principal:** Crear una aplicación web para que los usuarios pronostiquen los resultados del Mundial de Fútbol 2026. Escalable a cualquier tipo de torneo. Fomentar la interacción social a través de grupos de amigos.\
**Plataforma:** Aplicación Web (accesible desde cualquier navegador)\
**Público Objetivo:**

- Aficionados al fútbol
- Usuarios interesados en predicciones deportivas
- Grupos sociales que disfrutan competencias y retos

------------------------------------------------------------------------

## 2. Arquitectura Técnica

### Frontend

- TypeScript
- HTML, CSS
- Framework/Librería: Vue.js

### Backend

- TypeScript
- Node.js
- API RESTful para comunicación frontend-backend
- Gestión de sesiones y tokens de autenticación: JWT

### Base de Datos

- MySQL
- Migraciones controladas
- Copias de seguridad periódicas
- Cálculo de ranking dinámico (no tabla física de ranking)

### Despliegue

- Servidor web: Nginx
- Plataforma de hosting: Vercel
- Integración Continua / Despliegue Continuo (CI/CD)

### Infraestructura de Desarrollo

- Docker Compose
- Contenedor 1: Backend (Node + TypeScript)
- Contenedor 2: MySQL

------------------------------------------------------------------------

## 3. Reglas de Predicción

1. Cada usuario puede realizar una predicción por partido.
2. La predicción consiste únicamente en resultado exacto (ej: 2-1).
3. La predicción puede editarse hasta el momento de inicio del partido.
4. Una vez iniciado el partido, la predicción queda bloqueada.
5. Solo se considera el resultado en 90 minutos + tiempo extra. No se consideran penales.

> **📌 Decisión pendiente:** Definir cómo se manejan los empates en fase eliminatoria (resultado tras 90' + extra time sin penales). Revisar más adelante.

------------------------------------------------------------------------

## 4. Fases del Torneo

- Grupos
- Octavos de Final
- Cuartos de Final
- Semifinales
- Final y Tercer/Cuarto Puesto

------------------------------------------------------------------------

## 5. Sistema de Puntuación Oficial

### 5.1 Puntos por Partido

#### Fase de Grupos

- Resultado exacto → 5 puntos
- Acierta ganador + diferencia de goles → 3 puntos
  *(ej: se pronostica 2-1 y el resultado es 3-2)*
- Acierta solo ganador/empate → 1 punto
  *(ej: se pronostica que gane el equipo A y el equipo A gana, sin importar el marcador)*
- Error total → 0 puntos

#### Fase Eliminatoria (desde Octavos)

- Resultado exacto → 7 puntos
- Acierta ganador + diferencia de goles → 4 puntos
- Acierta solo ganador → 1 punto
- Error total → 0 puntos

### 5.2 Actualización de Puntuación

- Automática una vez finalizados los partidos.

### 5.3 Puntos por Predecir del 1º al 4º Puesto

- Campeón → 40 puntos
- Subcampeón → 30 puntos
- Tercero → 20 puntos
- Cuarto → 10 puntos

### 5.4 Puntos por Jugadores Destacados

- Balón de Oro → TBD
- Bota de Oro → TBD
- Guante de Oro → TBD
- Mejor Jugador Joven → TBD
- Fair Play → TBD

------------------------------------------------------------------------

## 6. Ranking

El ranking se calcula dinámicamente.

### Orden de clasificación:

1. Puntos totales
2. Mayor cantidad de resultados exactos
3. Mayor cantidad de aciertos por diferencia
4. Mayor cantidad de aciertos simples

No existe tabla persistente de ranking.

------------------------------------------------------------------------

## 7. Funcionalidades Principales

### 7.1 Registro y Autenticación

- **Registro de Usuario:** Correo electrónico, contraseña, nombre de usuario.
- **Inicio de Sesión:** Correo electrónico/nombre de usuario + contraseña.
- **Recuperación de Contraseña:** Envío de enlace de restablecimiento al correo electrónico.

### 7.2 Lista de Partidos

- Calendario completo del Mundial 2026 (fase de grupos, octavos, cuartos, semifinal, final).
- Información de cada partido: equipos, fecha, hora, sede.
- Listado de partidos por etapas: Grupos, Octavos de Final, Cuartos de Final, Semifinales, Final y Tercer/Cuarto Puesto.

### 7.3 Predicción de Resultados

- **Ingreso de Pronósticos:** Resultado exacto (ej: 2-1).
- **Edición de Pronósticos:** Permitir modificar pronósticos hasta el momento de inicio del partido.

### 7.4 Grupos de Amigos

- **Creación de Grupos:** Nombre del grupo, administrador del grupo (quien lo crea).
- **Unirse a Grupos:** El usuario busca grupos por nombre, envía solicitud de unión. El administrador del grupo acepta o rechaza la solicitud.
- **Gestión de Miembros:** Roles dentro del grupo (administrador, miembro).
- **Ranking Interno del Grupo:** Clasificación de los miembros del grupo según sus puntos.

### 7.5 Perfil de Usuario

- **Información Personal:** Nombre de usuario, correo electrónico, foto/avatar.
- **Historial de Pronósticos:** Ver pronósticos anteriores y resultados.
- **Puntuación Total:** Puntos acumulados a lo largo del torneo.
- **Estadísticas Personales:** Porcentaje de aciertos, mejoras y progresión a lo largo del torneo.
- **Personalización del Perfil:** Foto/avatar, preferencias de notificaciones.

------------------------------------------------------------------------

## 8. Modelo de Dominio

### Usuario

| Campo | Descripción |
|---|---|
| id | Identificador único |
| nombre_usuario | Nombre de usuario |
| email | Correo electrónico |
| password_hash | Hash de contraseña |
| avatar_url | URL de foto/avatar |
| created_at | Fecha de creación |
| updated_at | Fecha de última actualización |

### Fase_Torneo (seed data estático)

| Campo | Descripción |
|---|---|
| id | Identificador único |
| nombre | Nombre de la fase (ej: Grupo A, Octavos, Cuartos, Semifinal, Final, Tercer Puesto) |
| tipo | Tipo de fase: `grupos` o `eliminatoria` |
| orden | Orden de la fase en el torneo |

### Equipo (seed data estático)

| Campo | Descripción |
|---|---|
| id | Identificador único |
| nombre | Nombre del equipo |
| grupo | Grupo asignado (A-L) |

### Partido

| Campo | Descripción |
|---|---|
| id | Identificador único |
| equipo_local | FK → Equipo |
| equipo_visitante | FK → Equipo |
| fase_torneo_id | FK → Fase_Torneo |
| fecha | Fecha del partido |
| hora | Hora del partido |
| sede | Sede del partido |
| resultado_local | Goles equipo local (null hasta que finalice) |
| resultado_visitante | Goles equipo visitante (null hasta que finalice) |
| status | Estado: `programado`, `en_curso`, `finalizado` |
| created_at | Fecha de creación |
| updated_at | Fecha de última actualización |

### Pronostico

| Campo | Descripción |
|---|---|
| id | Identificador único |
| usuario_id | FK → Usuario |
| partido_id | FK → Partido |
| pronostico_local | Goles pronosticados equipo local |
| pronostico_visitante | Goles pronosticados equipo visitante |
| puntos_obtenidos | Puntos calculados (null hasta que se resuelva) |
| locked_at | Timestamp de bloqueo (al iniciar el partido) |
| created_at | Fecha de creación |
| updated_at | Fecha de última actualización |

### Grupo

| Campo | Descripción |
|---|---|
| id | Identificador único |
| nombre_grupo | Nombre del grupo |
| administrador_id | FK → Usuario (creador del grupo) |
| created_at | Fecha de creación |
| updated_at | Fecha de última actualización |

### Miembros_Grupo

| Campo | Descripción |
|---|---|
| id | Identificador único |
| grupo_id | FK → Grupo |
| usuario_id | FK → Usuario |
| rol | Rol: `administrador` o `miembro` |
| created_at | Fecha de creación |

### Solicitudes_Grupo

| Campo | Descripción |
|---|---|
| id | Identificador único |
| grupo_id | FK → Grupo |
| usuario_id | FK → Usuario |
| estado | Estado: `pendiente`, `aceptada`, `rechazada` |
| created_at | Fecha de creación |
| updated_at | Fecha de última actualización |

------------------------------------------------------------------------

## 9. Consideraciones Adicionales

### Diseño Responsivo

- Adaptabilidad a diferentes dispositivos (escritorio, tablet, móvil).

### Notificaciones

- Recordatorios para realizar pronósticos.
- Actualizaciones de resultados y rankings.
- Notificaciones push en navegador.

### Seguridad

- Autenticación y autorización robusta.
- Encriptación de datos sensibles.

### Escalabilidad

- Arquitectura modular y escalable.

### Interfaz de Usuario (UI/UX)

- Intuitiva y fácil de usar.
- Atractiva visualmente, con temática del Mundial.

### Soporte y Mantenimiento

- Actualizaciones periódicas de la aplicación.

------------------------------------------------------------------------

## 10. Fases del Desarrollo

### FASE 1 — MVP (Producto Mínimo Viable)

- Registro y Login
- Visualización de partidos
- Ingreso de pronósticos básicos
- Sistema de puntuación simple
- Ranking global

### FASE 2 — Mejora y Grupos

- Creación y unirse a grupos (con gestión de solicitudes y aceptación)
- Ranking de grupos
- Edición de pronósticos

### FASE 3 — Funcionalidades Avanzadas

- Notificaciones
- Perfil de usuario más completo
- Mejoras de UI/UX

------------------------------------------------------------------------

## 11. Reglas Técnicas de Implementación

### ScoringService (Obligatorio)

El cálculo de puntos debe estar encapsulado en un servicio independiente:

- No hardcodear lógica en controladores.
- Permitir futura expansión del sistema de puntuación.
- Tests unitarios obligatorios para:
  - Resultado exacto en grupos
  - Resultado exacto en eliminatoria
  - Diferencia correcta
  - Solo ganador
  - Error total

------------------------------------------------------------------------

## 12. Principios del Proyecto

- Empezar simple.
- Diseñar para escalar.
- TypeScript en frontend y backend.
- Docker obligatorio desde el inicio.
- Tests para lógica de dominio.
- Seguridad y validación siempre en backend.

------------------------------------------------------------------------

## 13. Decisiones Pendientes

| # | Tema | Detalle |
|---|---|---|
| 1 | Penales en eliminatoria | Solo se registra resultado en 90' + extra time. Definir si el usuario puede pronosticar empate en eliminatoria y cómo se puntúa. Revisar más adelante. |
| 2 | Puntos por jugadores destacados | Definir valores de puntos para Balón de Oro, Bota de Oro, Guante de Oro, Mejor Jugador Joven y Fair Play. |

------------------------------------------------------------------------

Documento base de dominio — versión actualizada.
