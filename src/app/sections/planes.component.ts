import { Component, signal } from '@angular/core';
import { Ciclo, Moneda, PLANES, Plan, SUELTAS } from '../core/content';

@Component({
  selector: 'lm-planes',
  template: `
    <section id="planes" class="planes">
      <div class="wrap">
        <div class="cabeza">
          <h2>Planes y precios</h2>
          <div class="controles">
            <div class="seg" role="radiogroup" aria-label="Moneda">
              @for (m of monedas; track m) {
                <button type="button" role="radio" [attr.aria-checked]="moneda() === m" [class.on]="moneda() === m" (click)="moneda.set(m)">{{ m === 'DOP' ? 'RD$' : 'USD' }}</button>
              }
            </div>
            <div class="seg" role="radiogroup" aria-label="Frecuencia de pago">
              <button type="button" role="radio" [attr.aria-checked]="ciclo() === 'mensual'" [class.on]="ciclo() === 'mensual'" (click)="ciclo.set('mensual')">Mensual</button>
              <button type="button" role="radio" [attr.aria-checked]="ciclo() === 'anual'" [class.on]="ciclo() === 'anual'" (click)="ciclo.set('anual')">Por adelantado</button>
            </div>
          </div>
        </div>

        <div class="tabla">
          @for (p of planes; track p.id) {
            <article class="plan" [class.destacado]="p.destacado">
              <header>
                <h3>{{ p.nombre }}</h3>
                <p class="para">{{ p.para }}</p>
              </header>
              <p class="precio">
                <span class="cifra">{{ formato(p) }}</span>
                <span class="ciclo">{{ p.precio.USD.mensual === 0 ? p.notaCiclo.mensual : p.notaCiclo[ciclo()] }}</span>
              </p>
              @if (ahorro(p); as a) { <p class="ahorro">Ahorras {{ a }}</p> }
              <ul>@for (i of p.incluye; track i) { <li>{{ i }}</li> }</ul>
              <a [href]="p.id === 'gratis' ? '#diagnostico' : '#'" class="btn" [class.btn--laton]="p.destacado" [class.btn--caoba]="!p.destacado">{{ p.cta }}</a>
            </article>
          }
        </div>

        <div class="garantias">
          <p><strong>Garantía de 30 días</strong> en el primer pago de cualquier plan.</p>
          <p><strong>Cancelas en dos clics</strong> o pausas hasta 2 meses, sin llamadas.</p>
          <p><strong>Precios congelados</strong> por 12 meses, a RD$59 por dólar.</p>
        </div>

        <div class="sueltas">
          <h3>O compra solo lo que necesitas</h3>
          <dl>
            @for (s of sueltas; track s.nombre) {
              <div><dt>{{ s.nombre }}</dt><dd><span class="p">{{ s.precio }}</span><span class="muted">{{ s.nota }}</span></dd></div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .planes { padding: clamp(4.5rem, 10vw, 8rem) 0; background: var(--marfil); border-top: 1px solid var(--linea); }
    .cabeza { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1.5rem; margin-bottom: 2.5rem; }
    .controles { display: flex; flex-wrap: wrap; gap: .75rem; }
    .seg { display: inline-flex; border: 2px solid var(--caoba); border-radius: 999px; padding: 3px; }
    .seg button { border: 0; background: none; padding: .5rem 1rem; border-radius: 999px; cursor: pointer; font-weight: 600; font-size: var(--t-sm); min-height: 40px; }
    .seg button.on { background: var(--caoba); color: var(--marfil); }

    .tabla { display: grid; grid-template-columns: repeat(4, 1fr); border: 2px solid var(--caoba); border-radius: var(--radius-l); overflow: hidden; }
    .plan { padding: 1.75rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; border-right: 1px solid var(--linea); background: #fff; }
    .plan:last-child { border-right: 0; }
    .plan.destacado { background: var(--caoba); color: var(--marfil); }
    .plan h3 { font-size: 2.25rem; text-transform: uppercase; }
    .para { font-size: var(--t-sm); color: var(--tinta-suave); margin-top: .25rem; }
    .destacado .para, .destacado .ciclo, .destacado li { color: rgba(255,253,250,.8); }
    .precio { display: flex; flex-direction: column; }
    .cifra { font-family: var(--display); font-weight: 900; font-size: 3.25rem; line-height: 1; font-variant-numeric: tabular-nums; }
    .destacado .cifra { color: var(--laton); }
    .ciclo { font-size: var(--t-sm); color: var(--tinta-suave); }
    .ahorro { font-size: var(--t-sm); font-weight: 600; color: var(--mar); margin-top: -.5rem; }
    .destacado .ahorro { color: var(--laton); }
    ul { list-style: none; margin: 0; padding: 0; display: grid; gap: .55rem; font-size: var(--t-sm); flex: 1; align-content: start; }
    li { padding-left: 1.1rem; position: relative; }
    li::before { content: ""; position: absolute; left: 0; top: .55em; width: 6px; height: 6px; border-radius: 50%; background: var(--flamboyan); }
    .plan .btn { width: 100%; }

    .garantias { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; font-size: var(--t-sm); }
    .sueltas { margin-top: 4rem; }
    .sueltas h3 { font-size: var(--t-xl); text-transform: uppercase; margin-bottom: 1.25rem; }
    dl { margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); column-gap: 3rem; }
    dl > div { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--linea); }
    dt { font-weight: 600; }
    dd { margin: 0; text-align: right; display: flex; flex-direction: column; font-size: var(--t-sm); }
    .p { font-weight: 700; font-size: var(--t-md); }
    @media (max-width: 1020px) { .tabla { grid-template-columns: repeat(2, 1fr); } .plan:nth-child(2) { border-right: 0; } .plan:nth-child(-n+2) { border-bottom: 1px solid var(--linea); } }
    @media (max-width: 640px) { .tabla { grid-template-columns: 1fr; } .plan { border-right: 0; border-bottom: 1px solid var(--linea); } .garantias, dl { grid-template-columns: 1fr; } }
  `],
})
export class PlanesComponent {
  planes = PLANES;
  sueltas = SUELTAS;
  monedas: Moneda[] = ['DOP', 'USD'];
  moneda = signal<Moneda>('DOP');
  ciclo = signal<Ciclo>('mensual');

  formato(p: Plan): string {
    const v = p.precio[this.moneda()][this.ciclo()];
    if (v === 0) return this.moneda() === 'DOP' ? 'RD$0' : 'USD 0';
    const n = v.toLocaleString('es-DO');
    return this.moneda() === 'DOP' ? `RD$${n}` : `USD ${n}`;
  }

  ahorro(p: Plan): string | null {
    if (this.ciclo() !== 'anual' || p.precio.USD.mensual === 0) return null;
    const m = p.precio[this.moneda()].mensual * (p.id === 'artista' ? 6 : 12);
    const dif = m - p.precio[this.moneda()].anual;
    if (dif <= 0) return null;
    return this.moneda() === 'DOP' ? `RD$${dif.toLocaleString('es-DO')}` : `USD ${dif.toLocaleString('es-DO')}`;
  }
}
