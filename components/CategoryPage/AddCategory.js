import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
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

import { uuid } from 'uuidv4';
import { Box } from "@mui/system";
import ReactBarcode from "react-jsbarcode";

import React, { useState, useEffect } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmergencyShareRounded from "@mui/icons-material/EmergencyShareRounded";

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";
import { MENU_PROPS, TYPE_OPTIONS } from "./constants";
import CategoryTags from "./Tags";
import Tags from "./Tags";

const AddCategory = (props) => {

    const supabaseClient = useSupabaseClient();
    const { addCategorySelection, setAddCategorySelection } = props;

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const [barCodeValue] = useState(uuid());
    const [error, setError] = useState(false);

    const [tag, setTag] = useState();

    const handleSetType = (e) => {
        setType(e.target.value);
    }
    const handleSetName = (val) => setName(val);
    const handleSetDesc = (val) => setDesc(val);

    const saveToDb = async () => {
        const { data } = await supabaseClient.from('profiles').select('*').limit(1);
        const user_id = data && data[0].id;

        const { data: insertCatRes, error: insertCatErr } = await supabaseClient
            .from('category')
            .insert({
                category_type: type.toUpperCase(),
                category_name: name,
                category_description: desc,
                barcode: barCodeValue,
                created_by: user_id,
                sharable_groups: [user_id],
            }).select();

        const categoryId = insertCatRes?.map(dv => dv.id)[0];
        const { error: insertTagErr } = await supabaseClient
            .from('category_tag')
            .insert({
                tag_name: tag.name,
                tag_description: tag.name,
                created_by: user_id,
                category_id: categoryId,
                sharable_groups: [user_id],
            });
        setAddCategorySelection(false);
    };

    const handleSubmit = () => {
        if (
            (name === '' || undefined) ||
            (type === '' || undefined)
        ) {
            setError(true);
            return;
        }
        else { saveToDb() }
    }

    return (
        <>
            <Dialog
                open={addCategorySelection}
                onClose={() => setAddCategorySelection(false)}
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
                                Add Category
                            </Typography>
                            <Tooltip
                                title="Sharing is prohibited by default"
                            >
                                <IconButton>
                                    <EmergencyShareRounded />
                                </IconButton>
                            </Tooltip>

                            <Box
                                sx={{
                                    display: 'flex',
                                    'flexGrow': 1,
                                }} />

                            <Tooltip
                                sx={{ color: 'red' }}
                                title="Existing changes will be discarded"
                            >
                                <IconButton
                                    onClick={() => setAddCategorySelection(false)}
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
                                    <Tags
                                        tag={tag}
                                        setTag={setTag}
                                        parent={'category'}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Tooltip title="Unique Identification for Category">
                            <Box>
                                <ReactBarcode
                                    value={barCodeValue}
                                    options={{
                                        format: 'code128',
                                        fontSize: 7,
                                        width: 1,

                                    }}
                                />
                            </Box>
                        </Tooltip>
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

export default AddCategory;