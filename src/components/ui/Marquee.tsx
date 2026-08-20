export function Marquee({ words }: { words: string[] }) {
  const line = [...words, ...words];
  return (
    <div className="hairline-y overflow-hidden py-5">
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10 text-label text-muted-foreground">
            {w}
            <span className="h-1 w-1 rounded-full bg-ember" />
          </span>
        ))}
      </div>
    </div>
  );
}
