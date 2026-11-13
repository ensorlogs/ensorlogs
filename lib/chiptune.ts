/**
 * Generative lo-fi 8-bit chiptune — composed at runtime by a seeded random
 * walk over an A-minor pentatonic scale. No audio files, no licensing, and
 * every session gets a different (long) song.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

const BPM = 84;
const STEP = 60 / BPM / 4; // 16th notes
const BARS = 32; // long song before it loops
const STEPS = BARS * 16;

// A minor pentatonic across two octaves
const SCALE = [57, 60, 62, 64, 67, 69, 72, 74, 76, 79, 81];
// chord roots per 4-bar cycle: Am F C G
const PROG = [45, 41, 48, 43];

// seeded PRNG (mulberry32) — new song every load
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function compose(seed: number): number[] {
  const rand = rng(seed);
  const melody: number[] = new Array(STEPS).fill(0);
  let deg = 4; // start mid-scale
  for (let s = 0; s < STEPS; s++) {
    const inBar = s % 16;
    const r = rand();
    if (inBar === 0 && r < 0.85) {
      melody[s] = SCALE[deg]; // anchor on the downbeat
    } else if (inBar % 4 === 0 && r < 0.55) {
      deg += rand() < 0.5 ? -1 : 1; // quarter notes, stepwise
      melody[s] = SCALE[deg];
    } else if (inBar % 2 === 0 && r < 0.35) {
      deg += Math.floor(rand() * 3) - 1; // eighth notes, small walk
      melody[s] = SCALE[deg];
    } else if (r < 0.12) {
      deg += Math.floor(rand() * 5) - 2; // occasional jump
      melody[s] = SCALE[deg];
    }
    deg = Math.max(0, Math.min(SCALE.length - 1, deg));
  }
  return melody;
}

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let melody: number[] = [];
let step = 0;
let nextTime = 0;

function blip(
  freq: number,
  time: number,
  dur: number,
  type: OscillatorType,
  vol: number
) {
  if (!ctx || !master) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  osc.connect(gain).connect(master);
  osc.start(time);
  osc.stop(time + dur);
}

let noiseBuf: AudioBuffer | null = null;
function hat(time: number, vol: number) {
  if (!ctx || !master) return;
  if (!noiseBuf) {
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  const src = ctx.createBufferSource();
  src.buffer = noiseBuf;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
  const filter = ctx.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 6000;
  src.connect(filter).connect(gain).connect(master);
  src.start(time);
}

function scheduleStep(s: number, time: number) {
  const bar = Math.floor(s / 16) % BARS;
  const inBar = s % 16;
  const root = PROG[Math.floor(bar / 4) % PROG.length];

  const note = melody[s];
  if (note) blip(midi(note), time, STEP * 1.8, "square", 0.06);

  if (inBar % 8 === 0) blip(midi(root), time, STEP * 3, "triangle", 0.14);
  if (inBar === 8) blip(midi(root + 7), time, STEP * 3, "triangle", 0.1);

  if (inBar % 4 === 2) hat(time, 0.025);
}

function tick() {
  if (!ctx) return;
  while (nextTime < ctx.currentTime + 0.15) {
    scheduleStep(step % STEPS, nextTime);
    step++;
    nextTime += STEP;
  }
}

export function startChiptune(volume = 0.8) {
  if (ctx) return;
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = volume;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 3800; // lo-fi roll-off
  master.connect(lp).connect(ctx.destination);
  melody = compose(Math.floor(Math.random() * 2 ** 31));
  step = 0;
  nextTime = ctx.currentTime + 0.1;
  tick();
  timer = setInterval(tick, 40);
}

export async function stopChiptune() {
  if (timer) clearInterval(timer);
  timer = null;
  if (ctx) {
    const c = ctx;
    ctx = null;
    master = null;
    noiseBuf = null;
    await c.close();
  }
}

export function isChiptunePlaying() {
  return ctx !== null;
}
