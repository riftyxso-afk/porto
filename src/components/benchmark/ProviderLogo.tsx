// One mark per creator, served from /public/logos.
//
// The marks are not consistent with each other: some are a bare glyph on
// transparency, others are a disc or rounded tile with the brand colour already
// painted into the file. Dropping them straight onto the page would leave four
// rows carrying a white chip in light mode and a black chip in dark mode, and
// fourteen rows carrying nothing at all. So every mark is laid over the same
// neutral square, which makes both kinds land on the same tile.
//
// The chip stays light in dark mode on purpose. It is a small brand-coloured
// object, and an object keeps its own colours in a dark interface the same way
// a photograph does.
export function ProviderLogo({ file, size = 28 }: { file: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f4f4f5] ring-1 ring-black/[0.06] dark:ring-white/[0.08]"
      style={{ width: size, height: size }}
    >
      <img
        src={`/logos/${file}`}
        alt=""
        width={size - 6}
        height={size - 6}
        loading="lazy"
        decoding="async"
        className="h-auto w-auto max-w-full object-contain"
      />
    </span>
  );
}