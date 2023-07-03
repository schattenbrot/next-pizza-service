import { useEffect, useState } from 'react';
import MainContainer from '../components/layout/MainContainer';
import MainTitle from '../components/layout/MainTitle';
import orderService from '../services/order.service';
import Order, { PizzaStatus } from '../models/Order';
import PizzaForm from '../components/baker/PizzaForm';
import LoadingSpinner from '../components/base/LoadingSpinner';

export default () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    handleOrdersUpdated();
  }, []);

  const handleOrdersUpdated = () => {
    orderService
      .getAllOrders()
      .then((orders: Order[]) =>
        setOrders(
          orders.filter(
            order =>
              !order.pizzas.every(
                pizza => pizza.status === PizzaStatus.ready
              ) &&
              !order.pizzas.every(
                pizza => pizza.status === PizzaStatus.delivering
              ) &&
              !order.pizzas.every(pizza => pizza.status === PizzaStatus.done)
          )
        )
      );
  };

  return (
    <MainContainer>
      <MainTitle underline>Baker</MainTitle>

      {!orders && <LoadingSpinner />}

      {orders && (
        <div className='flex flex-col gap-4'>
          {orders.map(order => (
            <div
              key={order._id}
              className='flex flex-col gap-4 px-8 py-4 bg-purple-700 rounded-tl-xl rounded-br-xl'
            >
              <p className='text-purple-200 font-semibold'>
                Order - {order._id}
              </p>

              {order.pizzas.map((orderedPizza, index) => (
                <PizzaForm
                  key={`${order._id}-${index}`}
                  orderId={order._id}
                  index={index}
                  pizza={orderedPizza.pizza}
                  status={orderedPizza.status}
                  onUpdate={handleOrdersUpdated}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </MainContainer>
  );
};
