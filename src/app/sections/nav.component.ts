import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'lm-nav',
  template: `
    <header class="nav" [class.nav--solida]="solida()">
      <div class="wrap nav__in">
        <a href="#inicio" class="marca" aria-label="Lorens Music Academy, inicio">
          <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
            <rect x="1" y="3" width="7" height="22" rx="1.5" fill="currentColor"/>
            <rect x="10" y="3" width="7" height="22" rx="1.5" fill="currentColor"/>
            <rect x="19" y="3" width="7" height="22" rx="1.5" fill="currentColor"/>
            <rect x="6" y="3" width="5" height="13" rx="1" fill="#E3A93F"/>
            <rect x="15" y="3" width="5" height="13" rx="1" fill="#E3A93F"/>
          </svg>
          <span>Lorens<small>Music Academy</small></span>
        </a>

        <button class="nav__toggle" type="button" (click)="abierto.set(!abierto())"
                [attr.aria-expanded]="abierto()" aria-controls="menu">
          <span class="sr-only">Menú</span>
          <span class="barras" [class.x]="abierto()"></span>
        </button>

        <nav id="menu" class="nav__menu" [class.abierto]="abierto()" aria-label="Principal">
          <a href="#rutas" (click)="abierto.set(false)">Rutas</a>
          <a href="#experience" (click)="abierto.set(false)">The Lorens Experience</a>
          <a href="#planes" (click)="abierto.set(false)">Planes</a>
          <a href="#mentores" (click)="abierto.set(false)">Mentores</a>
          <a href="#preguntas" (click)="abierto.set(false)">Preguntas</a>
          <a href="#" class="nav__login">Entrar</a>
          <a href="#diagnostico" class="btn btn--laton nav__cta" (click)="abierto.set(false)">Diagnóstico gratis</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .nav { position: fixed; inset: 0 0 auto; z-index: 50; color: var(--marfil);
      padding-top: env(safe-area-inset-top, 0px); transition: background-color .2s ease; }
    .nav--solida { background: rgba(58, 20, 14, .96); backdrop-filter: blur(8px); }
    .nav__in { display: flex; align-items: center; justify-content: space-between; min-height: 72px; gap: 1rem; }
    .marca { display: flex; align-items: center; gap: .6rem; text-decoration: none; color: var(--marfil); }
    .marca span { font-family: var(--display); font-weight: 900; font-size: 1.6rem; line-height: .8; display: flex; flex-direction: column; }
    .marca small { font-family: var(--body); font-weight: 500; font-size: .7rem; letter-spacing: .02em; opacity: .75; margin-top: .25rem; }
    .nav__menu { display: flex; align-items: center; gap: 1.5rem; }
    .nav__menu a:not(.btn) { text-decoration: none; font-size: var(--t-sm); font-weight: 500; opacity: .88; }
    .nav__menu a:not(.btn):hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; }
    .nav__cta { min-height: 42px; padding: .5rem 1.1rem; font-size: var(--t-sm); }
    .nav__toggle { display: none; background: none; border: 0; width: 44px; height: 44px; cursor: pointer; }
    .barras, .barras::before, .barras::after { display: block; width: 24px; height: 2px; background: currentColor; position: relative; transition: transform .2s; margin: auto; }
    .barras::before, .barras::after { content: ""; position: absolute; left: 0; }
    .barras::before { top: -7px; } .barras::after { top: 7px; }
    .barras.x { background: transparent; }
    .barras.x::before { transform: translateY(7px) rotate(45deg); }
    .barras.x::after { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 960px) {
      .nav__toggle { display: block; }
      .nav__menu { position: fixed; inset: calc(72px + env(safe-area-inset-top, 0px)) 0 auto; flex-direction: column; align-items: stretch;
        gap: 0; padding: 1rem var(--gutter) 1.5rem; background: var(--caoba); display: none; }
      .nav__menu.abierto { display: flex; }
      .nav__menu a:not(.btn) { padding: .9rem 0; border-bottom: 1px solid rgba(255,255,255,.1); font-size: var(--t-md); }
      .nav__cta { margin-top: 1rem; }
    }
  `],
})
export class NavComponent {
  solida = signal(false);
  abierto = signal(false);
  @HostListener('window:scroll')
  onScroll() { this.solida.set(window.scrollY > 40); }
}
