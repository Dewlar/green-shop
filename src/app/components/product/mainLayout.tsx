import React, { useState } from 'react';

import { Disclosure, Label, Radio, RadioGroup } from '@headlessui/react';
import { HeartIcon, MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Attribute, Image, Price, Product, ProductData } from '@commercetools/platform-sdk';
import ReactLoading from 'react-loading';
import SliderMain from './slider/sliderLayout';

const ProductMain = (data: Product) => {
  const productData: ProductData = data?.masterData?.current;
  const price: Price[] = productData?.variants[0]?.prices || [];
  const images: Image[] = data?.masterData?.current?.masterVariant?.images || [];
  const attributes: Attribute[] = productData?.masterVariant?.attributes || [];
  const isDiscount =
    price.length !== 0 && price[0].discounted?.value.centAmount
      ? // eslint-disable-next-line
      `${price[0]?.discounted?.value.centAmount / 100} €`
      : '';
  const sizes = [
    { name: 'S', bgColor: 'bg-green-200', selectedSize: 'ring-gray-300' },
    { name: 'M', bgColor: 'bg-green-500', selectedSize: 'ring-gray-300' },
    { name: 'L', bgColor: 'bg-green-700', selectedSize: 'ring-gray-300' },
  ];
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [showModalSlider, setModalSlider] = useState(false);

  return (
    <div className="bg-white mb-8">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {productData?.masterVariant?.images && productData?.masterVariant?.images?.length === 1 ? (
              <img src={images[0].url} onClick={() => setModalSlider(true)}></img>
            ) : (
              <div onClick={() => setModalSlider(true)}>
                <SliderMain {...data}></SliderMain>
              </div>
            )}
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
                <div className="flex justify-between w-1/5 leading-none">
                  <span
                    className={`${isDiscount ? 'line-through text-gray-300 text-lg' : 'text-gray-900 text-3xl'}  tracking-tight`}
                  >
                    {price.length !== 0 ? (
                      // eslint-disable-next-line no-unsafe-optional-chaining
                      `${price[0]?.value?.centAmount / 100} €`
                    ) : (
                      <ReactLoading type={'bars'} color={'green'}></ReactLoading>
                    )}
                  </span>
                  <span className="text-3xl tracking-tight text-gray-900 ml-0.5 ">
                    {price.length !== 0 ? `${isDiscount}` : ''}
                  </span>
                </div>
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
                    <Label className="sr-only">Choose a size</Label>
                    <div className="flex items-center space-x-3">
                      {sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          className={({ hover, checked }) =>
                            classNames(
                              size.selectedSize,
                              hover && !checked ? 'ring ring-offset-1' : '',
                              checked ? `ring-2` : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <Label as="span" className="sr-only">
                            {size.name}
                          </Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              size.bgColor,
                              'h-8 w-8 rounded-full border border-black border-opacity-10 flex justify-center items-center'
                            )}
                          >
                            {size.name}
                          </span>
                        </Radio>
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
      {showModalSlider ? (
        <div className="fixed flex w-screen h-screen top-0 left-0 backdrop-blur-sm bg-slate-700 z-50 bg-opacity-50">
          <div className="relative m-auto w-90 max-w-2xl opacity-100">
            <SliderMain {...data}></SliderMain>
            <button className="absolute top-2.5 right-2.5">
              <XMarkIcon
                className="h-10 w-10 text-green-400 hover:text-green-800 cursor-pointer"
                onClick={() => setModalSlider(false)}
              ></XMarkIcon>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductMain;
