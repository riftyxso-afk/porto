// A signature here is drawn, not typeset. The name is rendered once into a
// stencil whose red channel holds, per pixel, the moment the pen reaches it,
// and a shader paints the ink up to whatever moment is current. That is what
// makes the same name sign the same way twice and a different name sign with a
// different hand: every number the ink uses is read out of a hash of the name.

const TAU = Math.PI * 2;

export interface InkParams {
  /** Stable digest of the name. The identity of this signature. */
  seed: number;
  /** Hex form of the seed, shown on the card so a signature can be named. */
  seedHex: string;
  /** How far the writing leans off level, as a fraction of the band height. */
  slant: number;
  /** Whole rises and falls of the hand across the width. */
  waves: number;
  waveAmp: number;
  wavePhase: number;
  inkDark: number;
  grain: number;
  grainScale: number;
  /** Width of the wet edge the pen leaves behind it. */
  edge: number;
  /** How ragged that edge is. Ink does not stop on a ruled line. */
  jitter: number;
  nib: number;
  /** How much the pen slows down where the strokes are dense. */
  speedK: number;
  /** Whether this hand underlines its name. */
  flourish: boolean;
}

export function hashName(name: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// mulberry32: the digest is a number, and this walks it into the dozen numbers
// the ink needs. Same seed in, same walk out, on every machine.
function walk(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function inkParams(name: string): InkParams {
  const key = name.trim().toLowerCase().replace(/\s+/g, " ");
  const seed = hashName(key);
  const r = walk(seed);

  return {
    seed,
    seedHex: seed.toString(16).padStart(8, "0"),
    slant: (r() - 0.34) * 0.15,
    waves: 1 + Math.floor(r() * 3),
    waveAmp: 0.012 + r() * 0.033,
    wavePhase: r() * TAU,
    inkDark: 0.84 + r() * 0.14,
    grain: 0.014 + r() * 0.026,
    grainScale: 90 + r() * 180,
    edge: 0.005 + r() * 0.009,
    jitter: 0.005 + r() * 0.015,
    nib: 0.006 + r() * 0.009,
    speedK: 2.4 + r() * 4.2,
    flourish: r() < 0.58,
  };
}

const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `#version 300 es
precision highp float;

uniform sampler2D uInk;
uniform vec2 uSize;
uniform float uProgress;
uniform float uSeed;
uniform float uInkDark;
uniform float uGrain;
uniform float uGrainScale;
uniform float uEdge;
uniform float uJitter;
uniform vec2 uNib;
uniform float uNibSize;

out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 uv = vec2(gl_FragCoord.x / uSize.x, 1.0 - gl_FragCoord.y / uSize.y);
  vec4 ink = texture(uInk, uv);

  // The wet front. Ink already laid down is behind the pen; the band around
  // the pen is the stroke still spreading into the paper, and the noise riding
  // on it is what stops that boundary reading as a ruled line.
  float n = noise(uv * uGrainScale * 0.4 + uSeed);
  float d = (ink.r - uProgress) + (n - 0.5) * uJitter;
  float wet = smoothstep(uEdge, -uEdge * 0.4, d);

  // Paper. A tooth in the sheet rather than a texture laid over it, so the
  // white stays white and the grain never fights the ink for attention.
  float g = noise(uv * uGrainScale + uSeed * 1.7);
  vec3 paper = vec3(0.988, 0.984, 0.973) + (g - 0.5) * uGrain;

  float a = ink.a * wet;

  // The nib. A hand writes with a point resting on the paper, so there is
  // always something at the front of the stroke, not just a boundary.
  float aspect = uSize.x / uSize.y;
  float d2 = distance(uv * vec2(aspect, 1.0), uNib * vec2(aspect, 1.0));
  a = max(a, smoothstep(uNibSize, uNibSize * 0.25, d2));

  vec3 col = mix(paper, vec3(0.055, 0.055, 0.062), clamp(a, 0.0, 1.0) * uInkDark);
  outColor = vec4(col, 1.0);
}
`;

export interface Band {
  top: number;
  bottom: number;
  center: number;
  half: number;
}

export interface Stencil {
  canvas: HTMLCanvasElement;
  /** One per line of the name, plus one when the hand adds a flourish. */
  bands: Band[];
  /** Maps a moment of the writing to the column the pen is over. */
  travel: Uint8Array;
  columns: number;
  empty: boolean;
}

const MAX_STENCIL_W = 1400;
const TRAVEL_SAMPLES = 1024;
const PROFILE_COLS = 256;
const PROFILE_ROWS = 40;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function createProgram(gl: WebGL2RenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.bindAttribLocation(program, 0, "position");
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines: string[] = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

interface Placement {
  lines: string[];
  size: number;
  lineHeight: number;
  top: number;
  baselines: number[];
  left: number;
  right: number;
}

// The largest size at which the name still fits the sheet, wrapping to at most
// two lines. Below the floor the name is kept on one line and allowed to run
// long rather than shrinking into something unreadable.
function place(
  ctx: CanvasRenderingContext2D,
  text: string,
  family: string,
  w: number,
  h: number,
): Placement {
  const maxWidth = w * 0.84;
  const maxSize = h * 0.34;
  const minSize = h * 0.13;

  let size = maxSize;
  let lines: string[] = [];
  for (; size >= minSize; size -= Math.max(1, Math.round(size * 0.04))) {
    ctx.font = `${size}px ${family}`;
    const candidate = wrap(ctx, text, maxWidth);
    if (candidate.length <= 2) {
      lines = candidate;
      break;
    }
  }
  if (!lines.length) {
    size = minSize;
    ctx.font = `${size}px ${family}`;
    lines = [text];
  }

  const lineHeight = size * 1.12;
  const flourishH = size * 0.3;
  const blockH = lines.length * lineHeight + flourishH;
  const top = (h - blockH) / 2;

  const baselines: number[] = [];
  let left = w;
  let right = 0;
  lines.forEach((line, i) => {
    const width = ctx.measureText(line).width;
    left = Math.min(left, (w - width) / 2);
    right = Math.max(right, (w + width) / 2);
    baselines.push(top + i * lineHeight + size * 0.76);
  });

  return { lines, size, lineHeight, top, baselines, left, right };
}

// The swash under the name. A pen pressed down swells and lifts, so the stroke
// is built as two edges offset from the path the nib walks: half a pixel of
// radius at each end and the thickest part under the middle. Filling circles
// along the path instead would run them together into a solid bar, because a
// stroke this short cannot afford dots any wider apart than they are fat.
function drawFlourish(
  ctx: CanvasRenderingContext2D,
  p: Placement,
  w: number,
  flip: number,
) {
  const bandTop = p.top + p.lines.length * p.lineHeight;
  const bandH = p.size * 0.3;
  const midY = bandTop + bandH * 0.5;

  const pad = p.size * 0.2;
  const x0 = Math.max(p.size * 0.4, p.left - pad);
  const x1 = Math.min(w - p.size * 0.4, p.right + pad);
  const maxR = Math.max(1.5, p.size * 0.028);

  const steps = 96;
  const cx = (x0 + x1) / 2;
  const cy = midY + bandH * flip;
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x =
      (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x1;
    const y = (1 - t) * (1 - t) * midY + 2 * (1 - t) * t * cy + t * t * midY;

    const j = Math.min(steps, Math.max(0, i + 1));
    const k = Math.max(0, i - 1);
    const tX =
      ((1 - (j / steps)) * (1 - (j / steps)) * x0 +
        2 * (1 - (j / steps)) * (j / steps) * cx +
        (j / steps) * (j / steps) * x1) -
      ((1 - (k / steps)) * (1 - (k / steps)) * x0 +
        2 * (1 - (k / steps)) * (k / steps) * cx +
        (k / steps) * (k / steps) * x1);
    const tY =
      ((1 - (j / steps)) * (1 - (j / steps)) * midY +
        2 * (1 - (j / steps)) * (j / steps) * cy +
        (j / steps) * (j / steps) * midY) -
      ((1 - (k / steps)) * (1 - (k / steps)) * midY +
        2 * (1 - (k / steps)) * (k / steps) * cy +
        (k / steps) * (k / steps) * midY);

    const len = Math.hypot(tX, tY) || 1;
    const r = maxR * Math.pow(Math.sin(Math.PI * t), 0.42);
    left.push(x - (tY / len) * r, y + (tX / len) * r);
    right.push(x + (tY / len) * r, y - (tX / len) * r);
  }

  ctx.beginPath();
  ctx.moveTo(left[0], left[1]);
  for (let i = 2; i < left.length; i += 2) ctx.lineTo(left[i], left[i + 1]);
  for (let i = right.length - 2; i >= 0; i -= 2) ctx.lineTo(right[i], right[i + 1]);
  ctx.closePath();
  ctx.fill();
}

export function buildStencil(
  text: string,
  family: string,
  params: InkParams,
  width: number,
  height: number,
): Stencil {
  const sw = Math.max(1, Math.min(MAX_STENCIL_W, width));
  const sh = Math.max(1, Math.round((sw * height) / Math.max(1, width)));

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    return { canvas, bands: [], travel: new Uint8Array(1), columns: 1, empty: true };
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return { canvas, bands: [], travel: new Uint8Array(1), columns: 1, empty: true };
  }

  ctx.clearRect(0, 0, sw, sh);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const placement = place(ctx, trimmed, family, sw, sh);

  const bands: Band[] = placement.lines.map((_, i) => {
    const top = placement.top + i * placement.lineHeight;
    const bottom = top + placement.lineHeight;
    return { top, bottom, center: (top + bottom) / 2, half: (bottom - top) / 2 };
  });

  // A wavy baseline has to move whole letters, not pixels. Left to itself a
  // per-column wave shears each glyph into a parallelogram, so the text is drawn
  // one character at a time, each dropped by the wave at its own position on
  // the line. The letters then ride a curve the way a hand actually writes them.
  const sinScale = params.waves * TAU;

  placement.lines.forEach((line, lineIdx) => {
    const chars = [...line];
    const baseline = placement.baselines[lineIdx];
    const advances = chars.map((c) => ctx.measureText(c).width);
    const lineW = advances.reduce((a, b) => a + b, 0);
    const pivot = placement.top + (lineIdx + 0.5) * placement.lineHeight;
    let cursor = placement.left;

    chars.forEach((char, ci) => {
      const advance = advances[ci];
      if (!char.trim()) {
        cursor += advance;
        return;
      }
      // Measured across the whole name, so every line waves against the same
      // arc rather than each line restarting it.
      const t = lineW > 0 ? (cursor + advance / 2 - placement.left) / lineW : 0;
      const dy =
        params.waveAmp *
        Math.sin(t * sinScale + params.wavePhase) *
        placement.size *
        2.4;

      ctx.save();
      // A slant is a shear about the middle of the line, so the letters lean
      // without the whole block sliding sideways.
      const y = baseline + dy;
      ctx.translate(cursor, y);
      ctx.transform(1, 0, params.slant, 1, 0, -params.slant * (y - pivot));
      ctx.fillText(char, 0, 0);
      ctx.restore();

      cursor += advance;
    });
  });

  if (params.flourish) {
    // The dip is seeded too, so a flourish that goes the other way is as much a
    // different hand as a different slant.
    const flip = ((params.seed >> 7) & 1) === 0 ? 0.85 : -0.5;
    drawFlourish(ctx, placement, sw, flip);
    const top = placement.top + placement.lines.length * placement.lineHeight;
    const bottom = top + placement.size * 0.3;
    bands.push({
      top,
      bottom,
      center: (top + bottom) / 2,
      half: (bottom - top) / 2,
    });
  }

  const bandCount = bands.length;
  const span = 1 / bandCount;
  const image = ctx.getImageData(0, 0, sw, sh);
  const data = image.data;

  // One pass writes the pen's schedule into the red channel: the moment the nib
  // reaches this pixel. Alpha is left as the glyph coverage it already was.
  for (let y = 0; y < sh; y++) {
    let bandIdx = -1;
    for (let b = 0; b < bandCount; b++) {
      if (y >= bands[b].top && y < bands[b].bottom) {
        bandIdx = b;
        break;
      }
    }
    const band = bandIdx >= 0 ? bands[bandIdx] : null;
    const start = bandIdx >= 0 ? bandIdx * span : 0;
    const vLocal = band ? (y - band.center) / Math.max(1, band.half) : 0;

    for (let x = 0; x < sw; x++) {
      const i = (y * sw + x) * 4;
      if (data[i + 3] === 0) continue;
      let local = x / sw + params.slant * vLocal;
      if (local < 0) local = 0;
      else if (local > 1) local = 1;
      data[i] = Math.round((start + local * span) * 255);
    }
  }
  ctx.putImageData(image, 0, 0);

  // How much ink sits in each column, read off a small copy. The pen spends
  // more of its travel where the strokes pile up, which is what separates a
  // hand that labours its letters from one that races them.
  const small = document.createElement("canvas");
  small.width = PROFILE_COLS;
  small.height = PROFILE_ROWS;
  const sctx = small.getContext("2d", { willReadFrequently: true });
  const profile = new Float32Array(PROFILE_COLS);
  if (sctx) {
    sctx.clearRect(0, 0, PROFILE_COLS, PROFILE_ROWS);
    sctx.drawImage(canvas, 0, 0, PROFILE_COLS, PROFILE_ROWS);
    const small2 = sctx.getImageData(0, 0, PROFILE_COLS, PROFILE_ROWS).data;
    for (let c = 0; c < PROFILE_COLS; c++) {
      let sum = 0;
      for (let r = 0; r < PROFILE_ROWS; r++) sum += small2[(r * PROFILE_COLS + c) * 4 + 3];
      profile[c] = sum / (PROFILE_ROWS * 255);
    }
  }

  const travel = new Uint8Array(TRAVEL_SAMPLES);
  const steps = new Float32Array(PROFILE_COLS - 1);
  let total = 0;
  for (let i = 0; i < PROFILE_COLS - 1; i++) {
    steps[i] = 1 / (1 + params.speedK * profile[i]);
    total += steps[i];
  }
  if (total > 0) {
    let acc = 0;
    let c = 0;
    for (let i = 0; i < TRAVEL_SAMPLES; i++) {
      const t = i / (TRAVEL_SAMPLES - 1);
      while (c < PROFILE_COLS - 2 && acc + steps[c] / total < t) {
        acc += steps[c] / total;
        c++;
      }
      travel[i] = c;
    }
  } else {
    for (let i = 0; i < TRAVEL_SAMPLES; i++) {
      travel[i] = Math.round((i / (TRAVEL_SAMPLES - 1)) * (PROFILE_COLS - 1));
    }
  }

  return { canvas, bands, travel, columns: PROFILE_COLS, empty: false };
}

export interface SignatureRenderer {
  draw(stencil: Stencil, params: InkParams, progress: number): void;
  /** Where the nib is at a given moment, in shader uv. */
  nibAt(stencil: Stencil, progress: number): [number, number];
  dispose(): void;
}

export function createSignatureRenderer(
  canvas: HTMLCanvasElement,
): SignatureRenderer | null {
  // preserveDrawingBuffer so the finished sheet can be read back for the
  // download and for the card without the frame being gone before it is asked
  // for. Alpha is off: paper fills the whole sheet, nothing shows through.
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;

  const program = createProgram(gl);
  if (!program) return null;

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    uInk: u("uInk"),
    uSize: u("uSize"),
    uProgress: u("uProgress"),
    uSeed: u("uSeed"),
    uInkDark: u("uInkDark"),
    uGrain: u("uGrain"),
    uGrainScale: u("uGrainScale"),
    uEdge: u("uEdge"),
    uJitter: u("uJitter"),
    uNib: u("uNib"),
    uNibSize: u("uNibSize"),
  };

  const seedToUnit = (seed: number) => (seed % 9973) / 9973;

  const nibAt = (stencil: Stencil, progress: number): [number, number] => {
    if (stencil.empty || !stencil.bands.length) return [0, 0];
    const bandCount = stencil.bands.length;
    const scaled = Math.min(0.999999, Math.max(0, progress)) * bandCount;
    const bandIdx = Math.min(bandCount - 1, Math.floor(scaled));
    const local = scaled - bandIdx;
    const sample = Math.min(
      TRAVEL_SAMPLES - 1,
      Math.max(0, Math.round(local * (TRAVEL_SAMPLES - 1))),
    );
    const u0 = stencil.travel[sample] / Math.max(1, stencil.columns - 1);
    const band = stencil.bands[bandIdx];
    return [u0, 1 - band.center / stencil.canvas.height];
  };

  const draw = (stencil: Stencil, params: InkParams, progress: number) => {
    const w = canvas.width;
    const h = canvas.height;
    if (!w || !h) return;

    gl.viewport(0, 0, w, h);
    gl.clearColor(0.988, 0.984, 0.973, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (stencil.empty) return;

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, stencil.canvas);

    const [nibX, nibY] = nibAt(stencil, progress);

    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uniforms.uInk, 0);
    gl.uniform2f(uniforms.uSize, w, h);
    gl.uniform1f(uniforms.uProgress, progress);
    gl.uniform1f(uniforms.uSeed, seedToUnit(params.seed));
    gl.uniform1f(uniforms.uInkDark, params.inkDark);
    gl.uniform1f(uniforms.uGrain, params.grain);
    gl.uniform1f(uniforms.uGrainScale, params.grainScale * (h / 520));
    gl.uniform1f(uniforms.uEdge, params.edge);
    gl.uniform1f(uniforms.uJitter, params.jitter);
    gl.uniform2f(uniforms.uNib, nibX, nibY);
    gl.uniform1f(uniforms.uNibSize, params.nib);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  return {
    draw,
    nibAt,
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

// The sheet as it stands, for the download and for the card. Rendered at the
// finished moment whatever the screen is currently showing, so a signature
// caught mid-stroke still exports whole.
export function snapshot(
  canvas: HTMLCanvasElement,
  stencil: Stencil,
  params: InkParams,
  renderer: SignatureRenderer,
) {
  renderer.draw(stencil, params, 1);
  return canvas.toDataURL("image/png");
}