
import {
    Button,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import moment from "moment";
import { Box } from "@mui/system";

import React, { useState, useEffect } from "react";
import { pink } from "@mui/material/colors";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmergencyShareRounded from "@mui/icons-material/EmergencyShareRounded";

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";

import { MENU_PROPS, TYPE_OPTIONS } from "./constants";

const EditCategory = ({ rowData, editMode, handleEditMode }: any) => {

    const { category_description,
        category_name,
        category_tag,
        category_type,
        contains_sharable_items,
        created_by,
        created_on } = rowData;

    const supabaseClient = useSupabaseClient();
    const [type, setType] = useState(category_type);
    const [name, setName] = useState(category_name);
    const [desc, setDesc] = useState(category_description);

    const [categoryId, setCategoryId] = useState<any | undefined>();
    const [createdTime] = useState(moment(created_on).fromNow());
    const [sharable, setSharable] = useState(contains_sharable_items);

    const [error, setError] = useState(false);
    const [tags, setTags] = useState<string[]>(category_tag);
    const [tagOptions, setTagOptions] = useState<string[] | undefined>([]);

    const handleSetType = (e: SelectChangeEvent<typeof type>) => {
        setType(e.target.value);
    }
    const handleSetName = (val: string) => setName(val);
    const handleSetDesc = (val: string) => setDesc(val);
    const handleSetTags = (event: SelectChangeEvent<typeof tags>) => {
        const { target: { value } } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const saveToDb = async () => {
        const { data } = await supabaseClient.from('profiles').select('*').limit(1);
        const user_id = data && data[0].id;
        const { error } = await supabaseClient
            .from('category')
            .update({
                category_type: type.toUpperCase(),
                category_name: name,
                category_description: desc,
                contains_sharable_items: sharable,
                created_on: moment().toISOString(),
            }).match({ 'id': categoryId }).match({ 'created_by': user_id });

        if (error) { console.log(error) };
    };

    const handleSubmit = () => {
        if ((name === '' || undefined) || (type === '' || undefined)) {
            setError(true);
            return;
        }
        else {
            saveToDb()
            handleEditMode(false);
        }
    }

    const loadData = async () => {
        let { data: categoryId, error } = await supabaseClient
            .rpc('fn_gather_category_id_by_name',
                {
                    createdby: created_by,
                    name: category_name
                });
        if (error) console.error(error)
        else {
            setCategoryId(categoryId);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleSharableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSharable(e.target.checked);
    };

    return (
        <>
            <Dialog
                open={editMode}
                onClose={() => handleEditMode(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Typography
                                variant="h5"
                            >
                                Edit Category
                            </Typography>
                            <Tooltip
                                title="Sharing is prohibited by default"
                            >
                                <IconButton
                                    color={sharable ? 'secondary' : 'warning'}
                                >
                                    <EmergencyShareRounded
                                    />
                                </IconButton>
                            </Tooltip>

                            <Box
                                sx={{
                                    display: 'flex',
                                    'flexGrow': 1,
                                }} />

                            <Tooltip
                                title={`Created ${createdTime}`}
                            >
                                <Chip
                                    label={createdTime}
                                    variant="outlined"
                                />
                            </Tooltip>

                            <Tooltip
                                sx={{ color: 'red' }}
                                title="Existing changes will be discarded"
                            >
                                <IconButton
                                    onClick={() => handleEditMode(false)}
                                >
                                    <CloseRoundedIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    }
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form onSubmit={handleSubmit}>
                            <Grid
                                container
                                direction="row"
                                alignItems="left"
                                justifyContent="left"
                                rowGap={2}
                                columnGap={1}
                                padding={2}
                            >
                                <Grid item xs={5}>
                                    <FormControl fullWidth>
                                        <InputLabel
                                            id='category-type-input'
                                        >
                                            Type
                                        </InputLabel>
                                        <Select
                                            labelId="category-type-input-label"
                                            id='category-type-input-id'
                                            value={type}
                                            onChange={handleSetType}
                                            input={
                                                <OutlinedInput id='select-chip-input' label='Chip'
                                                />
                                            }
                                            MenuProps={MENU_PROPS}
                                        >
                                            {TYPE_OPTIONS?.map((item) => (
                                                <MenuItem
                                                    key={item.id}
                                                    value={item.name}>
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={5}>
                                    <TextField
                                        id='category-name-input'
                                        name="category-name"
                                        label="Category Name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => handleSetName(e.currentTarget.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControl>
                                        <FormControlLabel
                                            checked={sharable}
                                            control={
                                                <Checkbox
                                                    sx={{
                                                        color: pink[800],
                                                        '&.Mui-checked': {
                                                            color: pink[600],
                                                        },

                                                    }}
                                                    onChange={handleSharableChange}
                                                />
                                            }
                                            label="Share items within this category"
                                        />
                                    </FormControl>
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        id='category-description-input'
                                        name="category-description"
                                        label="Category Description"
                                        type="text"
                                        value={desc}
                                        onChange={(e) => handleSetDesc(e.currentTarget.value)}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    {tagOptions && tagOptions.length > 0 &&
                                        <>
                                            <FormControl fullWidth>
                                                <InputLabel
                                                    id='category-tags-input'
                                                >
                                                    Tags
                                                </InputLabel>
                                                <Select
                                                    labelId="category-tags-input-label"
                                                    id='category-tags-input-id'
                                                    multiple
                                                    value={tags}
                                                    onChange={handleSetTags}
                                                    input={
                                                        <OutlinedInput id='select-multiple-chip-input' label='Chip'
                                                        />
                                                    }
                                                    renderValue={(selected) => (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexWrap: "wrap",
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            {selected.map((value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={value}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                    MenuProps={MENU_PROPS}
                                                >
                                                    {tagOptions?.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                            {name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </>
                                    }
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default EditCategory;