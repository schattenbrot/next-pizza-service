import { ReactNode } from 'react';

type MainContainerProps = {
  children: ReactNode;
};

export default ({ children }: MainContainerProps) => {
  return (
    <main className='p-4 flex flex-col justify-center items-center gap-4'>
      {children}
    </main>
  );
};
