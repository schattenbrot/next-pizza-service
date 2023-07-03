import { PizzaStatus } from '../models/Order';

export default (status: PizzaStatus) => {
  if (status === PizzaStatus.ordered) return 'ordered';
  if (status === PizzaStatus.oven) return 'oven';
  if (status === PizzaStatus.ready) return 'ready';
  if (status === PizzaStatus.delivering) return 'delivering';
  return 'done';
};
