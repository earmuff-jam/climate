import React from "react";

const Property = (props) => {
    const {property} = props;
    return (
        <>
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex flex-col items-start justify-between">
                        <h2
                            className="text-lg font-medium text-gray-900"
                            id="slide-over-title"
                        >
                            {property?.title}
                        </h2>
                        <img
                            src={"/images/" + `0` + ".jpg"}
                            alt="Image of property"
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                <li className="flex py-6">
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href="#">{property?.property_type}</a>
                                                </h3>
                                                <p className="ml-4">$ {property?.rent_amount}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {property?.lease_term} months
                                            </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                                {property?.bathrooms} Bath {property?.bedrooms} Bed
                                            </p>

                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500 disabled:text-indigo-100"
                                                    disabled={true}
                                                >
                                                    Add to wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex py-6">
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a href={`mailto: ${property?.contact_email}`}>
                                                        {property?.contact_name}
                                                    </a>
                                                </h3>
                                                <p className="ml-4">{property?.contact_phone}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {property?.contact_email}
                                            </p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">
                                                {property?.square_footage} sq. ft
                                            </p>
                                            <div className="flex">
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
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

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Amenities</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                        {property?.amenities?.[0] || 'None'}
                        <br/>
                        {property?.pet_policy ? 'Pets allowed' : 'No Pets Allowed'}
                        <br/>
                        {property?.nearby_locations?.[0] || 'None known nearby locations'}
                    </p>
                    <div className="mt-6">
                        <a
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            href={`mailto: ${property?.contact_email}`}>
                            Contact Property Owner
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Property;
