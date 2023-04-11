import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function PropertyHistory({ pfhData }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Property ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Financial Type</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pfhData?.map((pfh) => (
            <TableRow key={pfh.property_id}>
              <TableCell>{pfh.property_id}</TableCell>
              <TableCell>{pfh.date}</TableCell>
              <TableCell>{pfh.financial_type}</TableCell>
              <TableCell>{`$${pfh.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PropertyHistory;
