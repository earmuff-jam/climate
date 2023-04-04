import React, { memo, useEffect, useState } from "react";



const Warranty = ({ rowData, openWarrantyPanel }) => {
  return (
    <div>
      <h6 onClick={() => openWarrantyPanel(rowData.id)}>W</h6>
    </div>
  );
};

export default memo(Warranty , (prevProps, nextProps) => {
  console.log("prevProps", prevProps.rowData.id, "nextProps", nextProps.rowData.id);
  return prevProps.rowData.id === nextProps.rowData.id;
}) ;
