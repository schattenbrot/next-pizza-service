import Pizza from './Pizza';

export enum PizzaStatus {
  ordered,
  oven,
  ready,
  delivering,
  done,
}

export type OrderedPizza = {
  _id: string;
  pizza: Pizza;
  status: PizzaStatus;
};

type Order = {
  _id: string;
  customer: {
    name: string;
    address: string;
  };
  pizzas: OrderedPizza[];
};

export default Order;
