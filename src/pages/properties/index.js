import React, { useState } from "react";
import SimpleModal from "@/util/SimpleModal";
import List from "@/components/Properties/List";
import { Button, Input } from "@material-tailwind/react";
import Collection from "@/components/Properties/Collection";
import { usePropertyConfig } from "@/components/Properties/Hooks";
import Drawer from "@/util/Drawer";
import Property from "@/components/Properties/Property";

const properties = () => {
  const [open, setOpen] = useState(false);
  const [property, setProperty] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isLoading, isError, error, data } = usePropertyConfig();

  const handleClick = () => setOpen(!open);
  const handleDrawerClick = (el) => {
    setDrawerOpen(!drawerOpen);
    if (el) {
      setProperty(el);
      return;
    }
    setProperty(null);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    propertyType: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    amenities: "",
    petPolicy: "",
    availabilityDates: "",
    rentAmount: "",
    securityDeposit: "",
    leaseTerm: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    locationPoint: "",
    nearbyLocations: "",
    photos: "",
    floorPlan: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
    alert("Said worked ");
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
      <Drawer isOpen={drawerOpen} setIsOpen={handleDrawerClick}>
        <Property property={property} />
      </Drawer>
      {open && (
        <SimpleModal handleClick={handleClick} handleSubmit={handleSubmit}>
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
                    id="propertyType"
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
                    id="squareFootage"
                    label="Square Footage"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="amenities"
                    label="Amenities"
                    value={formData.amenities}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </div>

                <div className="mt-4">
                  <Input
                    id="petPolicy"
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
                    id="availabilityDates"
                    label="Availability Dates"
                    value={formData.availabilityDates}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={3}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="rentAmount"
                    label="Rent Amount"
                    value={formData.rentAmount}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="securityDeposit"
                    label="Security Deposit"
                    value={formData.securityDeposit}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="leaseTerm"
                    label="Lease Term"
                    value={formData.leaseTerm}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contactName"
                    label="Contact Name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contactPhone"
                    label="Contact Phone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="contactEmail"
                    label="Contact Email"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="photos"
                    label="Photos"
                    value={formData.photos}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </div>
                <div className="mt-4">
                  <Input
                    id="floorPlan"
                    label="Floor Plan"
                    value={formData.floorPlan}
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

export default properties;
