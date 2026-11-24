// Pre-configured drop positions, heights, speeds, and delays for a natural rain feel
const DROPS = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  left: `${(i * 2.9) % 100}%`,
  height: `${14 + (i % 4) * 8}px`,
  duration: `${1.4 + (i % 5) * 0.35}s`,
  delay: `${(i % 7) * 0.3}s`,
  hideOnMobile: i % 2 === 1, // Show ~18 drops on mobile, all 35 on tablet/desktop
}));

export default function HeaderRain() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-28 bottom-0 z-0 overflow-hidden md:top-16">
      {DROPS.map((drop) => (
        <span
          key={drop.id}
          className={`rain-drop ${drop.hideOnMobile ? "hidden sm:block" : ""}`}
          style={{
            left: drop.left,
            height: drop.height,
            animationDuration: drop.duration,
            animationDelay: drop.delay,
          }}
        />
      ))}
    </div>
  );
}
