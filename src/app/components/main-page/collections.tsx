import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import getCategories from '../../api/catalog/getCategories';
import { getCategoryValue } from '../../models';

interface IHomePageCategories {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

const Collections = () => {
  const [collections, setCollections] = useState<IHomePageCategories[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      const categories = response.map((category) => {
        return {
          name: category.name,
          href: `/catalog/${getCategoryValue(category.name)}`,
          imageSrc: `./assets/products/${getCategoryValue(category.name)}.jpg`,
          imageAlt: category.name,
        };
      });
      setCollections(categories);
    };

    fetchCategories().catch(() => toast.error('Error fetching categories.'));
  }, []);

  return (
    <section aria-labelledby="collection-heading" className="relative -mt-96 sm:mt-0">
      <h2 id="collection-heading" className="sr-only">
        Collections
      </h2>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8">
        {collections.map((collection) => (
          <div
            key={collection.name}
            className="group relative h-96 rounded-lg bg-white shadow-xl sm:aspect-h-5 sm:aspect-w-4"
          >
            <div>
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
                <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                  <img
                    src={collection.imageSrc}
                    alt={collection.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
              </div>
              <div className="absolute inset-0 flex items-end rounded-lg p-6">
                <div>
                  <p aria-hidden="true" className="text-sm text-white">
                    Shop the collection
                  </p>
                  <h3 className="mt-1 font-semibold text-white">
                    <Link to={collection.href}>
                      <span className="absolute inset-0" />
                      {collection.name}
                    </Link>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
