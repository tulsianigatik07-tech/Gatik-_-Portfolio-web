const activityLevels = Array.from({ length: 364 }, (_, index) => {
  const wave = Math.sin(index * 0.33) + Math.cos(index * 0.11);

  if (index % 37 === 0 || index % 53 === 0) return 4;
  if (wave > 1.15) return 3;
  if (wave > 0.45) return 2;
  if (wave > -0.25) return 1;
  return 0;
});

export function ContributionGraph() {
  return (
    <div className="contrib-grid" aria-label="Red GitHub contribution graph">
      {activityLevels.map((level, index) => (
        <span
          className={`contrib-cell l${level}`}
          key={`${level}-${index}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
