
import React, { useState, useEffect } from 'react';

import {
    Autocomplete,
    createFilterOptions,
    TextField,
} from '@mui/material';

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

const CategoryTags = (props) => {

    const {
        tag,
        setTag
    } = props;

    const supabaseClient = useSupabaseClient();
    const [tagOptions, setTagOptions] = useState([]);

    const filter = createFilterOptions();

    const loadTag = async () => {
        let { data, error } = await supabaseClient
            .rpc('fn_gather_tag_list')
        if (error) console.error(error)
        const values = data?.map(dv => ({ id: dv.id, name: dv.name }));
        setTagOptions(values);
    }

    useEffect(() => {
        loadTag();
    }, [])

    return (
        <Autocomplete
            value={tag}
            forcePopupIcon
            onChange={(ev, newValue) => {
                if (typeof newValue === 'string') {
                    setTag({
                        name: newValue,
                    });
                } else if (newValue && newValue.inputValue) {
                    setTag({
                        name: newValue.inputValue,
                    });
                } else {
                    setTag(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.name);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Create:  "${inputValue}"`,
                    });
                }
                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={tagOptions}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                // Regular option
                return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Tag item" />
            )}
        />
    );
}

export default CategoryTags;