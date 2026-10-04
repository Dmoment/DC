// QR code for https://modestmoron.tech/card (version 3, error level M).
// Pre-rendered at build time so the page ships no QR library.
const MODULES = 29;
const PATH = "M0 0h7v1h-7zM10 0h1v1h-1zM13 0h2v1h-2zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM11 1h2v1h-2zM15 1h2v1h-2zM19 1h1v1h-1zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h1v1h-1zM11 2h1v1h-1zM13 2h1v1h-1zM17 2h1v1h-1zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM11 3h1v1h-1zM13 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h1v1h-1zM10 4h2v1h-2zM13 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM12 5h3v1h-3zM16 5h4v1h-4zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM10 7h1v1h-1zM14 7h2v1h-2zM17 7h1v1h-1zM19 7h2v1h-2zM1 8h1v1h-1zM4 8h1v1h-1zM6 8h1v1h-1zM8 8h2v1h-2zM11 8h1v1h-1zM13 8h1v1h-1zM16 8h2v1h-2zM20 8h2v1h-2zM23 8h2v1h-2zM26 8h1v1h-1zM2 9h4v1h-4zM7 9h4v1h-4zM13 9h1v1h-1zM18 9h1v1h-1zM22 9h3v1h-3zM27 9h2v1h-2zM1 10h3v1h-3zM6 10h1v1h-1zM11 10h1v1h-1zM13 10h6v1h-6zM20 10h2v1h-2zM25 10h2v1h-2zM28 10h1v1h-1zM0 11h3v1h-3zM5 11h1v1h-1zM7 11h3v1h-3zM12 11h1v1h-1zM15 11h5v1h-5zM21 11h1v1h-1zM25 11h1v1h-1zM27 11h2v1h-2zM4 12h4v1h-4zM11 12h1v1h-1zM13 12h1v1h-1zM16 12h2v1h-2zM19 12h2v1h-2zM23 12h1v1h-1zM25 12h1v1h-1zM28 12h1v1h-1zM0 13h2v1h-2zM7 13h1v1h-1zM9 13h5v1h-5zM22 13h1v1h-1zM24 13h1v1h-1zM26 13h1v1h-1zM28 13h1v1h-1zM1 14h2v1h-2zM4 14h4v1h-4zM9 14h1v1h-1zM16 14h3v1h-3zM20 14h3v1h-3zM24 14h1v1h-1zM28 14h1v1h-1zM2 15h2v1h-2zM7 15h3v1h-3zM11 15h3v1h-3zM16 15h2v1h-2zM20 15h1v1h-1zM23 15h1v1h-1zM25 15h1v1h-1zM27 15h1v1h-1zM0 16h3v1h-3zM5 16h2v1h-2zM8 16h1v1h-1zM11 16h3v1h-3zM15 16h2v1h-2zM18 16h1v1h-1zM20 16h2v1h-2zM0 17h4v1h-4zM5 17h1v1h-1zM12 17h1v1h-1zM14 17h1v1h-1zM18 17h1v1h-1zM22 17h3v1h-3zM28 17h1v1h-1zM2 18h3v1h-3zM6 18h3v1h-3zM10 18h1v1h-1zM14 18h2v1h-2zM20 18h1v1h-1zM23 18h1v1h-1zM26 18h1v1h-1zM28 18h1v1h-1zM4 19h2v1h-2zM7 19h1v1h-1zM9 19h1v1h-1zM12 19h2v1h-2zM15 19h6v1h-6zM28 19h1v1h-1zM0 20h5v1h-5zM6 20h1v1h-1zM9 20h1v1h-1zM11 20h2v1h-2zM17 20h1v1h-1zM20 20h6v1h-6zM27 20h2v1h-2zM8 21h1v1h-1zM10 21h1v1h-1zM13 21h4v1h-4zM19 21h2v1h-2zM24 21h1v1h-1zM26 21h3v1h-3zM0 22h7v1h-7zM12 22h1v1h-1zM15 22h1v1h-1zM17 22h1v1h-1zM19 22h2v1h-2zM22 22h1v1h-1zM24 22h1v1h-1zM28 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM12 23h1v1h-1zM15 23h1v1h-1zM17 23h1v1h-1zM19 23h2v1h-2zM24 23h2v1h-2zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM8 24h1v1h-1zM11 24h1v1h-1zM14 24h2v1h-2zM18 24h7v1h-7zM27 24h2v1h-2zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM9 25h1v1h-1zM12 25h2v1h-2zM16 25h1v1h-1zM18 25h1v1h-1zM23 25h1v1h-1zM27 25h1v1h-1zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM16 26h6v1h-6zM26 26h3v1h-3zM0 27h1v1h-1zM6 27h1v1h-1zM8 27h3v1h-3zM12 27h1v1h-1zM17 27h1v1h-1zM20 27h2v1h-2zM23 27h1v1h-1zM25 27h1v1h-1zM27 27h2v1h-2zM0 28h7v1h-7zM10 28h4v1h-4zM15 28h1v1h-1zM17 28h1v1h-1zM19 28h2v1h-2zM24 28h1v1h-1zM27 28h1v1h-1z";

interface QrCodeProps {
  className?: string;
  fg?: string;
  bg?: string;
  label?: string;
}

export default function QrCode({ className, fg = '#1c1917', bg = '#f4f1ed', label = 'QR code linking to modestmoron.tech/card' }: QrCodeProps) {
  return (
    <svg
      viewBox={`-1 -1 ${MODULES + 2} ${MODULES + 2}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
      className={className}
    >
      <rect x="-1" y="-1" width={MODULES + 2} height={MODULES + 2} fill={bg} />
      <path d={PATH} fill={fg} />
    </svg>
  );
}
