import { Component, signal } from '@angular/core';

/* Diferenciador número uno del plan: todo queda grabado y es del alumno. */
@Component({
  selector: 'lm-grabado',
  template: `
    <section class="grabado oscuro">
      <div class="wrap grid">
        <div class="texto">
          <h2>Todo lo que aprendes queda grabado. Y es tuyo.</h2>
          <p class="lead">Cada sesión 1:1 llega a tu biblioteca privada en menos de 2 horas, con los marcadores y notas de tu mentor. Las clases generales y los talleres quedan en la biblioteca común en 24 horas.</p>

          <ul class="otros">
            <li><h3>Géneros que se tocan aquí</h3><p>Bachata, merengue, salsa, urbano y música cristiana, con la profundidad que las plataformas en inglés no tienen.</p></li>
            <li><h3>Ruta de artista, no solo de instrumento</h3><p>Producción, composición, marca personal, derechos y distribución para quien quiere publicar.</p></li>
            <li><h3>Precio en pesos y en dólares</h3><p>Pagas en RD$ desde República Dominicana o en USD desde cualquier país.</p></li>
          </ul>
        </div>

        <figure class="sesion" aria-label="Ejemplo de una sesión 1:1 guardada en la biblioteca">
          <div class="sesion__cab">
            <div>
              <p class="sesion__titulo">Sesión 1:1 de guitarra</p>
              <p class="sesion__meta">45 min, con tu mentora de requinto</p>
            </div>
            <span class="privada">Solo tú</span>
          </div>

          <div class="onda" aria-hidden="true">
            @for (b of barras; track $index) { <i [style.height.%]="b"></i> }
            @for (m of marcas; track m.t) {
              <button type="button" class="pin" [style.left.%]="m.pos" [class.sel]="sel() === $index"
                      (click)="sel.set($index)" [attr.aria-label]="'Ir a ' + m.t"></button>
            }
          </div>

          <ol class="notas">
            @for (m of marcas; track m.t; let i = $index) {
              <li [class.sel]="sel() === i">
                <button type="button" (click)="sel.set(i)">
                  <time>{{ m.t }}</time>
                  <span>{{ m.nota }}</span>
                </button>
              </li>
            }
          </ol>
          <figcaption class="tarea"><strong>Tarea para la próxima sesión:</strong> el requinto de la intro a 80 bpm, limpio, tres veces seguidas.</figcaption>
        </figure>
      </div>
    </section>
  `,
  styles: [`
    .grabado { background: var(--caoba); color: var(--marfil); padding: clamp(4.5rem, 10vw, 8rem) 0; }
    .grid { display: grid; grid-template-columns: 1.05fr 1fr; gap: clamp(2.5rem, 6vw, 5rem); align-items: start; }
    h2 { color: var(--marfil); max-width: 13ch; }
    .lead { margin-top: 1.5rem; color: rgba(255,253,250,.85); }
    .otros { list-style: none; margin: 3rem 0 0; padding: 0; display: grid; gap: 1.6rem; }
    .otros li { padding-left: 1.25rem; border-left: 3px solid var(--laton); }
    .otros h3 { color: var(--laton); margin-bottom: .35rem; }
    .otros p { color: rgba(255,253,250,.78); max-width: 48ch; }

    .sesion { margin: 0; background: var(--marfil); color: var(--tinta); border-radius: var(--radius-l); padding: 1.5rem;
      box-shadow: 0 30px 60px -30px rgba(0,0,0,.7); position: sticky; top: 96px; }
    .sesion__cab { display: flex; justify-content: space-between; gap: 1rem; align-items: start; }
    .sesion__titulo { font-weight: 700; }
    .sesion__meta { font-size: var(--t-sm); color: var(--tinta-suave); }
    .privada { font-size: var(--t-xs); font-weight: 600; background: var(--arena); padding: .3rem .7rem; border-radius: 999px; white-space: nowrap; }
    .onda { position: relative; display: flex; align-items: center; gap: 2px; height: 72px; margin: 1.5rem 0 1rem; }
    .onda i { flex: 1; background: var(--caoba); opacity: .8; border-radius: 1px; min-height: 3px; }
    .pin { position: absolute; top: -8px; bottom: -8px; width: 3px; transform: translateX(-50%); background: var(--flamboyan); border: 0; padding: 0; cursor: pointer; }
    .pin::after { content: ""; position: absolute; top: -4px; left: 50%; width: 12px; height: 12px; border-radius: 50%; background: var(--flamboyan); transform: translateX(-50%); }
    .pin.sel { width: 4px; background: var(--mar); } .pin.sel::after { background: var(--mar); }
    .notas { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
    .notas button { width: 100%; display: grid; grid-template-columns: 3.5rem 1fr; gap: .75rem; text-align: left; background: none; border: 0;
      padding: .65rem .75rem; border-radius: var(--radius-s); cursor: pointer; font-size: var(--t-sm); }
    .notas button:hover { background: var(--arena); }
    .notas li.sel button { background: #DCEBEC; }
    time { font-variant-numeric: tabular-nums; font-weight: 700; color: var(--mar); }
    .tarea { margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--linea); font-size: var(--t-sm); }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } .sesion { position: static; } }
  `],
})
export class GrabadoComponent {
  sel = signal(1);
  barras = Array.from({ length: 64 }, (_, i) => 18 + Math.abs(Math.sin(i * .7) * 55 + Math.cos(i * 1.9) * 25));
  marcas = [
    { t: '04:10', pos: 9, nota: 'Postura de la mano derecha: apoya menos el pulgar.' },
    { t: '17:32', pos: 39, nota: 'El requinto entra en el tiempo 4, no en el 1.' },
    { t: '29:05', pos: 65, nota: 'Buen ataque en la segunda vuelta. Así se oye limpio.' },
    { t: '41:48', pos: 93, nota: 'Repasamos el cambio de Re a La menor.' },
  ];
}
