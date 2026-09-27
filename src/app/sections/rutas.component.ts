import { Component, signal } from '@angular/core';
import { RUTAS } from '../core/content';

@Component({
  selector: 'lm-rutas',
  template: `
    <section id="rutas" class="rutas">
      <div class="wrap">
        <div class="cabeza">
          <h2>Elige tu ruta</h2>
          <p class="muted">Cinco rutas con niveles en orden. Cada lección trae video, partitura o tablatura en PDF, una pista para practicar y un ejercicio. Puedes cambiar de ruta sin perder tu progreso.</p>
        </div>

        <ol class="lista">
          @for (r of rutas; track r.nombre; let i = $index) {
            <li [class.abierta]="abierta() === i">
              <button type="button" class="fila" (click)="abierta.set(abierta() === i ? -1 : i)" [attr.aria-expanded]="abierta() === i">
                <span class="nombre">{{ r.nombre }}</span>
                <span class="niveles" [attr.aria-label]="r.niveles + ' niveles'">
                  @for (n of niveles(r.niveles); track n) { <i></i> }
                  <em>{{ r.niveles }} niveles</em>
                </span>
                <span class="signo" aria-hidden="true"></span>
              </button>
              @if (abierta() === i) {
                <div class="detalle">
                  <p><strong>{{ r.enfoque }}</strong></p>
                  <p class="muted">{{ r.detalle }}</p>
                  <a href="#diagnostico" class="enlace">Ver en qué nivel empiezo</a>
                </div>
              }
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: [`
    .rutas { padding: clamp(4.5rem, 10vw, 8rem) 0; }
    .cabeza { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: end; margin-bottom: 3rem; }
    .cabeza p { max-width: 52ch; }
    .lista { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--caoba); }
    li { border-bottom: 1px solid var(--linea); }
    .fila { width: 100%; display: grid; grid-template-columns: 1fr auto 40px; align-items: center; gap: 1.5rem;
      padding: 1.4rem 0; background: none; border: 0; text-align: left; cursor: pointer; }
    .nombre { font-family: var(--display); font-weight: 800; font-size: clamp(2rem, 1.2rem + 3vw, 3.5rem); line-height: 1; text-transform: uppercase; transition: color .15s; }
    .fila:hover .nombre { color: var(--flamboyan); }
    .niveles { display: flex; align-items: center; gap: 5px; }
    .niveles i { width: 10px; height: 28px; background: var(--caoba); border-radius: 2px; }
    .niveles i:nth-child(2) { height: 34px; } .niveles i:nth-child(3) { height: 40px; } .niveles i:nth-child(4) { height: 46px; }
    .niveles em { font-style: normal; font-size: var(--t-sm); color: var(--tinta-suave); margin-left: .6rem; min-width: 5.5em; }
    .signo { position: relative; width: 22px; height: 22px; justify-self: end; }
    .signo::before, .signo::after { content: ""; position: absolute; inset: 10px 0 auto; height: 2px; background: currentColor; transition: transform .2s; }
    .signo::after { transform: rotate(90deg); }
    .abierta .signo::after { transform: rotate(0); }
    .detalle { display: grid; gap: .5rem; padding: 0 0 1.75rem; max-width: 60ch; }
    .enlace { color: var(--mar); font-weight: 600; margin-top: .25rem; }
    @media (max-width: 760px) {
      .cabeza { grid-template-columns: 1fr; }
      .fila { grid-template-columns: 1fr 28px; }
      .niveles { grid-column: 1; grid-row: 2; }
      .niveles i { height: 14px !important; width: 8px; }
      .signo { grid-column: 2; grid-row: 1; }
    }
  `],
})
export class RutasComponent {
  rutas = RUTAS;
  abierta = signal(0);
  niveles(n: number) { return Array.from({ length: n }, (_, i) => i); }
}
