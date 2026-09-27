import { Injectable } from '@angular/core';

/**
 * Sintetizador mínimo con Web Audio para el teclado del hero.
 * No carga muestras: dos osciladores con envolvente corta imitan una cuerda percutida.
 */
@Injectable({ providedIn: 'root' })
export class PianoService {
  private ctx?: AudioContext;
  private master?: GainNode;

  private ensure(): AudioContext | undefined {
    if (typeof window === 'undefined') return undefined;
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return undefined;
      this.ctx = new Ctor();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.22;
      const comp = this.ctx.createDynamicsCompressor();
      this.master.connect(comp).connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  }

  /** midi 60 = Do central */
  play(midi: number, when = 0, duration = 1.4): void {
    const ctx = this.ensure();
    if (!ctx || !this.master) return;
    const t = ctx.currentTime + when;
    const freq = 440 * Math.pow(2, (midi - 69) / 12);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(1, t + 0.008);
    env.gain.exponentialRampToValueAtTime(0.25, t + 0.35);
    env.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    const tone = ctx.createBiquadFilter();
    tone.type = 'lowpass';
    tone.frequency.setValueAtTime(Math.min(9000, freq * 9), t);
    tone.frequency.exponentialRampToValueAtTime(Math.max(400, freq * 2), t + duration);

    const a = ctx.createOscillator();
    a.type = 'triangle';
    a.frequency.value = freq;
    const b = ctx.createOscillator();
    b.type = 'sine';
    b.frequency.value = freq * 2;
    b.detune.value = 4;
    const bGain = ctx.createGain();
    bGain.gain.value = 0.35;

    a.connect(env);
    b.connect(bGain).connect(env);
    env.connect(tone).connect(this.master);
    a.start(t); b.start(t);
    a.stop(t + duration + 0.05); b.stop(t + duration + 0.05);
  }

  /** Toca una secuencia [midi, tiempo en segundos] */
  phrase(notes: Array<[number, number]>, duration = 0.9): void {
    notes.forEach(([m, w]) => this.play(m, w, duration));
  }
}
