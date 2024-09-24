import React, { useEffect } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { ClientResponse, ClientResult } from '@commercetools/sdk-client-v2';
import { Cart } from '@commercetools/platform-sdk';
import { useStateContext } from '../../state/state-context';
import { getBasket } from '../../api/basket/BasketRepository';

const CartIcon = () => {
  const { totalLineItemQuantity, setTotalLineItemQuantity } = useStateContext();

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const response: ClientResponse<Cart | ClientResult> = await getBasket();

        if ('body' in response && response.body && 'totalLineItemQuantity' in response.body) {
          setTotalLineItemQuantity(response.body.totalLineItemQuantity ?? 0);
        }
      } catch (error) {
        console.error('Failed to fetch basket:', error);
      }
    };

    fetchBasket();
  }, []);

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
