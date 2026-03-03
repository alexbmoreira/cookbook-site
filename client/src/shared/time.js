export function timeFormatter(time) {
  const hours = Math.floor(time / 60);
  const minutes = time - (hours * 60);

  return { hours, minutes };
}

export function durationToISO8601(totalMinutes) {
  if (!totalMinutes) return '';
  const { hours, minutes } = timeFormatter(totalMinutes);
  const hoursString = hours ? `${hours}H` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `PT${hoursString}${minutesString}`;
}
