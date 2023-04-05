import React, { useState, useEffect } from 'react';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";
import CategoryPage from '../CategoryPage/CategoryPage';

const Category = () => {

    const supabaseClient = useSupabaseClient();
    const [datasets, setDatasets] = useState([]);

    const fetchCategoryList = async () => {
        const { data, error } = await supabaseClient.from('category')
            .select(`
        category_type,
        category_name,
        category_description,
        created_on,
        created_by,
        contains_sharable_items,
        category_tag(id, tag_name)
        `);
        if (error) return;
        setDatasets(data);
    }

    useEffect(() => {
        fetchCategoryList();
    }, []);

    return (
        <>
            {datasets && <CategoryPage datasets={datasets} />}
        </>
    )
};

export default Category;