import React from "react";
import Drawer from "@/util/Drawer";
import SimpleModal from "@/util/SimpleModal";
import List from "@/components/Properties/List";
import Property from "@/components/Properties/Property";
import Collection from "@/components/Properties/Collection";
import { usePropertyConfig } from "@/components/Properties/Hooks";
import AddProperty from "@/components/Properties/AddProperty";
import PrivateLayout from "@/components/Auth/PrivateLayout";

const Properties = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    formData,
    open,
    handleClick,
    handleInputChange,
    handleSubmit,
  } = usePropertyConfig();

  if (isLoading) {
    return <span>Loading ...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <List handleClick={handleClick} data={data} />
      {open && (
        <SimpleModal
          title={"Add Property"}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          showSubmit={true}
        >
          <AddProperty
            formData={formData}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </SimpleModal>
      )}
      <Collection />
    </>
  );
};

export default Properties;

Properties.getLayout = function getLayout(page) {
  return <PrivateLayout>{page}</PrivateLayout>;
};
