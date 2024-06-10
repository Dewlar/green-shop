import React, { useEffect, useState } from 'react';
import { CheckIcon, ClockIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';
import { LineItem } from '@commercetools/platform-sdk';
import { toast } from 'react-toastify';
import { getProductsFromBasket } from '../../api/basket/BasketRepository';

// const products = [
//   {
//     id: 1,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Sienna',
//     inStock: true,
//     size: 'Large',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
//     imageAlt: "Front of men's Basic Tee in sienna.",
//   },
//   {
//     id: 2,
//     name: 'Basic Tee',
//     href: '#',
//     price: '$32.00',
//     color: 'Black',
//     inStock: false,
//     leadTime: '3–4 weeks',
//     size: 'Large',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
//     imageAlt: "Front of men's Basic Tee in black.",
//   },
//   {
//     id: 3,
//     name: 'Nomad Tumbler',
//     href: '#',
//     price: '$35.00',
//     color: 'White',
//     inStock: true,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
//     imageAlt: 'Insulated bottle with white base and black snap lid.',
//   },
// ];

const BasketForm = () => {
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  console.log('lineItems', lineItems);
  const subtotal = 99.0;
  const discountFixed = 5;
  const [total, setTotal] = useState(subtotal - discountFixed);
  const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPromoCode(input);
    setIsApplied(false);

    if (input.trim().toUpperCase() === 'CODE') {
      setIsPromoValid(true);
    } else {
      setIsPromoValid(false);
    }
  };

  const applyDiscount = () => {
    if (isPromoValid) {
      setIsApplied(true);
      const promoDiscount = 8.32;
      setTotal(subtotal - discountFixed - promoDiscount);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response: LineItem[] = await getProductsFromBasket();

        console.log(response);
        setLineItems(response);
      } catch (error) {
        toast.error('Error adding product to cart.');
      }
    };

    fetchProducts();
  }, []);

  const productsFromBasket = lineItems.map((item) => ({
    id: item.id,
    name: item.name.en,
    href: `/product/${item?.productSlug?.en}`,
    imageSrc: item.variant?.images?.[0]?.url || '',
    imageAlt: item.name.en,
    size: item.variant?.attributes?.find((attr) => attr.name === 'Size')?.value[0] || '',
    price: `${(item.price.value.centAmount / 100).toFixed(2)} ${item.price.value.currencyCode}`,
    inStock: true,
  }));

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {productsFromBasket.map((product, productIdx) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <a href={product.href} className="font-medium text-gray-700 hover:text-gray-800">
                              {product.name}
                            </a>
                          </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          {product.size && (
                            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                          )}
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                          Quantity, {product.name}
                        </label>
                        <select
                          id={`quantity-${productIdx}`}
                          name={`quantity-${productIdx}`}
                          className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                          {[...Array(12).keys()].map((n) => (
                            <option key={n + 1} value={n + 1}>
                              {n + 1}
                            </option>
                          ))}
                        </select>

                        <div className="absolute right-0 top-0">
                          <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <XMarkIconMini className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      ) : (
                        <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                      )}

                      <span>{product.inStock ? 'In stock' : 'Out of stock'}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
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
                <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
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
                      onChange={handlePromoChange}
                      placeholder="Enter promo code"
                      className="block disabled:bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    onClick={applyDiscount}
                    disabled={isApplied}
                    className={`ml-2 flex items-center justify-center w-8 h-8 rounded-full ${isPromoValid && !isApplied ? 'bg-green-500 text-white hover:bg-green-700' : 'bg-gray-400 text-gray-700'}`}
                  >
                    ✔
                  </button>
                </dt>
                <dd className="text-sm font-medium text-gray-900">{isApplied ? '€8.32' : ''}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
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
        </form>
      </main>
    </div>
  );
};

export default BasketForm;
