// import DataTable, { TableColumn } from 'react-data-table-component';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import pizzaService from '../../services/pizza.service';
import Button from '../../components/base/Button';
import MainContainer from '../../components/layout/MainContainer';
import MainTitle from '../../components/layout/MainTitle';

type Pizza = {
  _id: string;
  image: string;
  name: string;
  price: number;
};

export default () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    pizzaService.getAll().then(pizzas => setPizzas(pizzas));
  }, [setPizzas]);

  const columnHelper = createColumnHelper<Pizza>();

  const columns = [
    columnHelper.accessor('_id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('price', {
      header: 'Price',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: pizzas,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <MainContainer>
      <MainTitle underline>Pizzas</MainTitle>

      <Button
        href='/pizzas/create'
        color='secondary'
        size='large'
        showShadow
        showActive
        showHover
      >
        Create Pizza
      </Button>

      <table>
        <thead className='text-purple-700'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className='px-2'
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className='px-2'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </MainContainer>
  );
};
