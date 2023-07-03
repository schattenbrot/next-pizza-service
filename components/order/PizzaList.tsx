import Image from 'next/image';
import Pizza from '../../models/Pizza';
import Button from '../base/Button';

type PizzaListProps = {
  pizzas: Pizza[];
  onAddPizza: (pizza: Pizza) => void;
};

export default ({ pizzas, onAddPizza }: PizzaListProps) => {
  return (
    <>
      <h2 className='text-purple-700 font-bold text-2xl'>Food list</h2>
      <div className='flex gap-4'>
        {!pizzas && <div className='lds-dual-ring'></div>}
        {pizzas &&
          pizzas.map(pizza => (
            <div
              className='w-56 h-40 text-xl bg-purple-200 rounded-tl-3xl rounded-br-3xl shadow-lg hover:-translate-y-1 hover:translate-x-1 hover:shadow-xl'
              key={pizza._id}
            >
              <div className='h-2/4 w-full rounded-tl-3xl p-1'>
                <div className='relative h-full w-full'>
                  <Image
                    className='rounded-tl-3xl'
                    src='/uwu_pizza.png'
                    alt='uwu pizza'
                    fill
                  ></Image>
                </div>
              </div>
              <div className='relative h-2/4 w-full p-2'>
                <p>{pizza.name}</p>
                <p className='absolute top-2 right-2'>{pizza.price}€</p>
                <Button
                  onClick={() => onAddPizza(pizza)}
                  styles='absolute bottom-2 right-2'
                  showActive
                  showShadow
                >
                  Order
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
