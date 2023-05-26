import React from "react";
import { Input } from "@material-tailwind/react";

const AddProperty = (props) => {
  const { formData, handleSubmit, handleInputChange } = props;

  return (
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
  );
};

export default AddProperty;
