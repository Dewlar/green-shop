import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useStateContext } from '../../state/state-context';

const CartIcon = () => {
  const { totalLineItemQuantity } = useStateContext();

  return (
    <div className="group -m-2 flex items-center p-2">
      <ShoppingCartIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-600" aria-hidden="true" />
      {totalLineItemQuantity > 0 ? (
        <span className="ml-2 text-sm font-medium text-white bg-green-500 rounded-full w-6 h-6 flex items-center justify-center group-hover:bg-green-700">
          {totalLineItemQuantity}
        </span>
      ) : (
        <span className="ml-2 text-sm font-medium text-gray-500 group-hover:text-gray-600">
          {totalLineItemQuantity}
        </span>
      )}
      <span className="sr-only">items in cart, view bag</span>
    </div>
  );
};

export default CartIcon;
