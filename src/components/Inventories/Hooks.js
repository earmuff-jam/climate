import { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

/**
 * useInventoryConfiguration fn is used to build out the configuration for adding an
 * inventory item. responsible to build out the storage location options during adding
 * and inventory item as well.
 *
 */
export const useInventoryConfiguration = () => {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const userID = user?.id;
  const [open, setOpen] = useState(false);
  const [storageLocation, setStorageLocation] = useState('');

  const [formData, setFormData] = useState({ ...BLANK_INVENTORY_FORM });
  const [formDataError, setFormDataError] = useState({
    ...BLANK_INVENTORY_FORM_ERROR,
  });

  const navigate = (pId) => {
    router.push({
      pathname: '/inventories/[pId]',
      query: { pId },
    });
  };

  const addItemToInventory = async (formData) => {
    // const { resp, err } = await supabaseClient
    //   .from('inventories')
    //   .insert({
    //     name: formData.name,
    //     description: formData.description,
    //     price: formData.price,
    //     barcode: formData.barcode,
    //     sku: formData.sku,
    //     quantity: formData.quantity,
    //     bought_at: formData.bought_at,
    //     location: formData.location,
    //     is_bookmarked: formData.is_bookmarked,
    //     is_returnable: formData.is_returnable,
    //     return_location: formData.return_location,
    //     max_weight: formData.max_weight,
    //     min_weight: formData.min_weight,
    //     max_height: formData.max_height,
    //     min_height: formData.min_height,
    //     created_by: user.id,
    //     created_at: formData.created_at,
    //     updated_by: user.id,
    //     updated_at: formData.updated_at,
    //     sharable_groups: [user.id],
    //   })
    //   .select();
    // return;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    const draftErrorElements = { ...formDataError };
    let errorFound = false;

    for (const validator of draftErrorElements[id].validators) {
      if (validator.validate(value)) {
        draftErrorElements[id] = {
          ...draftErrorElements[id],
          errorMsg: validator.message,
        };
        errorFound = true;
        break;
      }
    }

    if (!errorFound) {
      draftErrorElements[id] = {
        ...draftErrorElements[id],
        errorMsg: '',
      };
    }

    setFormData({ ...formData, [id]: value });
    setFormDataError(draftErrorElements);
  };

  const handleCheckbox = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      Object.values(formDataError).some((v) => v.errorMsg.length >= 0) ||
      storageLocation === null ||
      Object.keys(storageLocation).length <= 0
    ) {
      return false;
    }

    const draftRequest = {
      ...formData,
      location: storageLocation.storageLocation,
      created_by: userID,
    };

    addItemToInventory(draftRequest);
    setFormData({ ...BLANK_INVENTORY_FORM });
  };

  const fetchAllInventoryStorageLocationOptions = async () => {
    return supabaseClient.from('storage_locations').select(
      `
      id,
      location,
      created_by,
      created_at,
      updated_by,
      updated_at,
      sharable_groups
    `
    );
  };

  const {
    isLoading: isFetchAllInventoryStorageLocationOptionsLoading,
    isError: isFetchAllInventoryStorageLocationOptionsError,
    erorr: fetchAllInventoryStorageLocationOptionsError,
    data: fetchAllInventoryStorageLocationOptionsData,
  } = useQuery(
    'storageLocationOptions',
    fetchAllInventoryStorageLocationOptions
  );

  return {
    isFetchAllInventoryStorageLocationOptionsLoading,
    isFetchAllInventoryStorageLocationOptionsError,
    fetchAllInventoryStorageLocationOptionsError,
    fetchAllInventoryStorageLocationOptionsData,
    formData,
    formDataError,
    storageLocation,
    setStorageLocation,
    open,
    handleClick,
    handleCheckbox,
    handleInputChange,
    handleSubmit,
    navigate,
  };
};

/**
 * useFetchInventoryDetailsForSelectedUser fn is used to retrieve the list of inventory items for a selected user
 */
export const useFetchInventoryDetailsForSelectedUser = () => {
  const fetchSingleInventoryItemByUser = async () => {
    if (userID) {
      const { data, error } =
        userID &&
        (await supabaseClient
          .from('inventories')
          .select(
            `
            id,
            name,
            description,
            price,
            barcode,
            sku,
            quantity,
            bought_at,
            location,
            storage_location_id,
            is_bookmarked,
            is_returnable,
            return_location,
            max_weight,
            min_weight,
            max_height,
            min_height,
            created_at,
            created_by,
            updated_at,
            updated_by,
            sharable_groups
            `
          )
          .eq('created_by', userID));
      return data;
    }
    return null;
  };

  const fetchAllInventoryItemsByUser = async () => {
    const { data, error } = await supabaseClient.from('inventories').select(
      `
      id,
      name,
      description,
      price,
      barcode,
      sku,
      quantity,
      bought_at,
      location,
      storage_location_id,
      is_bookmarked,
      is_returnable,
      return_location,
      max_weight,
      min_weight,
      max_height,
      min_height,
      created_at,
      created_by,
      updated_at,
      updated_by,
      sharable_groups
    `
    );
    return data;
  };
};

/***********************************
 ********* CONSTANTS ***************
 ***********************************/

const BLANK_INVENTORY_FORM = {
  id: '',
  name: '',
  description: '',
  price: '',
  barcode: '',
  sku: '',
  quantity: '',
  bought_at: '',
  location: '',
  storage_location_id: '',
  is_bookmarked: '',
  is_returnable: '',
  return_location: '',
  max_weight: '',
  min_weight: '',
  max_height: '',
  min_height: '',
  created_at: '',
  created_by: '',
  updated_at: '',
  updated_by: '',
  sharable_groups: '',
};

// erorr handling for adding an inventory form
const BLANK_INVENTORY_FORM_ERROR = {
  name: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item name is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item name should be less than 50 characters',
      },
    ],
  },
  description: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Item description is required',
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item description should be less than 50 characters',
      },
    ],
  },
  price: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Price for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  barcode: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Item barcode should be less than 50 characters',
      },
    ],
  },
  sku: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'SKU of item should be less than 50 characters',
      },
    ],
  },
  quantity: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: 'Quantity for the selected item is required',
      },
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  bought_at: {
    errorMsg: '',
    validators: [],
  },
  location: {
    errorMsg: '',
    validators: [],
  },
  is_bookmarked: {
    errorMsg: '',
    validators: [],
  },
  is_returnable: {
    errorMsg: '',
    validators: [],
  },
  return_location: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value.trim().length >= 50,
        message: 'Return location should be less than 50 characters',
      },
    ],
  },
  return_datetime: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => value < new Date().toISOString(),
        message: 'Return datetime cannot be an eariler date or time',
      },
    ],
  },
  max_weight: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_weight: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  max_height: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  min_height: {
    errorMsg: '',
    validators: [
      {
        validate: (value) => isNaN(value) || parseInt(value) <= 0,
        message: 'A positive number is required',
      },
    ],
  },
  created_at: {
    errorMsg: '',
    validators: [],
  },
  created_by: {
    errorMsg: '',
    validators: [],
  },
  updated_at: {
    errorMsg: '',
    validators: [],
  },
  updated_by: {
    errorMsg: '',
    validators: [],
  },
  sharable_groups: {
    errorMsg: '',
    validators: [],
  },
};
