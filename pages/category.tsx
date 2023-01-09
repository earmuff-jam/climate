import React, { useState, useEffect } from 'react';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { Grid } from '@mui/material';
import CategoryPage from "../components/CategoryPage/CategoryPage";

const Category = () => {

    const supabaseClient = useSupabaseClient();
    const [datasets, setDatasets] = useState<any | null>([]);

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
            <Grid
                container
                alignItems="center"
            >
                <Grid item xs={6} md={12}>

                </Grid>
                <Grid item xs={12} md={12}>
                    {datasets && <CategoryPage datasets={datasets} />}
                </Grid>
            </Grid>
        </>
    )
};

export default Category;