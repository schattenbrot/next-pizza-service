import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import MainContainer from '../components/layout/MainContainer';
import MainTitle from '../components/layout/MainTitle';

const Home: NextPage = () => {
  const pages: { link: string; text: string }[] = [
    {
      link: '/order',
      text: 'Order',
    },
    {
      link: '/baker',
      text: 'Baker',
    },
    {
      link: '/driver',
      text: 'Driver',
    },
    {
      link: '/pizzas',
      text: 'Pizzas',
    },
    {
      link: '/pizzas/create',
      text: 'Create Pizza',
    },
  ];

  return (
    <>
      <div className='w-full h-{384px}'>
        <Image
          src='/uwu_pizza.png'
          width={1000}
          height={384}
          className='mx-auto'
          alt={'uwu_pizza image'}
        ></Image>
      </div>
      <MainContainer>
        <MainTitle>Welcome to UwU Pizza~!</MainTitle>

        <div className='flex flex-wrap gap-4'>
          {pages.map(page => (
            <Link
              key={page.link}
              href={page.link}
              className='grid place-content-center w-56 h-40 font-semibold text-xl bg-purple-200 rounded-tl-3xl rounded-br-3xl'
            >
              {page.text}
            </Link>
          ))}
        </div>
      </MainContainer>
    </>
  );
};

export default Home;
