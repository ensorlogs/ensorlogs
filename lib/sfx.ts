/** Tiny synthesized sound effects — no audio files needed. */

/** Global volume ceiling — everything stays whisper-quiet. */
const MASTER = 0.35;

let sfxCtx: AudioContext | null = null;
let noiseBuf: AudioBuffer | null = null;

function getNoise(): AudioBuffer {
  if (!sfxCtx) throw new Error("no ctx");
  if (!noiseBuf) {
    noiseBuf = sfxCtx.createBuffer(1, sfxCtx.sampleRate, sfxCtx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

/**
 * One gruff "woof": a low sawtooth body whose pitch drops fast,
 * layered with a band-passed noise burst for the raspy edge —
 * schnauzer-style, not a chiptune beep.
 */
function bark(when: number, base: number) {
  if (!sfxCtx) return;
  const dur = 0.16;

  const osc = sfxCtx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(base * 1.9, when);
  osc.frequency.exponentialRampToValueAtTime(base, when + 0.045);
  osc.frequency.exponentialRampToValueAtTime(base * 0.55, when + dur);

  const noise = sfxCtx.createBufferSource();
  noise.buffer = getNoise();
  const bp = sfxCtx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(750, when);
  bp.frequency.exponentialRampToValueAtTime(400, when + dur);
  bp.Q.value = 1.1;

  const lp = sfxCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(1600, when);
  lp.frequency.exponentialRampToValueAtTime(450, when + dur);

  const gain = sfxCtx.createGain();
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.55 * MASTER, when + 0.014);
  gain.gain.exponentialRampToValueAtTime(0.001, when + dur);

  osc.connect(lp);
  noise.connect(bp).connect(gain);
  lp.connect(gain);
  gain.connect(sfxCtx.destination);

  osc.start(when);
  osc.stop(when + dur + 0.02);
  noise.start(when);
  noise.stop(when + dur);
}

let woofAudio: HTMLAudioElement | null = null;

/**
 * Real schnauzer-style bark (CC0 sample) — falls back to the
 * synthesized woof if the file can't be loaded/played.
 */
export function playWoof() {
  try {
    woofAudio ??= new Audio("/sfx/woof.mp3");
    woofAudio.currentTime = 0;
    woofAudio.playbackRate = 1.45; // pitched up — smaller, cuter schnauzer yip
    woofAudio.volume = MASTER;
    const p = woofAudio.play();
    if (p) p.catch(() => synthWoof());
  } catch {
    synthWoof();
  }
}

/** Two quick synthesized "woof woof" barks (fallback). */
function synthWoof() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  bark(now, 210);
  bark(now + 0.22, 175);
}

/** Coffee pouring — filtered noise with a couple of "glug" dips. */
export function playPour() {
  sfxCtx ??= new AudioContext();
  const ctx = sfxCtx;
  const now = ctx.currentTime;
  const dur = 0.9;

  const noise = ctx.createBufferSource();
  noise.buffer = getNoise();
  noise.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(1400, now);
  bp.frequency.exponentialRampToValueAtTime(450, now + dur);
  bp.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.22 * MASTER, now + 0.06);
  // two little "glug" dips while it pours
  gain.gain.setValueAtTime(0.22 * MASTER, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.1 * MASTER, now + 0.36);
  gain.gain.exponentialRampToValueAtTime(0.22 * MASTER, now + 0.44);
  gain.gain.setValueAtTime(0.22 * MASTER, now + 0.62);
  gain.gain.exponentialRampToValueAtTime(0.12 * MASTER, now + 0.68);
  gain.gain.exponentialRampToValueAtTime(0.18 * MASTER, now + 0.76);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  noise.connect(bp).connect(gain).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + dur);
}

/* ---------- tiny 8-bit helpers ---------- */

function blip(
  when: number,
  freq: number,
  dur: number,
  type: OscillatorType = "square",
  vol = 0.18
) {
  if (!sfxCtx) return;
  const osc = sfxCtx.createOscillator();
  const g = sfxCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, when);
  g.gain.setValueAtTime(vol * MASTER, when);
  g.gain.exponentialRampToValueAtTime(0.001, when + dur);
  osc.connect(g).connect(sfxCtx.destination);
  osc.start(when);
  osc.stop(when + dur + 0.02);
}

function noiseClick(when: number, freq: number, dur: number, vol = 0.3) {
  if (!sfxCtx) return;
  const n = sfxCtx.createBufferSource();
  n.buffer = getNoise();
  const bp = sfxCtx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = freq;
  bp.Q.value = 1.4;
  const g = sfxCtx.createGain();
  g.gain.setValueAtTime(vol * MASTER, when);
  g.gain.exponentialRampToValueAtTime(0.001, when + dur);
  n.connect(bp).connect(g).connect(sfxCtx.destination);
  n.start(when);
  n.stop(when + dur);
}

/** Nintendo-style coin blip — the classic two-note collect sound. */
export function playNintendo() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  blip(now, 988, 0.09); // B5
  blip(now + 0.09, 1319, 0.3); // E6 held
}

/** Xbox-style achievement chime — rising 8-bit double blip. */
export function playXbox() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  blip(now, 659, 0.08); // E5
  blip(now + 0.08, 988, 0.08); // B5
  blip(now + 0.16, 1319, 0.22, "triangle", 0.22); // E6
}

/** Smart bulb on — relay click + soft "power" ping. */
export function playBulb() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  noiseClick(now, 3200, 0.03, 0.4);
  blip(now + 0.04, 1568, 0.12, "sine", 0.12); // soft G6 ping
}

/** Smart plug — mechanical clack + tiny zap. */
export function playPlug() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  noiseClick(now, 2400, 0.025, 0.45);
  noiseClick(now + 0.05, 5200, 0.05, 0.25); // zap crackle
}

/** Ubuntu/server boot — soft ambient chime swell. */
export function playBoot() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  for (const [i, f] of [392, 494, 587, 784].entries()) {
    // G4 B4 D5 G5 — warm swell, slow release
    blip(now + i * 0.1, f, 1.1 - i * 0.15, "sine", 0.07);
  }
}

let tigerAudio: HTMLAudioElement | null = null;

/** Low tiger growl (CC0) for the El Tigre poster — tiny growl fallback. */
export function playTiger() {
  try {
    tigerAudio ??= new Audio("/sfx/tiger.mp3");
    tigerAudio.currentTime = 0;
    tigerAudio.volume = MASTER * 0.6; // extra quiet — just a hint of growl
    const p = tigerAudio.play();
    if (p) p.catch(() => synthGrowl());
  } catch {
    synthGrowl();
  }
}

function synthGrowl() {
  sfxCtx ??= new AudioContext();
  const now = sfxCtx.currentTime;
  const dur = 0.7;
  const osc = sfxCtx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(85, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + dur);
  const lfo = sfxCtx.createOscillator();
  lfo.frequency.value = 14;
  const lfoGain = sfxCtx.createGain();
  lfoGain.gain.value = 0.12;
  const g = sfxCtx.createGain();
  g.gain.setValueAtTime(0.001, now);
  g.gain.exponentialRampToValueAtTime(0.3 * MASTER, now + 0.08);
  g.gain.exponentialRampToValueAtTime(0.001, now + dur);
  const lp = sfxCtx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 350;
  lfo.connect(lfoGain).connect(g.gain);
  osc.connect(lp).connect(g).connect(sfxCtx.destination);
  osc.start(now);
  osc.stop(now + dur);
  lfo.start(now);
  lfo.stop(now + dur);
}
