import { NextPage } from 'next';
import { FormEventHandler, useEffect, useState } from 'react';
import pizzaService from '../services/pizza.service';
import Image from 'next/image';
import Pizza from '../models/Pizza';
import Button from '../components/base/Button';
import MainContainer from '../components/layout/MainContainer';
import MainTitle from '../components/layout/MainTitle';
import ShoppingCart from '../components/order/ShoppingCart';
import PizzaList from '../components/order/PizzaList';

const OrderPage: NextPage = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [shoppingCart, setShoppingCart] = useState<
    { pizza: Pizza; amount: number }[]
  >([]);

  useEffect(() => {
    pizzaService.getAll().then(pizzas => setPizzas(pizzas));
  }, [setPizzas]);

  const addPizza = (pizza: Pizza) => {
    setShoppingCart(prev => {
      if (!prev.find(p => p.pizza._id === pizza._id)) {
        return [...prev, { pizza, amount: 0 }];
      }
      return [...prev].map(prevPizza => {
        if (prevPizza.pizza._id === pizza._id)
          return { pizza: prevPizza.pizza, amount: prevPizza.amount + 1 };
        return prevPizza;
      });
    });
  };

  const removePizza = (pizzaId: string) => {
    setShoppingCart(prev => prev.filter(p => p.pizza._id !== pizzaId));
  };

  const resetShoppingCart: FormEventHandler = event => {
    event.preventDefault();
    setShoppingCart([]);
  };

  return (
    <MainContainer>
      <MainTitle underline>Order Pizza</MainTitle>

      <div className='flex flex-col justify-center items-center gap-4'>
        <PizzaList
          pizzas={pizzas}
          onAddPizza={addPizza}
        />

        <ShoppingCart
          shoppingCart={shoppingCart}
          onRemovePizza={removePizza}
          onResetShoppingCart={resetShoppingCart}
        />
      </div>
    </MainContainer>
  );
};

export default OrderPage;
