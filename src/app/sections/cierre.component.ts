import { Component, signal } from '@angular/core';
import { FAQ } from '../core/content';

@Component({
  selector: 'lm-cierre',
  template: `
    <section class="fundadora">
      <div class="wrap grid">
        <div>
          <h2>Cohorte fundadora</h2>
          <p class="lead">Abrimos con una masterclass gratuita en vivo con un artista invitado. Los primeros 20 alumnos entran con 40% de descuento a cambio de contarnos su experiencia en video.</p>
        </div>
        <div class="lista-espera">
          <label for="correo">Tu correo para la lista de espera</label>
          @if (!enviado()) {
            <div class="campo">
              <input id="correo" type="email" autocomplete="email" placeholder="nombre@correo.com" [value]="correo()" (input)="correo.set($any($event.target).value)"
                     [attr.aria-invalid]="error() ? true : null" aria-describedby="correo-ayuda">
              <button type="button" class="btn btn--caoba" (click)="unirse()">Unirme a la lista</button>
            </div>
            <p id="correo-ayuda" class="ayuda" [class.error]="error()">{{ error() || 'Te avisamos de la masterclass y de cuándo abre la primera cohorte.' }}</p>
          } @else {
            <p class="ok">Listo. Te escribimos a {{ correo() }} cuando anunciemos la fecha.</p>
          }
        </div>
      </div>
    </section>

    <section id="preguntas" class="faq">
      <div class="wrap grid">
        <h2>Preguntas frecuentes</h2>
        <div class="items">
          @for (f of faq; track f.q; let i = $index) {
            <details [open]="i === 0">
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>

    <section class="final oscuro">
      <div class="wrap">
        <p class="grande">Tu próxima canción empieza con un diagnóstico de 2 minutos.</p>
        <div class="acciones">
          <a href="#diagnostico" class="btn btn--laton">Hacer mi diagnóstico gratis</a>
          <a href="https://wa.me/" class="btn btn--linea">Escribir por WhatsApp</a>
        </div>
      </div>
      <footer class="wrap pie">
        <p><strong>Lorens Music Academy</strong>. Santo Domingo, República Dominicana.</p>
        <nav aria-label="Pie de página">
          <a href="#rutas">Rutas</a><a href="#planes">Planes</a><a href="#">Eventos</a><a href="#">Blog</a><a href="#">Enseña en Lorens</a><a href="#">Privacidad</a><a href="#">Términos</a>
        </nav>
      </footer>
    </section>
  `,
  styles: [`
    .fundadora { padding: clamp(4rem, 8vw, 6rem) 0; background: var(--laton); }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: end; }
    .fundadora .lead { margin-top: 1rem; max-width: 42ch; }
    label { font-weight: 700; display: block; margin-bottom: .6rem; }
    .campo { display: flex; gap: .5rem; flex-wrap: wrap; }
    input { flex: 1 1 220px; min-height: 48px; padding: .7rem 1.1rem; border-radius: 999px; border: 2px solid var(--caoba); background: var(--marfil); font: inherit; }
    input[aria-invalid="true"] { border-color: #8f2211; }
    .ayuda { font-size: var(--t-sm); margin-top: .6rem; }
    .ayuda.error { color: #7a1a0c; font-weight: 600; }
    .ok { font-weight: 600; font-size: var(--t-lg); }

    .faq { padding: clamp(4.5rem, 10vw, 8rem) 0; }
    .faq .grid { align-items: start; grid-template-columns: .8fr 1.2fr; }
    details { border-bottom: 1px solid var(--linea); }
    details:first-child { border-top: 2px solid var(--caoba); }
    summary { cursor: pointer; list-style: none; padding: 1.2rem 2.5rem 1.2rem 0; font-weight: 600; font-size: var(--t-lg); position: relative; }
    summary::-webkit-details-marker { display: none; }
    summary::after { content: "+"; position: absolute; right: .25rem; top: 50%; transform: translateY(-50%); font-size: 1.6rem; font-weight: 400; color: var(--flamboyan); }
    details[open] summary::after { content: "−"; }
    details p { padding: 0 0 1.4rem; color: var(--tinta-suave); max-width: 62ch; }

    .final { background: var(--caoba); color: var(--marfil); padding-top: clamp(4.5rem, 10vw, 8rem); }
    .grande { font-family: var(--display); font-weight: 900; text-transform: uppercase; font-size: var(--t-2xl); line-height: .92; max-width: 18ch; }
    .acciones { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
    .pie { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; margin-top: clamp(4rem, 8vw, 6rem); padding-top: 1.5rem; padding-bottom: 2rem;
      border-top: 1px solid rgba(255,255,255,.15); font-size: var(--t-sm); color: rgba(255,253,250,.7); }
    .pie nav { display: flex; flex-wrap: wrap; gap: 1.25rem; }
    .pie a { text-decoration: none; } .pie a:hover { text-decoration: underline; }
    @media (max-width: 860px) { .grid, .faq .grid { grid-template-columns: 1fr; } }
  `],
})
export class CierreComponent {
  faq = FAQ;
  correo = signal('');
  error = signal('');
  enviado = signal(false);
  unirse() {
    const v = this.correo().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { this.error.set('Escribe un correo válido, por ejemplo nombre@correo.com.'); return; }
    this.error.set(''); this.enviado.set(true);
  }
}
