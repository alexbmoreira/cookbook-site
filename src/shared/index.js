import withState from './withState';
import timeFormatter from './timeFormatter';

const imageUrl = (category, filename) => {
  return `https://storage.cloud.google.com/twos-company-cookbook/catalog/${category}/${filename}`;
}

export {
  imageUrl,
  withState,
  timeFormatter
};
