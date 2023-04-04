import React, { memo, useEffect, useState } from "react";
import { useItemWarranty } from "./hooks.js";
import {
  FormGroup,
  Typography,
  Box,
  FormLabel,
  IconButton,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  List,
  TextField,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
// go heavy on the mui icons and components
const WarrantyForm = ({ editWarranty, closeWarrantyPanel }) => {
  const {
    itemWarranties,
    newItemWarranty,
    updateNewItemWarranty,
    handleAddItemWarranty,
    handleDeleteItemWarranty,
  } = useItemWarranty(editWarranty);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel>Warranty for item # {editWarranty}</FormLabel>
        <IconButton onClick={closeWarrantyPanel}>
          <Typography variant="h6">{"🔙"}</Typography>
        </IconButton>
      </Box>
      <FormGroup>

        <TextField
          id='created-by-input'
          name="created_by"
          label="Created By"
          type="text"
          variant="filled"
          value={newItemWarranty.created_by}
          onChange={(e) =>
            updateNewItemWarranty({
              ...newItemWarranty,
              created_by: e.target.value,
            })}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="add"
                onClick={handleAddItemWarranty}
                sx={{ margin: 0, color: 'yellow' }}
                title="Add"
              >
                {"➕"}
              </IconButton>
            ),
          }}
        />
        <List>
          {itemWarranties.map((item) => (
            <ListItem key={item.id}>
              <ListItemText key={item.id}>{item.created_by}</ListItemText>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItemWarranty(item.id)}>
                  {"🗑️"}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </FormGroup>
    </Box>
  );
};

export default memo(WarrantyForm);
