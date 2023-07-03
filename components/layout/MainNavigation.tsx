import Image from 'next/image';
import Link from 'next/link';
import Button from '../base/Button';
import { useState } from 'react';

export default () => {
  const [showPizzaDropdown, setShowPizzaDropdown] = useState(false);
  const [showPizzaDropdownTimeout, setShowPizzaDropdownTimeout] =
    useState<NodeJS.Timeout>();

  const handleShowPizzaDropdown = () => {
    setShowPizzaDropdown(true);
    clearTimeout(showPizzaDropdownTimeout);
    setShowPizzaDropdownTimeout(undefined);
  };

  const handleHidePizzaDropdown = () => {
    const timeeout = setTimeout(() => {
      setShowPizzaDropdown(false);
      setShowPizzaDropdownTimeout(undefined);
    }, 500);
    setShowPizzaDropdownTimeout(timeeout);
  };

  return (
    <header className='flex justify-between gap-4 h-14 w-full bg-purple-200'>
      <Link
        href='/'
        className='relative h-15 w-32'
      >
        <Image
          src='/uwu_pizza.png'
          alt='UwU Pizza Logo'
          fill
        ></Image>
      </Link>

      <ul className='p-2 flex items-center gap-4 text-xl'>
        <li>
          <Button
            href='/order'
            size='large'
            showActive
          >
            Order
          </Button>
        </li>
        <li className='relative'>
          <Button
            href='/pizzas'
            size='large'
            showActive
            onMouseEnter={handleShowPizzaDropdown}
            onMouseLeave={handleHidePizzaDropdown}
          >
            Pizza
          </Button>
          {showPizzaDropdown && (
            <ul
              className='absolute top-10 -left-1/2 w-40 flex flex-col gap-4 px-2 py-4 bg-purple-200 items-center justify-center'
              onMouseEnter={handleShowPizzaDropdown}
              onMouseLeave={handleHidePizzaDropdown}
            >
              <li>
                <Button
                  href='/pizzas'
                  size='large'
                  showActive
                >
                  All Pizzas
                </Button>
              </li>

              <li>
                <Button
                  href='/pizzas/create'
                  size='large'
                  showActive
                >
                  New Pizza
                </Button>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Button
            href='/baker'
            size='large'
            showActive
          >
            Baker
          </Button>
        </li>

        <li>
          <Button
            href='/driver'
            size='large'
            showActive
          >
            Driver
          </Button>
        </li>
      </ul>
    </header>
  );
};
