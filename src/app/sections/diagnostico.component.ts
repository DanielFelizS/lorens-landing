import { Component, computed, signal } from '@angular/core';

interface Pregunta { id: 'instrumento' | 'nivel' | 'meta' | 'tiempo'; texto: string; opciones: { v: string; t: string }[]; }

interface Resultado { plan: string; porque: string; nivel: string; principal: string; secundaria: string; }

@Component({
  selector: 'lm-diagnostico',
  template: `
    <section id="diagnostico" class="diag">
      <div class="wrap grid">
        <div class="lado">
          <h2>Cómo empiezas</h2>
          <ol class="pasos">
            <li><h3>Diagnóstico de 2 minutos</h3><p>Instrumento, nivel, meta y tiempo. Si quieres, grabas 20 segundos tocando o cantando.</p></li>
            <li><h3>Reunión de evaluación gratuita</h3><p>30 minutos por video con un asesor académico: tocas algo corto, hablamos de tus metas y te recomendamos un plan, aunque sea el más barato.</p></li>
            <li><h3>Tu primera lección, el mismo día</h3><p>Si eliges una suscripción, el acceso se activa al pagar. Si eliges The Experience, reservas tu cupo en la próxima cohorte.</p></li>
          </ol>
        </div>

        <div class="tarjeta" aria-live="polite">
          @if (!resultado()) {
            <div class="progreso" aria-hidden="true">
              @for (p of preguntas; track p.id; let i = $index) { <i [class.hecho]="i < paso()" [class.ahora]="i === paso()"></i> }
            </div>
            <p class="contador">Pregunta {{ paso() + 1 }} de {{ preguntas.length }}</p>
            <fieldset>
              <legend>{{ pregunta().texto }}</legend>
              <div class="opciones">
                @for (o of pregunta().opciones; track o.v) {
                  <button type="button" class="opcion" [class.sel]="respuestas()[pregunta().id] === o.v" (click)="responder(o.v)">{{ o.t }}</button>
                }
              </div>
            </fieldset>
            @if (paso() > 0) {
              <button type="button" class="atras" (click)="paso.set(paso() - 1)">Volver a la pregunta anterior</button>
            }
          } @else {
            @if (resultado(); as r) {
              <p class="contador">Tu resultado</p>
              <p class="nivel">{{ r.nivel }}</p>
              <h3 class="plan">Te recomendamos {{ r.plan }}</h3>
              <p>{{ r.porque }}</p>
              <div class="acciones">
                <a href="#" class="btn btn--caoba">{{ r.principal }}</a>
                <a href="#planes" class="btn btn--linea">{{ r.secundaria }}</a>
              </div>
              <p class="nota muted">Al crear tu cuenta gratis guardamos este resultado y te abrimos el curso "Tus primeras 3 canciones".</p>
              <button type="button" class="atras" (click)="reiniciar()">Hacer el diagnóstico otra vez</button>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .diag { padding: clamp(4.5rem, 10vw, 8rem) 0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2.5rem, 6vw, 5rem); align-items: start; }
    .pasos { list-style: none; margin: 2.5rem 0 0; padding: 0; counter-reset: p; display: grid; gap: 2rem; }
    .pasos li { counter-increment: p; display: grid; grid-template-columns: 3.25rem 1fr; column-gap: 1rem; }
    .pasos li::before { content: counter(p); grid-row: span 2; font-family: var(--display); font-weight: 900; font-size: 3rem; line-height: .85; color: var(--flamboyan); }
    .pasos p { color: var(--tinta-suave); margin-top: .35rem; max-width: 46ch; }

    .tarjeta { background: var(--marfil); border: 2px solid var(--caoba); border-radius: var(--radius-l); padding: clamp(1.5rem, 4vw, 2.5rem);
      box-shadow: 10px 10px 0 var(--laton); min-height: 420px; display: flex; flex-direction: column; }
    .progreso { display: flex; gap: 6px; margin-bottom: 1.25rem; }
    .progreso i { flex: 1; height: 6px; border-radius: 3px; background: var(--arena); }
    .progreso i.hecho { background: var(--caoba); } .progreso i.ahora { background: var(--flamboyan); }
    .contador { font-size: var(--t-sm); color: var(--tinta-suave); font-weight: 600; }
    fieldset { border: 0; margin: .5rem 0 0; padding: 0; }
    legend { font-family: var(--display); font-weight: 800; font-size: var(--t-xl); line-height: 1.05; margin-bottom: 1.5rem; padding: 0; }
    .opciones { display: grid; gap: .6rem; }
    .opcion { text-align: left; padding: 1rem 1.15rem; border-radius: var(--radius-s); border: 1.5px solid var(--linea); background: #fff; cursor: pointer; font-weight: 500; }
    .opcion:hover { border-color: var(--caoba); }
    .opcion.sel { background: var(--caoba); color: var(--marfil); border-color: var(--caoba); }
    .atras { margin-top: auto; padding-top: 1.25rem; align-self: flex-start; background: none; border: 0; color: var(--mar); font-weight: 600; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
    .nivel { margin-top: 1rem; font-weight: 600; color: var(--mar); }
    .plan { font-size: var(--t-2xl); text-transform: uppercase; line-height: .92; margin: .35rem 0 1rem; }
    .acciones { display: flex; flex-wrap: wrap; gap: .6rem; margin-top: 1.5rem; }
    .nota { font-size: var(--t-sm); margin-top: 1rem; }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
  `],
})
export class DiagnosticoComponent {
  preguntas: Pregunta[] = [
    { id: 'instrumento', texto: '¿Qué quieres aprender?', opciones: [
      { v: 'piano', t: 'Piano o teclado' }, { v: 'guitarra', t: 'Guitarra' }, { v: 'canto', t: 'Canto' }, { v: 'produccion', t: 'Producción musical' } ] },
    { id: 'nivel', texto: '¿Cómo describes tu nivel hoy?', opciones: [
      { v: '0', t: 'Nunca he tocado ni cantado en serio' }, { v: '1', t: 'Sé lo básico y toco algunas canciones' }, { v: '2', t: 'Tengo base y quiero pulir mi técnica' } ] },
    { id: 'meta', texto: '¿Qué quieres lograr en 6 meses?', opciones: [
      { v: 'canciones', t: 'Tocar las canciones que me gustan' }, { v: 'correcciones', t: 'Mejorar con alguien que me corrija' }, { v: 'artista', t: 'Crear y lanzar mi propia música' } ] },
    { id: 'tiempo', texto: '¿Cuánto tiempo puedes practicar por semana?', opciones: [
      { v: '0', t: 'Menos de 1 hora' }, { v: '1', t: 'Entre 1 y 3 horas' }, { v: '2', t: '3 horas o más' } ] },
  ];

  paso = signal(0);
  respuestas = signal<Record<string, string>>({});
  terminado = signal(false);
  pregunta = computed(() => this.preguntas[this.paso()]);

  responder(v: string) {
    const id = this.pregunta().id;
    this.respuestas.update(r => ({ ...r, [id]: v }));
    if (this.paso() < this.preguntas.length - 1) setTimeout(() => this.paso.set(this.paso() + 1), 160);
    else setTimeout(() => this.terminado.set(true), 160);
  }

  reiniciar() { this.respuestas.set({}); this.paso.set(0); this.terminado.set(false); }

  /* Matriz de recomendación del plan: honesta, aunque signifique un plan más barato. */
  resultado = computed<Resultado | null>(() => {
    if (!this.terminado()) return null;
    const r = this.respuestas();
    const nivel = ['Nivel estimado: 1, desde cero', 'Nivel estimado: 1 a 2', 'Nivel estimado: 2 a 3'][+r['nivel']];
    if (r['tiempo'] === '0') return {
      nivel, plan: 'empezar gratis',
      porque: 'Con menos de una hora a la semana, lo mejor es arrancar con el curso gratuito y crear el hábito. Cuando tengas más tiempo, te ayudamos a elegir plan.',
      principal: 'Crear mi cuenta gratis', secundaria: 'Ver los planes de todos modos' };
    if (r['meta'] === 'artista' && r['tiempo'] === '2') return {
      nivel, plan: 'The Lorens Experience',
      porque: 'Quieres publicar tu música y puedes sostener 3 horas semanales durante 16 semanas. En la reunión confirmamos tu cohorte y tu mentor.',
      principal: 'Agendar mi reunión gratuita', secundaria: 'Comparar con las suscripciones' };
    if (r['meta'] === 'correcciones' || r['nivel'] === '2') return {
      nivel, plan: 'Pro',
      porque: 'Ya tienes base y lo que te hará avanzar es que un mentor vea tu práctica: talleres en grupos de máximo 8 y una corrección de video al mes.',
      principal: 'Agendar mi reunión gratuita', secundaria: 'Ver el plan Pro' };
    return {
      nivel, plan: 'Grabado',
      porque: 'Tienes tiempo y ganas de aprender a tu ritmo. Todas las rutas, la clase general en vivo de cada semana y las herramientas de práctica, desde USD 14 al mes.',
      principal: 'Empezar mis 7 días gratis', secundaria: 'Ver todos los planes' };
  });
}
