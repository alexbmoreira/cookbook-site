export function timeFormatter(time) {
  const hours = Math.floor(time / 60);
  const minutes = time - (hours * 60);

  return { hours, minutes };
}

export function durationToISO8601(hours, minutes) {
  const hoursString = hours ? `${hours}H` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `PT${hoursString}${minutesString}`;
}
