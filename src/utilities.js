export function secondsToHMS(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const remainder = totalSeconds % 3600;
  const time = [Math.floor(remainder / 60), remainder % 60]
    .map((val) => String(val).padStart(2, '0'))
    .join(':');
  return `${hours ? hours + ':' : ''}${time}`;
}

export function parameterize(string) {
  return string.toLowerCase().replace(/ /g, '-');
}
