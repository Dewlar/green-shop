import React, { useState } from 'react';

import { Disclosure, RadioGroup } from '@headlessui/react';
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Attribute, Price, Product, ProductData } from '@commercetools/platform-sdk';
import ReactLoading from 'react-loading';
import SliderMain from './slider/sliderLayout';

const ProductMain = (data: Product) => {
  const productData: ProductData = data?.masterData?.current;
  const price: Price[] = productData?.variants[0]?.prices || [];
  const attributes: Attribute[] = productData?.masterVariant?.attributes || [];
  const sizes = [
    { name: 'S', bgColor: 'bg-green-200', selectedSize: 'ring-gray-700' },
    { name: 'M', bgColor: 'bg-green-500', selectedSize: 'ring-gray-400' },
    { name: 'L', bgColor: 'bg-green-700', selectedSize: 'ring-gray-500' },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  // export default function Example() {
  //   const [open, setOpen] = useState(false);
  console.log(price);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="bg-white mb-20">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <SliderMain {...data}></SliderMain>
            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {productData?.name.en ? (
                  productData?.name.en
                ) : (
                  <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                )}
              </h1>
              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <span className="text-3xl tracking-tight text-gray-900">
                  {price.length !== 0 ? (
                    // eslint-disable-next-line no-unsafe-optional-chaining
                    `${price[0]?.value?.centAmount / 100}€`
                  ) : (
                    <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                  )}
                </span>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6 text-base text-gray-700">
                  {productData?.description?.en ? (
                    productData?.description?.en
                  ) : (
                    <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                  )}
                </div>
              </div>

              <form className="mt-6">
                {/* Colors */}
                <div>
                  <h3 className="text-sm text-gray-600">Size</h3>

                  <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.selectedSize,
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {size.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              size.bgColor,
                              'h-8 w-8 rounded-full border border-black border-opacity-10 flex justify-center items-center'
                            )}
                          >
                            {size.name}
                          </span>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-10 flex">
                  <button
                    type="submit"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                  <Disclosure as="div">
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(open ? 'text-indigo-600' : 'text-gray-900', 'text-sm font-medium')}
                            >
                              {`Features`}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        {attributes.map((detail, index) =>
                          detail.value === true ? (
                            <Disclosure.Panel as="div" className="prose prose-sm pb-6" key={index}>
                              <ul role="list">
                                <li key={detail.name}>{detail.name}</li>
                              </ul>
                            </Disclosure.Panel>
                          ) : null
                        )}
                      </>
                    )}
                  </Disclosure>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductMain;
