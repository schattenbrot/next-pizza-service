import { OrderedPizza } from '../../models/Order';
import formatStatus from '../../utils/formatStatus';

type OrderedPizzaProps = {
  pizzas: OrderedPizza[];
};

export default ({ pizzas }: OrderedPizzaProps) => {
  return (
    <div className='w-96 bg-purple-200 px-8 py-4 rounded-tl-2xl rounded-br-2xl'>
      <h3 className='text-purple-700 font-semibold text-2xl'>Order Details</h3>

      <ul>
        {pizzas.map(orderedPizza => (
          <li
            className='grid grid-cols-3 w-full max-w-2xl'
            key={orderedPizza._id}
          >
            <p>{orderedPizza.pizza.name}</p>
            <p className='text-right'>{formatStatus(orderedPizza.status)}</p>
            <p className='text-right'>{orderedPizza.pizza.price}€</p>
          </li>
        ))}
        <li
          className='flex justify-between border-t-2 border-black'
          key='total'
        >
          <p>Total</p>
          <p>
            {pizzas
              .reduce((acc, pizza) => acc + pizza.pizza.price, 0)
              .toFixed(2)}
            €
          </p>
        </li>
      </ul>
    </div>
  );
};
