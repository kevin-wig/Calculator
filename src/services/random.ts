import { get } from '../shared/api';

export const loadRandomNumber = (): Promise<string> => {
  return get(`integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new`);
};
