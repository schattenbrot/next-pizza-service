import { ReactNode } from 'react';

type MainTitleProps = {
  underline?: boolean;
  children: ReactNode;
};

export default ({ underline, children }: MainTitleProps) => {
  return (
    <h1
      className={`text-purple-700 font-bold text-3xl mb-4${
        underline ? ' underline' : ''
      }`}
    >
      {children}
    </h1>
  );
};
