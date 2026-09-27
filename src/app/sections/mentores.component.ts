import { Component } from '@angular/core';
import { SELECCION_MENTORES } from '../core/content';

@Component({
  selector: 'lm-mentores',
  template: `
    <section id="mentores" class="mentores oscuro">
      <div class="wrap">
        <div class="cabeza">
          <h2>Tus mentores ejercen. Y pasaron por siete filtros.</h2>
          <p class="lead">Músicos, cantantes y productores activos. Antes de darte clase, cada uno supera este proceso.</p>
        </div>
        <ol class="etapas">
          @for (e of etapas; track e.etapa) {
            <li><h3>{{ e.etapa }}</h3><p>{{ e.texto }}</p></li>
          }
        </ol>
        <p class="ensena">¿Eres músico y quieres enseñar? <a href="#">Postúlate en Enseña en Lorens</a></p>
      </div>
    </section>
  `,
  styles: [`
    .mentores { background: var(--caoba); color: var(--marfil); padding: clamp(4.5rem, 10vw, 8rem) 0; }
    .cabeza { display: grid; grid-template-columns: 1.3fr 1fr; gap: 2rem; align-items: end; margin-bottom: 3.5rem; }
    h2 { max-width: 16ch; }
    .lead { color: rgba(255,253,250,.82); }
    .etapas { list-style: none; margin: 0; padding: 0; counter-reset: e; display: grid; grid-template-columns: repeat(7, 1fr); }
    .etapas li { counter-increment: e; position: relative; padding: 3.25rem 1rem 0 0; }
    .etapas li::before { content: counter(e); position: absolute; top: 0; left: 0; width: 2.25rem; height: 2.25rem; border-radius: 50%;
      display: grid; place-items: center; background: var(--laton); color: var(--caoba); font-weight: 700; font-size: var(--t-sm); z-index: 1; }
    .etapas li::after { content: ""; position: absolute; top: 1.1rem; left: 2.25rem; right: 0; height: 2px; background: rgba(227,169,63,.4); }
    .etapas li:last-child::after { display: none; }
    .etapas li:last-child::before { background: var(--flamboyan); color: var(--marfil); }
    .etapas h3 { font-size: 1.25rem; margin-bottom: .4rem; }
    .etapas p { font-size: var(--t-sm); color: rgba(255,253,250,.75); }
    .ensena { margin-top: 3.5rem; font-size: var(--t-md); }
    .ensena a { color: var(--laton); font-weight: 600; }
    @media (max-width: 1000px) {
      .cabeza { grid-template-columns: 1fr; }
      .etapas { grid-template-columns: 1fr; gap: 0; }
      .etapas li { padding: 0 0 1.75rem 3.5rem; }
      .etapas li::after { top: 2.25rem; bottom: 0; left: 1.07rem; right: auto; width: 2px; height: auto; }
    }
  `],
})
export class MentoresComponent { etapas = SELECCION_MENTORES; }
