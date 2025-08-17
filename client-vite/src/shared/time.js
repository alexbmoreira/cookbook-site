export function timeFormatter(time) {
  const hours = Math.floor(time / 60);
  const minutes = time - (hours * 60);

  return { hours, minutes };
}

export function durationToISO8601(timeInMinutes) {
  if (!timeInMinutes) return '';
  
  const hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes - (hours * 60);
  
  const hoursString = hours ? `${hours}H` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `PT${hoursString}${minutesString}`;
}
