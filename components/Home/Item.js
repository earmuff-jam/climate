import React, { useState, useEffect } from 'react';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";
import ItemPage from '../ItemPage/ItemPage';

const Item = () => {

    const supabaseClient = useSupabaseClient();
    const [datasets, setDatasets] = useState([]);

    const fetchItemList = async () => {
        const { data, error } = await supabaseClient.from('item')
            .select(`
        item_name,
        item_description,
        quantity,
        use_by_date,
        created_on,
        created_by,
        sharable_groups,
        item_tag(id, tag_name, tag_description)
        `);
        if (error) return;
        setDatasets(data);
    }

    useEffect(() => {
        fetchItemList();
    }, []);

    return (
        <>
            {datasets && <ItemPage datasets={datasets} />}
        </>
    )
};

export default Item;