import {
  BookmarkAddedRounded,
  KitchenRounded,
  ShoppingBagRounded,
} from "@mui/icons-material";

export const VIEW_CATEGORY_LIST = [
  {
    category_name: "Bookmarked Items",
    category_description: "Items that are labelled as bookmark",
    icon: <BookmarkAddedRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: "primary.main",
  },
  {
    category_name: "Kitchen and food",
    category_description: "Items that are categorized under kitchen and pantry",
    icon: <KitchenRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: "warning.main",
  },
  {
    category_name: "Shopping",
    category_description: "Items that are categorized under shopping",
    icon: <ShoppingBagRounded />,
    expensesInPercent: 0,
    is_deleteable: false,
    color: "error.main",
  },
];

export const BLANK_CATEGORY_DETAILS = {
  category_name: "",
  category_description: "",
};

export const BLANK_CATEGORY_DETAILS_TOUCHED = {
  category_name: false,
  category_description: false,
};

export const BLANK_CATEGORY_DETAILS_ERROR = {
  category_name: {
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Category name is required",
      },
      {
        validate: (value) => value.trim().length >= 50,
        message: "Category name should be less than 50 characters",
      },
    ],
  },
  category_description: {
    errorMsg: "",
    validators: [
      {
        validate: (value) => value.trim().length === 0,
        message: "Category description is required",
      },
      {
        validate: (value) => value.trim().length >= 500,
        message: "Category description should be less than 500 characters",
      },
    ],
  },
};
