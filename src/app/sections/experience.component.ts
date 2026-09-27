import { Component, computed, signal } from '@angular/core';
import { SEMANAS } from '../core/content';

@Component({
  selector: 'lm-experience',
  template: `
    <section id="experience" class="exp">
      <div class="wrap">
        <div class="cabeza">
          <h2>The Lorens Experience</h2>
          <p class="lead">Nuestro programa insignia: 16 semanas en cohorte, con fecha de inicio real, grupo, mentores asignados y un tema tuyo grabado al final.</p>
        </div>

        <div class="partitura" role="group" aria-label="Las 16 semanas del programa, como compases">
          <div class="pentagrama" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
          <div class="compases">
            @for (s of semanas; track s) {
              <button type="button" class="compas"
                [class.prep]="s === 0" [class.m1]="s >= 1 && s <= 6" [class.m2]="s >= 7 && s <= 15" [class.show]="s === 16"
                [class.sel]="faseDe(s) === fase()"
                (click)="fase.set(faseDe(s))"
                [attr.aria-label]="s === 0 ? 'Semana de preparación' : 'Semana ' + s"
                [attr.aria-pressed]="faseDe(s) === fase()">
                <span class="num">{{ s === 0 ? 'Prep.' : s }}</span>
                <span class="nota" [style.--y]="altura(s)"></span>
              </button>
            }
          </div>
          <div class="llaves" aria-hidden="true">
            <span class="llave k1">Fundamentos</span>
            <span class="llave k2">Artista</span>
          </div>
        </div>

        <div class="fase" aria-live="polite">
          <h3>{{ actual().titulo }}</h3>
          <p>{{ actual().texto }}</p>
        </div>

        <div class="pie">
          <dl>
            <div><dt>Nueva cohorte</dt><dd>cada 2 meses, con 30 cupos</dd></div>
            <div><dt>Compromiso</dt><dd>unas 3 horas por semana</dd></div>
            <div><dt>Pago</dt><dd>completo o en cuotas</dd></div>
            <div><dt>Al terminar</dt><dd>pasas a alumni, con descuentos en Live Room y Live Weekend</dd></div>
          </dl>
          <div class="accion">
            <p class="muted">The Experience no se compra en línea. Primero hablamos 30 minutos para confirmar que encaja con tu nivel y tu tiempo.</p>
            <a href="#diagnostico" class="btn btn--caoba">Agendar mi reunión de evaluación</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .exp { padding: clamp(4.5rem, 10vw, 8rem) 0; background: var(--arena); }
    .cabeza { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: end; }
    .cabeza .lead { max-width: 42ch; }

    .partitura { position: relative; margin-top: 3.5rem; overflow-x: auto; padding-bottom: 2.5rem; }
    .pentagrama { position: absolute; left: 0; right: 0; top: 30px; height: 96px; display: flex; flex-direction: column; justify-content: space-between; min-width: 760px; pointer-events: none; }
    .pentagrama i { height: 2px; background: var(--caoba); opacity: .55; }
    .compases { position: relative; display: grid; grid-template-columns: repeat(17, minmax(44px, 1fr)); min-width: 760px; }
    .compas { position: relative; height: 156px; background: transparent; border: 0; border-right: 2px solid rgba(58,20,14,.55); cursor: pointer; padding: 0; }
    .compas::before { content: ""; position: absolute; left: 0; right: 0; top: 30px; height: 96px; opacity: 0; transition: opacity .15s; }
    .compas.m1::before { background: rgba(227,169,63,.28); }
    .compas.m2::before { background: rgba(232,70,42,.18); }
    .compas.prep::before { background: rgba(17,99,107,.15); }
    .compas.show::before { background: var(--caoba); }
    .compas.sel::before, .compas:hover::before { opacity: 1; }
    .compas.show { border-right: 6px double var(--caoba); }
    .num { position: absolute; top: 4px; left: 6px; font-size: var(--t-xs); font-weight: 600; color: var(--tinta-suave); }
    .nota { position: absolute; left: 50%; top: calc(30px + var(--y) * 12px - 7px); width: 17px; height: 13px; border-radius: 50%;
      background: var(--caoba); transform: translateX(-50%) rotate(-20deg); }
    .nota::after { content: ""; position: absolute; right: 0; bottom: 6px; width: 2px; height: 38px; background: var(--caoba); transform: rotate(20deg); transform-origin: bottom; }
    .compas.show .nota { background: var(--laton); } .compas.show .nota::after { background: var(--laton); }
    .compas.sel .nota { background: var(--flamboyan); } .compas.sel .nota::after { background: var(--flamboyan); }
    .llaves { position: relative; display: grid; grid-template-columns: repeat(17, minmax(44px, 1fr)); min-width: 760px; margin-top: .5rem; }
    .llave { font-family: var(--display); font-weight: 800; font-size: 1.2rem; border-top: 3px solid var(--caoba); padding-top: .35rem; text-align: center; }
    .k1 { grid-column: 2 / span 6; } .k2 { grid-column: 8 / span 9; }

    .fase { max-width: 60ch; min-height: 6rem; }
    .fase h3 { font-size: var(--t-xl); text-transform: uppercase; }
    .fase p { margin-top: .5rem; font-size: var(--t-lg); line-height: 1.45; }

    .pie { display: grid; grid-template-columns: 1.3fr 1fr; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 2px solid var(--caoba); align-items: start; }
    dl { margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem 2rem; }
    dt { font-weight: 700; }
    dd { margin: .15rem 0 0; color: var(--tinta-suave); }
    .accion { display: grid; gap: 1rem; justify-items: start; }
    @media (max-width: 860px) { .cabeza, .pie { grid-template-columns: 1fr; } dl { grid-template-columns: 1fr; } }
  `],
})
export class ExperienceComponent {
  semanas = Array.from({ length: 17 }, (_, i) => i);
  fase = signal(1);
  actual = computed(() => SEMANAS[this.fase()]);
  faseDe(s: number) { return SEMANAS.findIndex(f => s >= f.rango[0] && s <= f.rango[1]); }
  /* melodía ascendente: el programa sube hasta el showcase */
  altura(s: number) { const y = [7, 6, 6, 5, 6, 5, 4, 5, 4, 3, 4, 3, 2, 3, 2, 1, 0]; return y[s] / 1; }
}
