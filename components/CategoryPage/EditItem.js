
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
    Snackbar,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import moment from "moment";
import { Box } from "@mui/system";

import React, { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmergencyShareRounded from "@mui/icons-material/EmergencyShareRounded";

import {
    useSupabaseClient, useUser
} from "@supabase/auth-helpers-react";

import { MENU_PROPS } from "./constants";

const EditItem = ({ rowData, editMode, handleEditMode }) => {

    const {
        id,
        created_by,
        created_on,
        item_name,
        item_description,
        item_tag,
        quantity: defaultQuantity,
        sharable_groups,
        use_by_date,
    } = rowData;

    const user = useUser();
    const supabaseClient = useSupabaseClient();
    const [name, setName] = useState(item_name);
    const [desc, setDesc] = useState(item_description);
    const [quantity, setQuantity] = useState(defaultQuantity);

    const [createdTime] = useState(moment(created_on).fromNow());
    const [useByTime, setUseByTime] = useState(moment(use_by_date).fromNow());
    const [sharable, setSharable] = useState(sharable_groups?.length > 1);

    const [error, setError] = useState(false);
    const [tags, setTags] = useState(item_tag);
    const [tagOptions, setTagOptions] = useState([]);

    const handleSetType = (e) => {
        setType(e.target.value);
    }
    const handleSetName = (val) => setName(val);
    const handleSetDesc = (val) => setDesc(val);
    const handleSetQuantity = (val) => setQuantity(val);

    const handleSetTags = (event) => {
        const { target: { value } } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const saveToDb = async () => {
        await supabaseClient
            .from('item')
            .update({
                item_name: name,
                item_description: desc,
                quantity: quantity,
            }).match({ 'id': id }).match({ 'created_by': user?.id });
    };

    const handleSubmit = () => {
        if ((name === '' || undefined)) {
            setError(true);
            return;
        }
        else {
            saveToDb()
            handleEditMode(false);
        }
    }
    console.log(useByTime, quantity, user, rowData);

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
                                Edit Item
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
                                    <TextField
                                        id='item-name-input'
                                        name="item-name"
                                        label="Item Name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => handleSetName(e.currentTarget.value)}
                                    />
                                </Grid>

                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        id='item-description-input'
                                        name="item-description"
                                        label="Item Description"
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
                                                    id='item-tags-input'
                                                >
                                                    Tags
                                                </InputLabel>
                                                <Select
                                                    labelId="item-tags-input-label"
                                                    id='item-tags-input-id'
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

export default EditItem;