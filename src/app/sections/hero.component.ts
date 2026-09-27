import { Component, HostListener, inject, signal } from '@angular/core';
import { PianoService } from '../core/piano.service';
import { GENEROS, Genero } from '../core/content';

interface Tecla { midi: number; negra: boolean; indice: number; genero?: Genero; teclaPc?: string; movil: boolean; }

const BLANCAS = [0, 2, 4, 5, 7, 9, 11];
const PC_BLANCAS = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'];
const PC_NEGRAS: Record<string, number> = { w: 61, e: 63, t: 66, y: 68, u: 70, o: 73, p: 75 };

@Component({
  selector: 'lm-hero',
  template: `
    <section id="inicio" class="hero oscuro">
      <div class="wrap hero__texto">
        <h1>
          <span class="l1">Del primer acorde</span>
          <span class="l2">a tu primer lanzamiento.</span>
        </h1>
        <div class="hero__pie">
          <p class="lead">La academia digital en español para músicos y artistas. Piano, guitarra, canto y producción con mentores que ejercen, y todo lo que aprendes queda grabado en tu biblioteca.</p>
          <div class="hero__ctas">
            <a href="#diagnostico" class="btn btn--laton">Hacer mi diagnóstico gratis</a>
            <a href="#planes" class="btn btn--linea">Ver planes y precios</a>
          </div>
        </div>
      </div>

      <div class="lectura wrap" aria-live="polite">
        @if (actual(); as g) {
          <p><strong>{{ g.nombre }}.</strong> {{ g.texto }}</p>
        } @else {
          <p class="muted-claro">Toca el teclado. Las teclas con nombre suenan a un género que enseñamos.<span class="pc"> También puedes usar las teclas A a Ñ de tu computadora.</span></p>
        }
      </div>

      <div class="teclado" role="group" aria-label="Teclado de piano interactivo">
        <div class="teclado__blancas">
          @for (t of blancas; track t.midi) {
            <button type="button" class="tecla"
              [class.activa]="activas().has(t.midi)"
              [class.con-genero]="!!t.genero"
              [class.solo-escritorio]="!t.movil"
              [style.--i]="t.indice"
              (pointerdown)="tocar(t, $event)"
              (keydown.enter)="tocar(t)" (keydown.space)="tocar(t); $event.preventDefault()"
              [attr.aria-label]="t.genero ? 'Tocar ' + t.genero.nombre : 'Nota ' + nombreNota(t.midi)">
              @if (t.genero) { <span class="tecla__genero">{{ t.genero.nombre }}</span> }
              @if (t.teclaPc) { <span class="tecla__pc" aria-hidden="true">{{ t.teclaPc }}</span> }
            </button>
          }
        </div>
        <div class="teclado__negras" aria-hidden="false">
          @for (t of negras; track t.midi) {
            <button type="button" class="negra"
              [class.activa]="activas().has(t.midi)"
              [class.solo-escritorio]="!t.movil"
              [style.--pos]="t.indice"
              tabindex="-1"
              (pointerdown)="tocar(t, $event)"
              [attr.aria-label]="'Nota ' + nombreNota(t.midi)"></button>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private piano = inject(PianoService);
  readonly activas = signal<Set<number>>(new Set());
  readonly actual = signal<Genero | null>(null);
  readonly blancas: Tecla[] = [];
  readonly negras: Tecla[] = [];

  constructor() {
    let i = 0;
    for (let m = 48; m <= 83; m++) {
      const movil = m >= 55 && m <= 76;
      if (BLANCAS.includes(m % 12)) {
        const genero = GENEROS.find(g => g.midi === m);
        const pcIdx = m >= 60 ? this.blancasDesde60(m) : -1;
        this.blancas.push({ midi: m, negra: false, indice: i, genero, movil, teclaPc: pcIdx >= 0 ? PC_BLANCAS[pcIdx] : undefined });
        i++;
      } else {
        this.negras.push({ midi: m, negra: true, indice: i, movil });
      }
    }
    // En móvil el teclado empieza en Sol 3: la posición de las negras se recalcula con CSS (--offset).
  }

  private blancasDesde60(m: number): number {
    let n = 0;
    for (let x = 60; x < m; x++) if (BLANCAS.includes(x % 12)) n++;
    return n < PC_BLANCAS.length ? n : -1;
  }

  nombreNota(m: number): string {
    const n = ['Do', 'Do sostenido', 'Re', 'Re sostenido', 'Mi', 'Fa', 'Fa sostenido', 'Sol', 'Sol sostenido', 'La', 'La sostenido', 'Si'];
    return `${n[m % 12]} ${Math.floor(m / 12) - 1}`;
  }

  tocar(t: Tecla, ev?: Event) {
    ev?.preventDefault();
    if (t.genero) {
      this.actual.set(t.genero);
      this.piano.phrase(t.genero.frase);
      t.genero.frase.forEach(([m, w]) => setTimeout(() => this.pulsar(m, 220), w * 1000));
    } else {
      this.piano.play(t.midi);
      this.pulsar(t.midi, 180);
    }
  }

  private pulsar(midi: number, ms: number) {
    this.activas.update(s => new Set(s).add(midi));
    setTimeout(() => this.activas.update(s => { const n = new Set(s); n.delete(midi); return n; }), ms);
  }

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const k = e.key.toLowerCase();
    const idx = PC_BLANCAS.indexOf(k);
    if (idx >= 0) {
      const t = this.blancas.find(b => b.teclaPc === k);
      if (t) { this.piano.play(t.midi); this.pulsar(t.midi, 180); }
    } else if (PC_NEGRAS[k]) {
      this.piano.play(PC_NEGRAS[k]); this.pulsar(PC_NEGRAS[k], 180);
    }
  }
}
