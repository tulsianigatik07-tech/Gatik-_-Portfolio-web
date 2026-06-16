type DividerProps = {
  variant: "signal" | "convergence";
};

export function Divider({ variant }: DividerProps) {
  if (variant === "signal") {
    return (
      <div className="divider-wrap" aria-hidden="true">
        <svg
          className="divider-signal"
          viewBox="0 0 1200 32"
          preserveAspectRatio="none"
        >
          <path
            className="sig-line"
            d="M0 16 H486 L508 7 L532 25 L556 7 L580 25 L604 16 H1200"
          />
          <circle className="sig-node sig-node-one" cx="508" cy="7" r="2.2" />
          <circle className="sig-node sig-node-two" cx="556" cy="7" r="2.2" />
          <circle
            className="sig-node sig-node-three"
            cx="604"
            cy="16"
            r="2.2"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="divider-wrap" aria-hidden="true">
      <svg
        className="divider-convergence"
        viewBox="0 0 1200 32"
        preserveAspectRatio="none"
      >
        <line className="conv-line" x1="0" y1="16" x2="578" y2="16" />
        <line className="conv-line" x1="622" y1="16" x2="1200" y2="16" />
        <circle className="conv-dot" cx="600" cy="16" r="2.8" />
        <circle className="conv-ring" cx="600" cy="16" r="8" />
        <circle className="conv-traveller conv-left" cx="0" cy="16" r="2" />
        <circle className="conv-traveller conv-right" cx="1200" cy="16" r="2" />
      </svg>
    </div>
  );
}
