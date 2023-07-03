import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import orderService from '../services/order.service';
import Order from '../models/Order';
import MainContainer from '../components/layout/MainContainer';
import MainTitle from '../components/layout/MainTitle';
import LoadingSpinner from '../components/base/LoadingSpinner';
import CustomerDetails from '../components/myOrder/CustomerDetails';
import OrderDetails from '../components/myOrder/OrderDetails';

export default () => {
  const router = useRouter();

  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const orderId = router.query.orderId as string;
    if (orderId) {
      orderService.getOrderById(orderId).then(order => setOrder(order));
    }
  }, [setOrder, router.query.orderId]);

  return (
    <MainContainer>
      <MainTitle underline>Your Order</MainTitle>

      {!order && <LoadingSpinner />}
      {order && (
        <>
          <CustomerDetails customer={order.customer} />
          {/* <div className='bg-purple-200 px-8 py-4 rounded-tl-2xl rounded-br-2xl'>
            <h2 className='text-purple-700 font-semibold text-2xl'>
              Customer Details
            </h2>
            <p className='relative'>
              Name:{' '}
              <span className='absolute right-0'>{order.customer.name}</span>
            </p>
            <p className='relative'>
              Address:{' '}
              <span className='absolute right-0'>{order.customer.address}</span>
            </p>
          </div> */}

          <OrderDetails pizzas={order.pizzas} />
          {/* <ul className='w-96 bg-purple-200 px-8 py-4 rounded-tl-2xl rounded-br-2xl'>
            {order.pizzas.map(orderedPizza => (
              <li
                className='grid grid-cols-3 w-full max-w-2xl'
                key={orderedPizza._id}
              >
                <p>{orderedPizza.pizza.name}</p>
                <p className='text-right'>
                  {formatStatus(orderedPizza.status)}
                </p>
                <p className='text-right'>{orderedPizza.pizza.price}€</p>
              </li>
            ))}
            <li
              className='flex justify-between border-t-2 border-black'
              key='total'
            >
              <p>Total</p>
              <p>
                {order.pizzas
                  .reduce((acc, pizza) => acc + pizza.pizza.price, 0)
                  .toFixed(2)}
                €
              </p>
            </li>
          </ul> */}
        </>
      )}
    </MainContainer>
  );
};
