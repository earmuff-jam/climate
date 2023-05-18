import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const SimpleModal = (props) => {
  const { title, handleClick, children, showSubmit, handleSubmit } = props;
  return (
    <Dialog open={open} handler={handleClick} size="xxl">
      <DialogHeader>{title}</DialogHeader>
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
        {showSubmit && (
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
        )}
      </DialogFooter>
    </Dialog>
  );
};

export default SimpleModal;
