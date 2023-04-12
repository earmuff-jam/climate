import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

const blankFormData = {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    sqft: '',
    image: '',
    yearbuilt: '',
    garage: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
}

export const useAddProperty = () => {

    const supabaseClient = useSupabaseClient();
    const [formData, setFormData] = useState({ ...blankFormData });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetData = () => {
        setFormData({ ...blankFormData });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // logic for all form fields submitted
        if (Object.values(formData).length === Object.keys(formData).length) {
            await supabaseClient
                .from('properties')
                .insert(
                    {
                        id: formData.id,
                        name: formData.name,
                        city: formData.city,
                        state: formData.state,
                        zipcode: formData.zipcode,
                        sqft: formData.sqft,
                        numberofbedrooms: formData.numberofbedrooms,
                        numberofbathrooms: formData.numberofbathrooms,
                        yearbuilt: formData.yearbuilt,
                        garage: formData.garage,
                        image: formData.image,
                        created_at: formData.created_at,
                        created_by: formData.created_by,
                        updated_by: formData.updated_by,
                        updated_at: formData.updated_at,
                        sharable_groups: formData.sharable_groups,
                    }, { upsert: true });
        };
        resetData();
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        resetData,
    }
}