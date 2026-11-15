// Web Audio API Synthesizer for Swarm Rebuild (zero external assets, zero network calls)

class SwarmAudioEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private lastTypeAt = 0;
  private lastDragAt = 0;

  private ensureContext(): AudioContext | null {
    if (typeof window === "undefined" || !this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(next: boolean) {
    this.enabled = next;
  }

  public unlock() {
    this.ensureContext();
  }

  // Subtle mechanical key tick while cursors type text
  public playTypeTick() {
    const nowMs = performance.now();
    if (nowMs - this.lastTypeAt < 48) return;
    this.lastTypeAt = nowMs;

    const ctx = this.ensureContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const pitch = 900 + Math.random() * 450;
    osc.frequency.setValueAtTime(pitch, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.018);

    gain.gain.setValueAtTime(0.025, t);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.022);
  }

  // Crisp mouse press tick when a builder begins dragging a bounding box
  public playDragStart() {
    const nowMs = performance.now();
    if (nowMs - this.lastDragAt < 80) return;
    this.lastDragAt = nowMs;

    const ctx = this.ensureContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(340, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.032);

    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.0008, t + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.038);
  }

  // Soft pentatonic marimba note when a card or element snaps into place
  public playPlaceTone(index: number) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5]; // C5 D5 E5 G5 A5 C6
    const freq = notes[index % notes.length];
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.04, t + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0006, t + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.17);
  }

  // Double pop for Option-drag duplication
  public playDuplicatePop() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    [0, 0.055].forEach((offset, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(idx === 0 ? 440 : 660, t + offset);
      osc.frequency.exponentialRampToValueAtTime(idx === 0 ? 540 : 780, t + offset + 0.04);

      gain.gain.setValueAtTime(0.03, t + offset);
      gain.gain.exponentialRampToValueAtTime(0.0006, t + offset + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t + offset);
      osc.stop(t + offset + 0.055);
    });
  }

  // Ruler guide snap ping
  public playGuideSnap() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1180, t);
    gain.gain.setValueAtTime(0.018, t);
    gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.055);
  }

  // Warm ambient completion chord when full page rebuild completes
  public playCompletionChord() {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const chord = [523.25, 659.25, 783.99, 987.77, 1174.66]; // Cmaj9
    const t = ctx.currentTime;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = t + i * 0.045;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.032, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0004, start + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.9);
    });
  }
}

export const swarmAudio = new SwarmAudioEngine();
