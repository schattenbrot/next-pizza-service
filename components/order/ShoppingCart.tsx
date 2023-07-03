import { FormEvent, FormEventHandler, useState } from 'react';
import Pizza from '../../models/Pizza';
import Button from '../base/Button';
import orderService from '../../services/order.service';
import router from 'next/router';
import Input from '../base/Input';

type ShoppingCartProps = {
  shoppingCart: { pizza: Pizza; amount: number }[];
  onRemovePizza: (pizzaId: string) => void;
  onResetShoppingCart: (event: FormEvent) => void;
};

export default ({
  shoppingCart,
  onRemovePizza,
  onResetShoppingCart,
}: ShoppingCartProps) => {
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');

  const orderPizzas: FormEventHandler = event => {
    event.preventDefault();

    if (!name.trim() || !address.trim() || !shoppingCart.length) return;

    orderService
      .create(
        name,
        address,
        shoppingCart.flatMap(item =>
          new Array(item.amount).fill(item.pizza._id)
        )
      )
      .then(order =>
        router.push({ pathname: '/my-order', query: { orderId: order._id } })
      );
  };

  return (
    <div className='w-full max-w-2xl flex flex-col items-center gap-4'>
      <h2 className='text-purple-700 font-bold text-2xl'>Shopping cart</h2>

      <div className='flex flex-col w-full gap-2'>
        {shoppingCart.map((pizza, idx) => (
          <div
            key={idx}
            className='flex p-2 border-b bg-purple-200 rounded-tl-3xl rounded-br-3xl'
          >
            <div className='relative w-full flex justify-between items-center pr-2'>
              <p>{pizza.pizza.name}</p>
              <p className='absolute left-1/2'>Amount: {pizza.amount}</p>
              <p>{pizza.pizza.price}€</p>
            </div>
            <div>
              <Button
                showActive
                showShadow
                showHover
                onClick={() => onRemovePizza(pizza.pizza._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className='font-bold text-purple-700'>
        Total price:{' '}
        {shoppingCart
          .map(pizza => pizza.pizza.price)
          .reduce((accumulator, curr) => curr + accumulator, 0)}
        €
      </p>

      <form
        className='flex flex-col gap-4'
        onSubmit={orderPizzas}
        onReset={onResetShoppingCart}
      >
        <Input
          label={'Name'}
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          label={'Address'}
          value={address}
          onChange={event => setAddress(event.target.value)}
        />

        <div className='flex flex-row-reverse gap-4'>
          <Button
            type='submit'
            showActive
            showShadow
            showHover
          >
            Order
          </Button>

          <Button
            type='reset'
            showActive
            showShadow
            showHover
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
