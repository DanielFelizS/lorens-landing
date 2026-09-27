# Lorens Music Academy · Landing page (Angular 19)

Landing pública de Lorens Music Academy, construida a partir del *Plan integral de negocio y producto* y de la ingeniería inversa de la home de The Abacus Experience (estructura de secciones y embudo: diagnóstico gratis, reunión de evaluación y planes).

## Arrancar

```bash
npm install
npm start          # http://localhost:4200
npm run build      # salida en dist/lorens-landing/browser
```

Requiere Node 18.19+ o 20+.

## Estructura

```
src/
  index.html                 fuentes (Big Shoulders Display + Instrument Sans) y metadatos
  styles.scss                tokens de diseño: color, tipografía, botones, foco
  app/
    app.component.ts         orden de las secciones
    core/
      content.ts             TODO el contenido editable: géneros, rutas, planes, precios, FAQ
      piano.service.ts       sintetizador Web Audio del teclado (sin archivos de audio)
    sections/
      nav.component.ts
      hero.component.ts/.scss  teclado tocable con géneros (ratón, táctil y teclas A–Ñ)
      rutas.component.ts       5 rutas desplegables con sus niveles
      grabado.component.ts     "todo queda grabado" + diferenciadores
      diagnostico.component.ts pasos + diagnóstico de 4 preguntas con la matriz de recomendación
      experience.component.ts  las 16 semanas del programa como compases de un pentagrama
      planes.component.ts      Gratis / Grabado / Pro / Artista, RD$ o USD, mensual o por adelantado
      mentores.component.ts    las 7 etapas de selección de mentores
      cierre.component.ts      cohorte fundadora, preguntas frecuentes, CTA final y pie
```

## Sistema visual

| Token | Hex | Uso |
|---|---|---|
| Caoba | `#3A140E` | secciones oscuras y texto fuerte (árbol nacional de RD, madera de piano) |
| Latón | `#E3A93F` | resaltes y botón principal sobre caoba |
| Flamboyán | `#E8462A` | tecla pulsada, marcadores |
| Marfil | `#FFFDFA` | fondo, teclas blancas |
| Arena | `#F1E9E0` | superficies secundarias |
| Mar | `#11636B` | enlaces e información |

## Pendiente de conectar

- Los botones "Crear mi cuenta", "Empezar 7 días gratis", "Entrar" y el agendador apuntan a `#`: enlázalos a la app, al checkout y al calendario propio.
- La lista de espera valida el correo pero no lo envía a ningún backend.
- El enlace de WhatsApp (`https://wa.me/`) necesita el número de la academia.
- `angular.json` desactiva el *inlining* de Google Fonts en el build (`optimization.fonts: false`); puedes reactivarlo si tu entorno de CI tiene acceso a internet.
