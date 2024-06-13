import React, { useEffect, useState } from 'react';
import { XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';
import { Cart, CentPrecisionMoney, LineItem } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import {
  clearBasket,
  deleteProductInBasket,
  getLineItemsFromBasket,
  getTotalPrice,
  updateBasketQuantityProduct,
} from '../../api/basket/BasketRepository';
import { formatPriceInEuro } from '../../api/helpers';

const BasketForm = () => {
  const [totalPrice, setTotalPrice] = useState<CentPrecisionMoney | undefined>();
  const [promoCodePrice, setPromoCodePrice] = useState<number>();
  const [orderPrice, setOrderPrice] = useState<number>();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [isAppliedPromoCode, setIsAppliedPromoCode] = useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const discountFixed = 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(1);

  const handleQuantityChange = async (
    productId: string,
    currentQuantity: number,
    operation: 'increment' | 'decrement'
  ) => {
    try {
      if (currentQuantity === undefined) {
        return;
      }

      let newQuantity;
      if (operation === 'increment') {
        newQuantity = currentQuantity + 1;
      } else if (operation === 'decrement') {
        newQuantity = Math.max(currentQuantity - 1, 1);
      }

      if (newQuantity) {
        const response = await updateBasketQuantityProduct({
          productId,
          quantity: newQuantity,
        });
        setQuantityProduct(newQuantity);

        console.log('Quantity updated successfully:', response);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleClearBasketClick = async () => {
    try {
      const response = await clearBasket();
      setLineItems((response as ClientResponse<Cart>).body?.lineItems ?? []);
    } catch (error) {
      toast.error('Error removing product from cart.');
    }
    setIsModalOpen(false);
  };

  const handleRemoveProductClick = async (productId: string, quantity: number) => {
    try {
      const response = await deleteProductInBasket({ productId, quantity });
      setLineItems((response as ClientResponse<Cart>).body?.lineItems ?? []);
    } catch (error) {
      toast.error('Error removing product from cart.');
    }
  };

  const handlePromoCodeClick = () => {
    if (isPromoValid) {
      setIsAppliedPromoCode(true);
      setPromoCodePrice(8.32);
    }
  };

  const handlePromoChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPromoCode(input);
    setIsAppliedPromoCode(false);

    if (input.trim().toUpperCase() === 'CODE') {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: LineItem[] = await getLineItemsFromBasket();
        setLineItems(response);
      } catch (error) {
        toast.error('Error adding product to cart.');
      }
    };

    fetchProducts();
  }, [quantityProduct]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: CentPrecisionMoney | undefined = await getTotalPrice();
        setTotalPrice(response);
        setOrderPrice((response?.centAmount ?? 0) - discountFixed - (promoCodePrice ?? 0));
      } catch (error) {
        toast.error('Error adding product to cart.');
      }
    };

    fetchProducts();
  }, [lineItems, promoCodePrice, quantityProduct]);

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
          {lineItems.length > 0 && (
            <button
              type="button"
              className="text-base font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 float-right mb-4"
              onClick={() => setIsModalOpen(true)}
            >
              Clear Cart
            </button>
          )}
        </>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {lineItems.length === 0 ? (
                <div className="text-center py-6 sm:py-10">
                  <p className="text-lg font-medium text-gray-700">Your cart is empty</p>
                  <a
                    href="/catalog"
                    className="mt-4 inline-block rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white hover:bg-green-700"
                  >
                    Start shopping
                  </a>
                </div>
              ) : (
                lineItems.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.variant?.images?.[0]?.url || ''}
                        alt={product.name.en}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href={`/product/${product?.productSlug?.en}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.name.en}
                              </a>
                            </h3>
                          </div>
                          <div className="mt-1 flex text-sm">
                            {(product.variant?.attributes?.find((attr) => attr.name === 'Size')?.value[0] || '') && (
                              <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
                                {product.variant?.attributes?.find((attr) => attr.name === 'Size')?.value[0] || ''}
                              </p>
                            )}
                          </div>

                          {product.variant?.prices?.[0]?.discounted?.discount ? (
                            <>
                              <p className="text-lg font-medium text-red-600">
                                {formatPriceInEuro(
                                  product.variant.prices[0].discounted.value.centAmount * product.quantity
                                )}
                              </p>
                              <p
                                className="text-lg font-medium text-green-600"
                                style={{ textDecoration: 'line-through' }}
                              >
                                {formatPriceInEuro(product.variant.prices[0].value.centAmount * product.quantity)}
                              </p>
                            </>
                          ) : (
                            product.variant?.prices?.[0]?.value?.centAmount && (
                              <p className="text-lg font-medium text-green-600">
                                {formatPriceInEuro(product.variant.prices[0].value.centAmount * product.quantity)}
                              </p>
                            )
                          )}
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                            Quantity, {product.name.en}
                          </label>
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => handleQuantityChange(product.id, product.quantity, 'decrement')}
                              disabled={product.quantity === 1}
                            >
                              -
                            </button>

                            <input
                              id={`quantity-${productIdx}`}
                              name={`quantity-${productIdx}`}
                              type="text"
                              value={product.quantity}
                              readOnly
                              className="px-3 py-1 border-t border-b border-gray-300 w-12 text-center text-base font-medium text-gray-700"
                            />
                            <button
                              type="button"
                              className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              onClick={() => handleQuantityChange(product.id, product.quantity, 'increment')}
                            >
                              +
                            </button>
                          </div>

                          <div className="absolute right-0 top-0">
                            <button
                              type="button"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => handleRemoveProductClick(product.id, product.quantity)}
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* Order summary */}
          {lineItems.length === 0 ? (
            <></>
          ) : (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {formatPriceInEuro(totalPrice?.centAmount ?? 0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">€{discountFixed.toFixed(2)}</dd>
                </div>
                <div className="promo-code flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600 items-center justify-center">
                    <div className="mt-2">
                      <input
                        id="promo-code"
                        type="text"
                        value={promoCode}
                        onChange={handlePromoChangeInput}
                        placeholder="Enter promo code"
                        className="block disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <button
                      onClick={handlePromoCodeClick}
                      disabled={isAppliedPromoCode}
                      className={`ml-2 flex items-center justify-center w-8 h-8 rounded-full ${isPromoValid && !isAppliedPromoCode ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700'}`}
                    >
                      ✔
                    </button>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{isAppliedPromoCode ? promoCodePrice : ''}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${formatPriceInEuro(orderPrice ?? 0)}</dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Place your order
                </button>
              </div>
            </section>
          )}
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Are you sure you want to clear the cart?</h2>
              <div className="mt-4 flex justify-end">
                <button
                  className="mr-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleClearBasketClick}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BasketForm;