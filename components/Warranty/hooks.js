import React, { useState, useEffect } from "react";

import { supabaseClient as supabase } from "../../utility/supabaseClient.js";

export const useItemWarranty = (id) => {
  const [itemWarranties, setItemWarranties] = useState([]);
  const [newItemWarranty, setNewItemWarranty] = useState({
    item_id: id,
    created_by: "",
  });

  async function fetchItemWarranties() {
    let { data: itemWarranties, error } = await supabase
      .from("item_warranty")
      .select("*")
      .eq("item_id", id);
    if (error) console.log("error", error);
    else setItemWarranties(itemWarranties);
  }
  // Fetch all item warranties for a specific item id
  useEffect(() => {
    fetchItemWarranties();
  }, [id]);

  const updateNewItemWarranty = (newItemWarranty) => {
    setNewItemWarranty(newItemWarranty);
  };
  // Add a new item warranty
  async function handleAddItemWarranty(event) {
    event.preventDefault();
    const { data, error } = await supabase
      .from("item_warranty")
      .insert(newItemWarranty).select();;
    if (error) console.log("error", error);
    else {
      const sorted = [...itemWarranties, data[0]].sort((a, b) => b.id - a.id);
      setItemWarranties(sorted);
      setNewItemWarranty({
        ...newItemWarranty,
        created_by: "",
      });
    }
  }

  // Delete an item warranty
  async function handleDeleteItemWarranty(id) {
    const { error } = await supabase.from("item_warranty").delete().match({ id });
    if (error) console.log("error", error);
    else {
      setItemWarranties(itemWarranties.filter((item) => item.id !== id));
    }
  }

  return {
    itemWarranties,
    newItemWarranty,
    updateNewItemWarranty,
    handleAddItemWarranty,
    handleDeleteItemWarranty,
  };
};