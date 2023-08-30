import { Archive } from '../../features/order/types/archive.enum';

export const archiveTransform = (value): Archive => {
  if (value === true) return Archive.true;
  return Archive.false;
};
