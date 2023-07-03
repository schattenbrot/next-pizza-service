import Link from 'next/link';

export default () => {
  return (
    <footer className='grid min-h-[4rem] place-content-center bg-purple-200 text-purple-700'>
      <p>
        Powered by{' '}
        <Link
          href='https://www.schattenbrot.com'
          className='font-semibold'
        >
          Schattenbrot
        </Link>
      </p>
    </footer>
  );
};
