import { Component } from '@angular/core';
import { NavComponent } from './sections/nav.component';
import { HeroComponent } from './sections/hero.component';
import { RutasComponent } from './sections/rutas.component';
import { GrabadoComponent } from './sections/grabado.component';
import { ExperienceComponent } from './sections/experience.component';
import { DiagnosticoComponent } from './sections/diagnostico.component';
import { PlanesComponent } from './sections/planes.component';
import { MentoresComponent } from './sections/mentores.component';
import { CierreComponent } from './sections/cierre.component';

@Component({
  selector: 'app-root',
  imports: [NavComponent, HeroComponent, RutasComponent, GrabadoComponent, ExperienceComponent,
            DiagnosticoComponent, PlanesComponent, MentoresComponent, CierreComponent],
  template: `
    <a class="saltar" href="#contenido">Saltar al contenido</a>
    <lm-nav />
    <main id="contenido">
      <lm-hero />
      <lm-rutas />
      <lm-grabado />
      <lm-diagnostico />
      <lm-experience />
      <lm-planes />
      <lm-mentores />
      <lm-cierre />
    </main>
  `,
  styles: [`
    .saltar { position: absolute; left: 1rem; top: -100px; z-index: 100; background: var(--laton); color: var(--caoba); padding: .6rem 1rem; border-radius: 6px; font-weight: 600; }
    .saltar:focus { top: 1rem; }
  `],
})
export class AppComponent {}
