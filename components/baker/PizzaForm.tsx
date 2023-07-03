import { PizzaStatus } from '../../models/Order';
import Pizza from '../../models/Pizza';
import orderService from '../../services/order.service';
import formatStatus from '../../utils/formatStatus';
import Button from '../base/Button';

type PizzaFormProps = {
  orderId: string;
  index: number;
  pizza: Pizza;
  status: PizzaStatus;
  onUpdate: () => void;
};

export default ({
  orderId,
  index,
  pizza,
  status,
  onUpdate,
}: PizzaFormProps) => {
  const updatePizza = (newStatus: PizzaStatus) => {
    if (newStatus === status) {
      return;
    }

    orderService
      .updateOrderedPizzaStatus(orderId, index, newStatus)
      .then(() => onUpdate());
  };

  return (
    <form className='bg-purple-200 p-4 rounded-tl-xl rounded-br-xl'>
      <div className='w-96 flex justify-between gap-2'>
        <p>{pizza.name}</p>

        <div className='flex gap-2'>
          <Button
            type='button'
            color={status === PizzaStatus.ordered ? 'primary' : 'secondary'}
            onClick={event => updatePizza(PizzaStatus.ordered)}
          >
            {formatStatus(PizzaStatus.ordered)}
          </Button>

          <Button
            type='button'
            color={status === PizzaStatus.oven ? 'primary' : 'secondary'}
            onClick={event => updatePizza(PizzaStatus.oven)}
          >
            {formatStatus(PizzaStatus.oven)}
          </Button>

          <Button
            type='button'
            color={status === PizzaStatus.ready ? 'primary' : 'secondary'}
            onClick={event => updatePizza(PizzaStatus.ready)}
          >
            {formatStatus(PizzaStatus.ready)}
          </Button>
        </div>
      </div>
    </form>
  );
};
