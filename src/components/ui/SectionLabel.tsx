export function SectionLabel({ index, children }: { index?: string; children: string }) {
  return (
    <div className="flex items-center gap-4 text-label text-muted-foreground">
      {index ? <span className="text-ember">{index}</span> : null}
      <span>{children}</span>
      <span className="hairline hidden h-px flex-1 sm:block" />
    </div>
  );
}
