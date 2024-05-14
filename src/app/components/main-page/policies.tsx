import React from 'react';
import mocks from '../mocks-data/mocks';

const Policies = () => {
  return (
    <section aria-labelledby="policy-heading" className="border-t border-gray-200 bg-green-50">
      <h2 id="policy-heading" className="sr-only">
        Our policies
      </h2>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
          {mocks.policies.map((policy) => (
            <div key={policy.name} className="text-center lg:block lg:text-center">
              <div>
                <img className="-my-1 mx-auto h-24 w-auto" src={policy.imageUrl} alt="" />
              </div>
              <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                <h3 className="text-base font-medium text-grey-900">{policy.name}</h3>
                <p className="mt-3 text-sm text-grey-600">{policy.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Policies;
