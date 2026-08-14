function pad(s: string | number, w: number) {
  return String(s).padEnd(w, ' ');
}
/** cols: 每列是 string[]（含表头或数据行） */
export function printTable(headers: string[], cols: any[][][], title?:string) {
  const widths = headers.map((h, i) =>
    Math.max(h.length, ...cols[i].map((c) => String(c).length), 1)
  );
  const joinRow = (cells: string[]) =>
    cells.map((c, i) => pad(c, widths[i])).join(' | ');
  const th = joinRow(headers);
  const sep = widths.map((w) => '-'.repeat(w)).join('-+-');
  const body = cols[0].map((_, r) => 
    joinRow(cols.map((col) => col[r]?.join(',') ?? '')
  ));
  console.log([title ? title + '\n'+ th: th, sep, ...body].join('\n'));
}