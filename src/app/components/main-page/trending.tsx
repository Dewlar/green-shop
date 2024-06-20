import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClientResponse } from '@commercetools/sdk-client-v2';
import { ProductProjection, ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import getProductsFilter from '../../api/catalog/getProductsFilter';
// import { formatPriceInEuro } from '../../api/helpers';

const Trending = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductProjection[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response: ClientResponse<ProductProjectionPagedQueryResponse> = await getProductsFilter({
        filter: [`variants.attributes.Favorite:"true"`],
        limit: 4,
        markMatchingVariants: true,
      });
      const responseResult = response.body?.results;
      if (responseResult) setFavoriteProducts(responseResult);
    };

    fetchProducts().catch(() => toast.error('Error fetching products.'));
  }, []);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32">
        <div className="md:flex md:items-center md:justify-between">
          <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-900">
            Popular Plants
          </h2>
          <Link to="/catalog" className="hidden text-sm font-medium text-green-600 hover:text-green-500 md:block">
            Shop the plants
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {favoriteProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={
                    product.masterVariant.images?.[0]?.url
                      ? product.masterVariant.images[0].url
                      : './assets/products/preview-plant.jpg'
                  }
                  alt={product.name.en}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm font-bold text-gray-700 text-center">
                <Link to={`/product/${product.id}`}>
                  <span className="absolute inset-0" />
                  {product.name.en}
                </Link>
              </h3>
              <p className="threeLineTextClamp mt-2 text-sm text-gray-500 text-justify">
                {product.description ? product.description.en.toString() : 'description'}
              </p>
              {/* <p className="mt-2 text-sm font-medium text-green-600 text-right pr-4"> */}
              {/*  {product.masterVariant.prices?.[0].value.centAmount */}
              {/*    ? formatPriceInEuro(product.masterVariant.prices[0].value.centAmount) */}
              {/*    : '11'} */}
              {/* </p> */}
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <Link to="/catalog" className="font-medium text-green-600 hover:text-green-500">
            Shop the plants
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Trending;
