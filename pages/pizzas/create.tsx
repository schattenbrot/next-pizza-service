import { FormEventHandler, useState } from 'react';
import pizzaService from '../../services/pizza.service';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';
import MainContainer from '../../components/layout/MainContainer';
import MainTitle from '../../components/layout/MainTitle';

export default () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');

  const createPizza: FormEventHandler = event => {
    event.preventDefault();

    if (!name || !price || !image) {
      return;
    }

    pizzaService.create(name, Number(price), image);
  };

  return (
    <MainContainer>
      <MainTitle underline>Create Pizza</MainTitle>

      <form
        className='flex flex-col gap-2'
        onSubmit={createPizza}
      >
        <Input
          label={'Name'}
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <Input
          label={'Price'}
          value={`${price}`}
          onChange={event =>
            setPrice(
              !isNaN(Number(event.target.value))
                ? Number(event.target.value)
                : 0
            )
          }
        />

        <Input
          label={'Image'}
          value={image}
          onChange={event => setImage(event.target.value)}
        />

        <Button
          type='submit'
          color='secondary'
          showShadow
          showHover
          showActive
        >
          Create
        </Button>
      </form>
    </MainContainer>
  );
};
