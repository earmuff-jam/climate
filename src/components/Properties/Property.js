import React from "react";

const Property = ({ property }) => {
  console.log(property);
  return (
    <>
      <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div class="flex flex-col items-start justify-between">
            <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
              {property?.title}
            </h2>
            <img
              src={"/images/" + `${property?.id}` + ".jpg"}
              alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
              class="h-full w-full object-cover object-center"
            />
          </div>

          <div class="mt-8">
            <div class="flow-root">
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                <li class="flex py-6">
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href="#">{property?.property_type}</a>
                        </h3>
                        <p class="ml-4">$ {property?.rent_amount}</p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">
                        {property?.lease_term} months
                      </p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <p class="text-gray-500">
                        {property?.bathrooms} Bath {property?.bedrooms} Bed
                      </p>

                      <div class="flex">
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Add to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="flex py-6">
                  <div class="ml-4 flex flex-1 flex-col">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={`mailto: ${property?.contact_email}`}>
                            {property?.contact_name}
                          </a>
                        </h3>
                        <p class="ml-4">{property?.contact_phone}</p>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">
                        {property?.contact_email}
                      </p>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                      <p class="text-gray-500">
                        {property?.square_footage} sq. ft
                      </p>
                      <div class="flex">
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {property?.availability_dates}
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Amenities</p>
          </div>
          <p class="mt-0.5 text-sm text-gray-500">
            {property?.amenities}
            <br />
            {property?.pet_policy}
            <br />
            {property?.nearby_locations}
          </p>
          <div class="mt-6">
            <a
              href="#"
              class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Contact Property Manager
            </a>
          </div>
          <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              <button
                type="button"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Share property
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Property;
