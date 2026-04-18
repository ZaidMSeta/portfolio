export function getTechColour(label: string) {
  let hash = 0;

  for (let i = 0; i < label.length; i++) {
    hash = label.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }

  const hue = Math.abs(hash) % 360;

  const bg = `hsla(${hue}, 70%, 60%, var(--badge-opacity, 0.12))`;
  const text = `hsl(${hue}, var(--badge-sat, 70%), var(--badge-lit, 72%))`;

  return { bg, text };
}
