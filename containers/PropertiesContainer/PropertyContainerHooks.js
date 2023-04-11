import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState, useEffect } from "react";

export const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const usePropertyConfiguration = () => {
  const supabaseClient = useSupabaseClient();
  const [editMode, setEditMode] = useState(false);
  const [properties, setProperties] = useState([]);

  const retrieveUserProperties = async () => {
    const { data, error } = await supabaseClient.from("properties").select(`
    id,
    name,
    city,
    state,
    zipcode,
    sqft,
    numberofbedrooms,
    numberofbathrooms,
    yearbuilt,
    garage,
    image,
    created_at,
    created_by,
    updated_by,
    updated_at,
    sharable_groups,
    property_financial_history(
        id,
        property_id,
        financial_type,
        amount, 
        date, 
        description,
        created_at,
        created_by,
        updated_by,
        updated_at,
        sharable_groups
    )`);
    if (error) return;
    setProperties(data);
  };

  useEffect(() => {
    // Fetch properties from API or database
    retrieveUserProperties();
    setEditMode(false);
  }, []);

  const handleAddProperty = () => {
    setEditMode(!editMode);
  };

  return {
    properties,
    editMode,
    handleAddProperty,
  };
};

export const useGenerateReport = (properties) => {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState({});
  const property_financial_history = properties
    .flatMap((v) => v.property_financial_history)
    .filter(Boolean);
  const totalProfit = property_financial_history.reduce((acc, el) => {
    if (el.financial_type === "profit") {
      acc += el.amount;
    }
    return acc;
  }, 0);
  const totalLoss = property_financial_history.reduce((acc, el) => {
    if (el.financial_type === "loss") {
      acc += el.amount;
    }
    return acc;
  }, 0);
  const totalExpenses = property_financial_history.reduce((acc, el) => {
    if (el.financial_type === "expense") {
      acc += el.amount;
    }
    return acc;
  }, 0);

  const buildData = (properties) => {
    const propertyFinancialReport = properties?.flatMap(
      (el) => el.property_financial_history
    );

    const filter = (arrayToFilter, filterCategoryOn) => {
      const amounts = arrayToFilter
        .filter(
          (data) =>
            data.financial_type === filterCategoryOn &&
            data.date.substring(0, 4) === currentYear.toString()
        )
        .map((data) => data.amount);
      return amounts;
    };
    const profitArr = filter(propertyFinancialReport, "profit");
    const lossArr = filter(propertyFinancialReport, "loss");
    const expenseArr = filter(propertyFinancialReport, "expense");
    const generatedData = {};
    generatedData["labels"] = labels;
    generatedData["datasets"] = [
      {
        label: "Profit",
        data: [...profitArr],
        borderColor: "#8884d8",
        fill: false,
      },
      {
        label: "Loss",
        data: [...lossArr],
        borderColor: "#82ca9d",
        fill: false,
      },
      {
        label: "Expense",
        data: [...expenseArr],
        borderColor: "#ffc658",
        fill: false,
      },
    ];
    setData({ ...generatedData });
  };

  useEffect(() => {
    buildData(properties);
  }, [properties]);

  return {
    data,
    totalExpenses,
    totalLoss,
    totalProfit,
    property_financial_history,
  };
};

export const useBuildPropertyDetails = (routeId) => {
  const supabaseClient = useSupabaseClient();
  const [property, setProperty] = useState({});

  const fetchProperty = async (routeId) => {
    const { data, error } = await supabaseClient
      .from("properties")
      .select(
        `id,
        name,
        city,
        state,
        zipcode,
        sqft,
        numberofbedrooms,
        numberofbathrooms,
        yearbuilt,
        garage,
        image,
        created_at,
        created_by,
        updated_by,
        updated_at,
        sharable_groups
      `
      )
      .match({ id: routeId });

    if (error) return;
    setProperty(data[0]);
  };
  useEffect(() => {
    fetchProperty(routeId);
  }, []);

  return {
    property,
  };
};
