import { spread } from "@/utils/spread";

const foamCount = 16;
const fizzCount = 36;

const foam = Array.from({ length: foamCount }, (_, index) => ({
  left: (index / (foamCount - 1)) * 100,
  top: Math.round(spread(index, 3.1) * 14),
  size: 28 + Math.round(spread(index, 1.7) * 28),
  delay: Math.round(spread(index, 5.3) * 1200),
}));

const fizz = Array.from({ length: fizzCount }, (_, index) => ({
  left: Math.round(spread(index, 1) * 98),
  size: 4 + Math.round(spread(index, 3.7) ** 2 * 10),
  duration: 1.6 + spread(index, 5.3) * 2.4,
  delay: spread(index, 2.9) * 2,
}));

/**
 * A beer that is poured into the parent while it is hovered: it fills up
 * and develops a foamy head, with bubbles rising through it.
 * The parent needs the `group` and `relative` classes, and `overflow-hidden`.
 */
function BeerFill() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 translate-y-[130%] duration-[1400ms] ease-out group-hover:translate-y-[18%] motion-reduce:duration-0"
    >
      <span className="absolute inset-0 bg-amber-500" />
      <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
      {fizz.map(({ left, size, duration, delay }, index) => (
        <span
          key={index}
          className="absolute bottom-0 rounded-full bg-[#F4F0EA]/50 opacity-0 group-hover:animate-fizz motion-reduce:animate-none"
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}
      {/* Foam head: a band with a bumpy, bobbing edge on both sides */}
      <span className="absolute inset-x-0 top-0 h-3 bg-[#F4F0EA]" />
      {foam.map(({ left, top, size, delay }, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-[#F4F0EA] group-hover:animate-foam-bob motion-reduce:animate-none"
          style={{
            left: `${left}%`,
            top: top,
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
            animationDelay: `${delay}ms`,
          }}
        />
      ))}
    </span>
  );
}

export default BeerFill;
