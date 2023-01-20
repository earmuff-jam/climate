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
import { now } from "moment";

const AddItem = (props: any) => {

    const supabaseClient = useSupabaseClient();
    const { addItemSelection, setAddItemSelection, rowData = [] } = props;

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [useBy, setUseBy] = useState('');
    const [barCodeValue] = useState(uuid());

    const [error, setError] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagOptions, setTagOptions] = useState<string[] | undefined>([]);

    const handleSetName = (val: string) => setName(val);
    const handleSetDesc = (val: string) => setDesc(val);
    const handleSetQuantity = (val: number) => setQuantity(val);

    const handleSetTags = (event: SelectChangeEvent<typeof tags>) => {
        const { target: { value } } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    console.log(rowData);   
    const saveToDb = async () => {
        const { data } = await supabaseClient.from('profiles').select('*').limit(1);
        // always is going to be the logged in user
        const user_id = data && data[0].id;

        // create a function in supabase that returns the category id of the category that the row data is in. since the row data doesn't have the id.
        const category_id = '1';

        const { data: response, error } = await supabaseClient
            .from('item')
            .insert([
                {
                    item_name: name,
                    item_description: desc,
                    quantity:  quantity,
                    use_by_date: useBy,
                    category_id: category_id,
                    created_by: user_id,
                    sharable_groups: [user_id]
                }
            ]);

        if (error) { console.log(error) }
        else {
            console.log(response);
            setAddItemSelection(false);
        }
    };

    const handleSubmit = () => {
        if ((name === '' || undefined) ) {
            setError(true);
            return;
        }
        else { saveToDb() }
    }

    const loadTag = async () => {
        let { data, error } = await supabaseClient
            .rpc('fn_gather_tag_list')
        if (error) console.error(error)
        const values = data?.map(v => v.name);
        setTagOptions(values);
    }

    useEffect(() => {
        loadTag();
    }, [])


    return (
        <>
            <Dialog
                open={addItemSelection}
                onClose={() => setAddItemSelection(false)}
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
                                    onClick={() => setAddItemSelection(false)}
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
                                    NEED SOMETHING HERE ?
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

export default AddItem;