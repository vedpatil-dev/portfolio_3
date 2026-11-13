import Compass from "@/src/components/map/Compass";
import TiltCard from "@/src/components/home/TiltCard";
import { LOCATION } from "@/src/lib/location";

export interface RoutePin {
  label: string;
  detail: string;
}

// Why: the hero needs a cartographic focal point that also tells the visitor something real.
// Impact: a small map sheet that plots career milestones (all from existing data) as pins on a dashed route.
export default function HeroMap({ pins }: { pins: RoutePin[] }) {
  return (
    <TiltCard className="relative">
      <figure
        className="map-content-card p-6 md:p-8"
        aria-label={`Career route map, ${LOCATION.city}`}
      >
        <Compass className="absolute top-4 right-4 w-16 h-16 text-ink-faded" />
        <figcaption className="eyebrow">Route · {LOCATION.city}, {LOCATION.country}</figcaption>
        <p className="font-handwritten text-lg text-ink-faded mt-1">
          {LOCATION.lat} · {LOCATION.lon}
        </p>

        <ol className="relative mt-8 space-y-7 pl-9">
          <span aria-hidden="true" className="absolute left-[0.7rem] top-2 bottom-2 border-l-2 border-dashed border-blood-ink/50" />
          {pins.map((pin, i) => (
            <li key={pin.label} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-9 top-1 w-[1.4rem] h-[1.4rem] rounded-full border-2 flex items-center justify-center text-[0.7rem] font-bold ${
                  i === pins.length - 1
                    ? "bg-blood-ink border-gold text-parchment-light"
                    : "bg-parchment-light border-rust text-rust"
                }`}
              >
                {i === pins.length - 1 ? "X" : i + 1}
              </span>
              <p className="font-serif font-semibold text-leather leading-snug">{pin.label}</p>
              <p className="text-sm text-ink-faded">{pin.detail}</p>
            </li>
          ))}
        </ol>
        <p className="font-handwritten text-lg text-blood-ink mt-6">X marks where I am now.</p>
      </figure>
    </TiltCard>
  );
}
