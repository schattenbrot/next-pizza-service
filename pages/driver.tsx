import { useEffect, useState } from 'react';
import MainContainer from '../components/layout/MainContainer';
import MainTitle from '../components/layout/MainTitle';
import Order, { PizzaStatus } from '../models/Order';
import orderService from '../services/order.service';
import LoadingSpinner from '../components/base/LoadingSpinner';
import CustomerDetails from '../components/driver/CustomerDetails';
import OrderDetails from '../components/driver/OrderDetails';
import Button from '../components/base/Button';
import formatStatus from '../utils/formatStatus';

export default () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    onUpdate();
  }, [setOrders]);

  const onUpdate = () => {
    orderService
      .getAllOrders()
      .then((orders: Order[]) =>
        setOrders(
          orders.filter(order =>
            order.pizzas.every(
              pizza =>
                pizza.status === PizzaStatus.ready ||
                pizza.status === PizzaStatus.delivering
            )
          )
        )
      );
  };

  useEffect(() => console.log(orders), [orders]);

  const updateOrder = (order: Order, newStatus: PizzaStatus) => {
    orderService.updateOrderStatus(order, newStatus).then(() => onUpdate());
  };

  return (
    <MainContainer>
      <MainTitle underline>Driver</MainTitle>

      {!orders && <LoadingSpinner />}

      {orders &&
        orders.map(order => (
          <div
            key={order._id}
            className='px-8 py-4 bg-purple-700 rounded-tl-2xl rounded-br-2xl'
          >
            <h2 className='text-purple-200 font-semibold text-xl'>
              Order - {order._id}
            </h2>

            <div className='grid grid-cols-2 gap-4 pb-4'>
              <CustomerDetails customer={order.customer} />
              <OrderDetails pizzas={order.pizzas} />
            </div>

            <form className='flex justify-end gap-4'>
              <Button
                type='button'
                color={
                  order.pizzas[0].status === PizzaStatus.ready
                    ? 'secondary'
                    : 'primary'
                }
                onClick={event => updateOrder(order, PizzaStatus.ready)}
              >
                {formatStatus(PizzaStatus.ready)}
              </Button>

              <Button
                type='button'
                color={
                  order.pizzas[0].status === PizzaStatus.delivering
                    ? 'secondary'
                    : 'primary'
                }
                onClick={event => updateOrder(order, PizzaStatus.delivering)}
              >
                {formatStatus(PizzaStatus.delivering)}
              </Button>

              <Button
                type='button'
                color={
                  order.pizzas[0].status === PizzaStatus.done
                    ? 'secondary'
                    : 'primary'
                }
                onClick={event => updateOrder(order, PizzaStatus.done)}
              >
                {formatStatus(PizzaStatus.done)}
              </Button>
            </form>
          </div>
        ))}
    </MainContainer>
  );
};
