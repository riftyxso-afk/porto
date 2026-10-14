// The collectible. A signature on its own is a drawing; the same signature on a
// card with its seed on it is an object with an address, and that is the idea
// the whole page is built on: a name gets one signature and one number, and
// both come from the name itself.
//
// The art is composed in 2D rather than rendered by the shader so the type
// stays type. The signature arrives as an image from the WebGL sheet and is
// placed into a 63 by 88 frame, which is the ratio HoloCard crops to, so
// nothing is cut off at the edges.

import { drawFace, loadFace, pickFace } from "./faces";

const W = 630;
const H = 880; // 63:88

const PAPER = "#faf8f4";
const INK = "#0e0e0f";
const MUTED = "#6b6b73";

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Signature image failed to load"));
    img.src = src;
  });
}

export async function renderCardArt(
  signatureUrl: string,
  name: string,
  seedHex: string,
  seed: number,
  sansFamily: string,
  monoFamily: string,
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context for the card");

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  const img = await loadImage(signatureUrl);

  // The signature is a wide sheet dropped into a tall frame. Sizing it by width
  // keeps a long name from overrunning the card while a short one still fills
  // it, and the cap stops a two-character name from ballooning. The height slot
  // is not the binding constraint at this aspect ratio, so trimming it buys the
  // band the face sits in without shrinking the hand.
  const slotW = W * 0.78;
  const slotH = H * 0.38;
  const scale = Math.min(slotW / img.width, slotH / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (W - dw) / 2, H * 0.11, dw, dh);

  // The face is the avatar. It sits below the hand and above the name, tilted
  // the way a rubber stamp lands, and it comes from the same seed as the hand so
  // the two belong to the same signature rather than being decoration.
  const face = await loadFace(pickFace(seed).slug);
  if (face) {
    ctx.save();
    // Stamped, not printed: the ink is never perfectly solid.
    ctx.fillStyle = INK;
    ctx.globalAlpha = 0.82;
    drawFace(ctx, face, W / 2, H * 0.52, H * 0.115, -0.14);
    ctx.restore();
  }

  // A single rule under the name. It is the one line of structure on the card,
  // and it separates the hand that signed from the name that got signed.
  const ruleY = H * 0.62;
  const ruleW = W * 0.42;
  ctx.strokeStyle = "#d9d4c8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo((W - ruleW) / 2, ruleY);
  ctx.lineTo((W + ruleW) / 2, ruleY);
  ctx.stroke();

  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const label = name.trim().replace(/\s+/g, " ").toUpperCase();
  let fontSize = 44;
  ctx.font = `600 ${fontSize}px ${sansFamily}`;
  while (ctx.measureText(label).width > W * 0.78 && fontSize > 20) {
    fontSize -= 2;
    ctx.font = `600 ${fontSize}px ${sansFamily}`;
  }
  ctx.fillText(label, W / 2, ruleY + 74);

  // The seed is what makes the signature addressable: type the same name
  // anywhere and this is the number that comes back. It is printed, not
  // invented, so it can be checked rather than taken on faith.
  ctx.fillStyle = MUTED;
  ctx.font = `500 21px ${monoFamily}`;
  ctx.fillText(`#${seedHex}`, W / 2, H * 0.86);

  return canvas.toDataURL("image/png");
}