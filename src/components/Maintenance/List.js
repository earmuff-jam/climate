import React from "react";
import { useRouter } from "next/router";

const List = (props) => {
  const { properties } = props;
  const router = useRouter();
  const createMaintenance = (propertyId) => {
    router.push({
      pathname: `maintenance/${propertyId}`,
    });
  };

  return (
    <>
      <div>Create or update maintenance form for the following properties</div>
      <div className="flex flex-wrap justify-center">
        {properties?.map((box, index) => (
          <BoxItem
            key={index}
            id={box.id}
            title={box.title}
            content={box.content}
            address={box.address}
            property_type={box.property_type}
            lease_term={box.lease_term}
            createMaintenance={createMaintenance}
          />
        ))}
      </div>
    </>
  );
};

const BoxItem = ({
  id,
  title,
  property_type,
  lease_term,
  createMaintenance,
  address,
}) => {
  return (
    <>
      <div
        className="bg-white rounded-md shadow-md p-6 m-4 w-full transition duration-300 transform hover:-translate-y-1"
        onClick={() => createMaintenance(id)}
      >
        <p className="text-sm font-semibold mb-2">{title}</p>
        <div className="flex flex-row justify-between gap-2">
          <p className="text-sm text-gray-600">{property_type}</p>
          <p className="text-sm text-gray-600">{lease_term} months </p>
        </div>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
    </>
  );
};

export default List;
