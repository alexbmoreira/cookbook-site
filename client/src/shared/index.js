import withState from './withState';
import dateFormatter from './dateFormatter';
import timeFormatter from './timeFormatter';

const imageUrl = (category, filename) => {
  return `https://storage.googleapis.com/twos-company-cookbook/catalog/${category}/${filename}`;
}

export {
  imageUrl,
  withState,
  dateFormatter,
  timeFormatter
};
