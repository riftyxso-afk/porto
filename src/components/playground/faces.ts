// The face on the card. Taken from koboyo.com's hand-drawn set, kept as the
// source files so the shapes stay the illustrator's rather than a redraw, and
// turned into canvas paths at card time so the ink colour and the stamp tilt are
// both ours to set.
//
// The set is a fixed list of slugs rather than a fetch of everything, because a
// card that silently came out with a different face between two renders would
// break the one promise the page makes: the same name always yields the same
// card.

// The related-face set koboyo groups together, in the order its own page lists
// them. Each entry is [slug, the label the page gives the icon].
const SET: [string, string][] = [
  ["angry-face", "angry face"],
  ["anxious-face", "anxious face"],
  ["blockprint-face", "blockprint face"],
  ["blockprint-frown", "blockprint frown"],
  ["blockprint-smile", "blockprint smile"],
  ["blushing-face", "blushing face"],
  ["bored-face", "bored face"],
  ["cartoon-cheek", "cheek"],
  ["cartoon-chin", "chin"],
  ["cartoon-face", "cartoon face"],
  ["frown", "frown"],
  ["smile", "smile"],
];

export interface FaceChoice {
  slug: string;
  label: string;
}

/**
 * The face for a name. Picked from the same seed as the hand rather than at
 * random, so a name always comes back with the same face it had last time. The
 * user reads this as the face being random; it varies per name, which is the
 * part they see, and it stays put when they retype the name or press Sign again.
 */
export function pickFace(seed: number): FaceChoice {
  const [slug, label] = SET[seed % SET.length];
  return { slug, label };
}

interface SvgPart {
  path: Path2D;
  /** `transform` attributes from wrappers outside this path, outermost first. */
  wrap: string[];
}

interface ParsedFace {
  parts: SvgPart[];
  viewBox: [number, number, number, number];
}

/**
 * Turns one of the set's SVG files into paths on a canvas context. The icons
 * carry `fill="currentColor"` and no fixed colour, so nothing has to be
 * rewritten: the fill is whatever the context is already set to.
 *
 * Returns null when the file cannot be read or contains no paths. The face is
 * the one part of the card that may be missing; the signature, the name and the
 * seed are not optional, so a broken icon must not take the card with it.
 */
export async function loadFace(slug: string): Promise<ParsedFace | null> {
  if (typeof DOMParser === "undefined" || typeof Path2D === "undefined") {
    return null;
  }

  let markup: string;
  try {
    const res = await fetch(`/faces/${slug}.svg`);
    if (!res.ok) return null;
    markup = await res.text();
  } catch {
    return null;
  }

  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(markup, "image/svg+xml");
  } catch {
    return null;
  }

  const root = doc.documentElement;
  if (root.nodeName.toLowerCase() !== "svg") return null;

  // A missing viewBox has no defined mapping onto the canvas, so there is
  // nothing to scale against and the drawing is dropped.
  const vb = root.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (!vb || vb.length !== 4 || vb.some((n) => !Number.isFinite(n)) || vb[2] <= 0 || vb[3] <= 0) {
    return null;
  }

  const parts: SvgPart[] = [];
  // Depth first, carrying each wrapper's transform down to the paths inside it.
  const walk = (node: Element, wrap: string[]) => {
    for (const child of Array.from(node.children)) {
      const tag = child.nodeName.toLowerCase();
      if (tag === "path") {
        const d = child.getAttribute("d");
        if (!d) continue;
        try {
          parts.push({ path: new Path2D(d), wrap });
        } catch {
          // One malformed path is skipped; the rest of the face still draws.
        }
      } else {
        const t = child.getAttribute("transform");
        walk(child, t ? [...wrap, t] : wrap);
      }
    }
  };
  walk(root, []);

  if (!parts.length) return null;
  return { parts, viewBox: [vb[0], vb[1], vb[2], vb[3]] };
}

/**
 * Draws a parsed face centred on (cx, cy), fitted into a box of `size`, turned
 * by `tilt` radians. A face whose viewBox is taller than it is wide keeps its
 * proportions and sits centred in the box rather than being stretched to fill it.
 */
export function drawFace(
  ctx: CanvasRenderingContext2D,
  face: ParsedFace,
  cx: number,
  cy: number,
  size: number,
  tilt: number,
) {
  const [vx, vy, vw, vh] = face.viewBox;
  const scale = size / Math.max(vw, vh);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  // Centre on the viewBox's own midpoint, not its origin, because several of
  // these icons sit in a viewBox whose origin is well off to one side.
  ctx.scale(scale, scale);
  ctx.translate(-(vx + vw / 2), -(vy + vh / 2));

  for (const part of face.parts) {
    ctx.save();
    // Wrappers are outermost first, so restoring after each keeps them applied
    // in the order the document nests them.
    for (const t of part.wrap) ctx.transform(...parseTransform(t));
    ctx.fill(part.path);
    ctx.restore();
  }

  ctx.restore();
}

/**
 * The subset of the SVG transform grammar these icons actually use: translate
 * with one or two numbers, and scale with one or two. An unrecognised value
 * returns identity rather than throwing, which leaves the path drawn in the
 * wrong place instead of missing; the caller cannot tell the difference, but the
 * card survives.
 */
function parseTransform(value: string): [number, number, number, number, number, number] {
  let out: [number, number, number, number, number, number] = [1, 0, 0, 1, 0, 0];
  // The list runs left to right, so each call post-multiplies onto what is
  // already there, which is the order the SVG spec composes them in.
  for (const match of value.matchAll(/(translate|scale)\s*\(([^)]*)\)/g)) {
    const nums = match[2].trim().split(/[\s,]+/).map(Number);
    if (nums.some((n) => !Number.isFinite(n))) continue;
    if (nums.length < 1) continue;
    const [a, b] = nums;
    if (match[1] === "translate") {
      out = mul(out, [1, 0, 0, 1, a, b ?? 0]);
    } else {
      // One number scales both axes; the second number is the only way these
      // icons scale Y differently, which is how the blockprints flip upright.
      const sy = nums.length > 1 ? nums[1] : a;
      out = mul(out, [a, 0, 0, sy, 0, 0]);
    }
  }
  return out;
}

type Matrix = [number, number, number, number, number, number];

function mul(m: Matrix, n: Matrix): Matrix {
  return [
    m[0] * n[0] + m[2] * n[1],
    m[1] * n[0] + m[3] * n[1],
    m[0] * n[2] + m[2] * n[3],
    m[1] * n[2] + m[3] * n[3],
    m[0] * n[4] + m[2] * n[5] + m[4],
    m[1] * n[4] + m[3] * n[5] + m[5],
  ];
}