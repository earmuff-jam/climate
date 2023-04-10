import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useState, useEffect } from "react";

export const usePropertyConfiguration = () => {

    const supabaseClient = useSupabaseClient();
    const [editMode, setEditMode] = useState(false);
    const [properties, setProperties] = useState([]);

    const retrieveUserProperties = async () => {
        const { data, error } = await supabaseClient
            .from('properties')
            .select('*')
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
    }
};

