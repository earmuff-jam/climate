import React, { useState } from 'react';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';

const InventoriesTable = () => {
  const [data, setData] = useState([]);

  return (
    <>
      {data === null || data?.length === 0 ? (
        <DisplayNoMatchingRecordsComponent />
      ) : null}
    </>
  );
};

export default InventoriesTable;
