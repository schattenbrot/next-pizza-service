const backendUrl: string = 'http://localhost:8080/api';

const getAll = async () => {
  return fetch(`${backendUrl}/pizza`).then(response => response.json());
};

const create = async (name: string, price: number, image: string) => {
  return fetch(`${backendUrl}/pizza`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, price, image }),
  });
};

const pizzaService = {
  getAll,
  create,
};

export default pizzaService;
