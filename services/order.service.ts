import Order, { PizzaStatus } from '../models/Order';

const backendUrl: string = 'http://localhost:8080/api';

const create = async (name: string, address: string, pizzas: string[]) => {
  return fetch(`${backendUrl}/order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ customer: { name, address }, pizzas }),
  }).then(response => response.json());
};

const getAllOrders = async () => {
  return fetch(`${backendUrl}/order`).then(response => response.json());
};

const getOrderById = async (orderId: string) => {
  return fetch(`${backendUrl}/order/${orderId}`).then(response =>
    response.json()
  );
};

const updateOrderStatus = async (order: Order, status: PizzaStatus) => {
  const promises = [];
  for (let i = 0; i < order.pizzas.length; i++) {
    promises.push(updateOrderedPizzaStatus(order._id, i, status));
  }
  return Promise.all(promises);
};

const updateOrderedPizzaStatus = async (
  orderId: string,
  index: number,
  status: PizzaStatus
) => {
  return fetch(`${backendUrl}/order/${orderId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ index, status }),
  }).then(response => response.json);
};

const orderService = {
  create,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updateOrderedPizzaStatus,
};

export default orderService;
