import AddCircleRounded from "../../util/AddCircleRounded.js";

export default function List({ handleClick, handleDrawerClick, data }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 inline-flex items-center">
          Your property collection
          <div className="ml-2" onClick={() => handleClick()}>
            <AddCircleRounded />
          </div>
        </h2>
        <div>
          {data === null || data.length === 0 ? (
            <p className="text-black flex flex-row justify-center sm:grid-cols-2 lg:grid-cols-4 mt-6">
              Sorry no matching records found.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {data?.map((el) => (
                <div key={el.id} className="group relative">
                  <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={`/images/${el.id}.jpg`}
                      alt={"image of property"}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a onClick={() => handleDrawerClick(el)}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {el.lease_term} Month Lease
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {el.description}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${el.rent_amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
