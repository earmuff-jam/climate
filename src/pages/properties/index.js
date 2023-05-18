import React, { useState } from "react";
import SimpleModal from "@/util/SimpleModal";
import List from "@/components/Properties/List";
import { Input } from "@material-tailwind/react";
import Collection from "@/components/Properties/Collection";
import { usePropertyConfig } from "@/components/Properties/Hooks";
import Drawer from "@/util/Drawer";
import Property from "@/components/Properties/Property";

const blankPropertiesForm = {
  id: "",
  title: "",
  description: "",
  property_type: "",
  address: "",
  bedrooms: "",
  bathrooms: "",
  square_footage: "",
  amenities: "",
  pet_policy: "",
  availability_dates_jsonb: "",
  rent_amount: "",
  security_deposit: "",
  lease_term: "",
  owner_id: "",
  contact_name: "",
  contact_phone: "",
  contact_email: "",
  location_point: "",
  nearby_locations: "",
  photos: "",
  floor_plan: "",
  created_by: "",
  created_on: "",
  updated_by: "",
  updated_on: "",
  sharable_groups: "",
};

const Properties = () => {
  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoading, isError, error, data, processtoDb } = usePropertyConfig();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerClick = (el) => {
    if (el) {
      setProperty(el);
      setDrawerOpen(el);
      return;
    }
    setProperty(null);
    setDrawerOpen(false);
    return;
  };

  const [formData, setFormData] = useState({ ...blankPropertiesForm });
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    console.log("change here");
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    processtoDb(formData);
    setFormData({ ...blankPropertiesForm });
  };

  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <List
        handleClick={handleClick}
        handleDrawerClick={handleDrawerClick}
        data={data}
      />
      {data?.length > 0 && drawerOpen && (
        <Drawer isOpen={drawerOpen} setIsOpen={handleDrawerClick}>
          <Property property={property} />
        </Drawer>
      )}
      {open && (
        <SimpleModal
          title={"Add Property"}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          showSubmit={true}
        >
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="max-w-lg w-full">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    id="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div>
                  <Input
                    id="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="property_type"
                    label="Property Type"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="bedrooms"
                    label="Bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="bathrooms"
                    label="Bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="square_footage"
                    label="Square Footage"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="pet_policy"
                    label="Pet Policy"
                    value={formData.petPolicy}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="rent_amount"
                    label="Rent Amount"
                    value={formData.rentAmount}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="security_deposit"
                    label="Security Deposit"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="lease_term"
                    label="Lease Term"
                    value={formData.leaseTerm}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contact_name"
                    label="Contact Name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contact_phone"
                    label="Contact Phone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contact_email"
                    label="Contact Email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
              </div>
            </form>
          </div>
        </SimpleModal>
      )}
      <Collection />
    </>
  );
};

export default Properties;
