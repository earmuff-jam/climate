import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const SimpleModal = ({ handleClick, children, handleSubmit }) => {
  return (
    <Dialog open={open} handler={handleClick} size="xl xs:xxl">
      <DialogHeader> Add property for tenants to rent</DialogHeader>
      <DialogBody divider>{children}</DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleClick}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={(ev) => {
            handleClick();
            handleSubmit(ev);
          }}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default SimpleModal;
