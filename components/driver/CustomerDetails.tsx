type CustomerDetailsProps = {
  customer: {
    name: string;
    address: string;
  };
};

export default ({ customer }: CustomerDetailsProps) => {
  return (
    <div className='bg-purple-200 px-8 py-4 rounded-tl-2xl rounded-br-2xl'>
      <h3 className='text-purple-700 font-semibold text-2xl'>
        Customer Details
      </h3>
      <p className='relative'>
        Name: <span className='absolute right-0'>{customer.name}</span>
      </p>
      <p className='relative'>
        Address: <span className='absolute right-0'>{customer.address}</span>
      </p>
    </div>
  );
};
