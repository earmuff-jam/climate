import React, { useState, useEffect } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import BaseTable, { AutoResizer, Column, SortOrder } from "react-base-table";
import "react-base-table/styles.css";

import { Box, Typography } from "@mui/material";
import moment from "moment";
import Warranty from "../Warranty/Warranty";
import WarrantyForm from "../Warranty/WarrantyForm";
const defaultColumns = [
  {
    key: "item_name",
    title: "Name",
    dataKey: "item_name",
    width: 150,
    align: Column.Alignment.LEFT,
  },
  {
    key: "item_description",
    title: "Description",
    dataKey: "item_description",
    width: 150,
    align: Column.Alignment.LEFT,
  },
  {
    key: "quantity",
    title: "Quantity",
    dataKey: "quantity",
    width: 150,
    align: Column.Alignment.CENTER,
  },
  {
    key: "use_by_date",
    title: "Expires",
    dataKey: "use_by_date",
    width: 150,
    align: Column.Alignment.LEFT,
    cellRenderer: ({ cellData: use_by_date }) => (
      <FormattedDate use_by_date={use_by_date} />
    ),
  },
];

const emptyRenderer = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      Sorry, no matching records found.
    </Box>
  );
};

const FormattedDate = ({ use_by_date }) => {
  const diff = moment(use_by_date).diff(moment.now(), "days");
  const duration = moment(use_by_date).fromNow();
  return (
    <Box
      sx={{
        pl: 1,
        borderLeft:
          diff <= 10 ? "2px solid red" : diff <= 30 ? "2px solid gold" : "none",
      }}
    >
      {duration}
    </Box>
  );
};

const DisplayAttentionItems = (props) => {
  const { rowData, toggleInspectWarranty } = props;
  const categoryName = rowData["category_name"];
  const supabaseClient = useSupabaseClient();
  const [datasets, setDatasets] = useState([]);
  const [columns, setColumns] = useState(defaultColumns);

  const [editWarranty, setEditWarranty] = useState(null);

  const openWarrantyPanel = (id) => { setEditWarranty(id); };
  const closeWarrantyPanel = () => setEditWarranty(null);

  useEffect(() => {
    const newColumns = toggleInspectWarranty
      ? [
        ...defaultColumns,
        {
          key: "inspect_warranty",
          title: "Inspect Warranty",
          dataKey: "inspect_warranty",
          width: 150,
          align: Column.Alignment.CENTER,
          cellRenderer: ({ rowData }) => (
            <Warranty
              rowData={rowData}
              openWarrantyPanel={openWarrantyPanel}
              closeWarrantyPanel={closeWarrantyPanel}
              editWarranty={editWarranty}
            />
          ),
        },
      ]
      : defaultColumns;
    setColumns(newColumns);
  }, [toggleInspectWarranty, editWarranty]);

  const fetchCategoryList = async () => {
    let { data, error } = await supabaseClient.rpc(
      "fn_gather_items_by_category_use_by_date_warranty_id",
      {
        category: categoryName,
      }
    );
    if (error) return;
    setDatasets(data);
  };

  useEffect(() => {
    fetchCategoryList();
  }, [categoryName]);

  return (
    <Box style={{ width: "40vw", height: "40vh" }}>
      {!editWarranty && 
      <AutoResizer >
        {({ width, height }) => (
          <BaseTable
            columns={columns}
            data={datasets}
            width={width}
            height={height}
            emptyRenderer={emptyRenderer}
          />
        )}
      </AutoResizer>}
      {editWarranty && <WarrantyForm editWarranty={editWarranty} closeWarrantyPanel={closeWarrantyPanel} />}
    </Box >
  );
};

export default DisplayAttentionItems;
