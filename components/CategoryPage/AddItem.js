import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    SelectChangeEvent,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import { uuid } from 'uuidv4';
import { Box } from "@mui/system";
import ReactBarcode from "react-jsbarcode";


import React, { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmergencyShareRounded from "@mui/icons-material/EmergencyShareRounded";

import {
    useSupabaseClient
} from "@supabase/auth-helpers-react";
import moment from "moment";
import Tags from "./Tags";

const AddItem = (props) => {

    const supabaseClient = useSupabaseClient();
    const { addItemSelection, setAddItemSelection, rowData = [] } = props;

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [quantity, setQuantity] = useState('1');

    const [useBy, setUseBy] = useState('');
    const [barCodeValue] = useState(uuid());

    const [tag, setTag] = useState();
    const [shareItem, setShareItem] = useState(false);

    const [error, setError] = useState(false);

    const handleSetName = (val) => setName(val);
    const handleSetDesc = (val) => setDesc(val);
    const handleSetQuantity = (val) => setQuantity(val);
    const handleShare = () => { setShareItem(!shareItem) };

    const saveToDb = async () => {
        const { data } = await supabaseClient.from('profiles').select('*').limit(1);
        // always is going to be the logged in user
        const user_id = data && data[0].id;
        let { data: categoryId, error: catIdErr } = await supabaseClient
            .rpc('fn_gather_category_id_by_name',
                {
                    createdby: rowData?.created_by,
                    name: rowData?.category_name
                });

        const { data: response, error } = await supabaseClient
            .from('item')
            .insert([
                {
                    item_name: name,
                    item_description: desc,
                    quantity: quantity,
                    use_by_date: moment().add(30, 'days').toISOString(),
                    category_id: categoryId,
                    created_by: user_id,
                    sharable_groups: [user_id]
                }
            ]).select();

        const itemId = response?.map(dv => dv.id)[0];
        const { error: insertTagErr } = await supabaseClient
            .from('item_tag')
            .insert({
                name: tag.name,
                description: tag.name,
                created_by: user_id,
                id: itemId,
                sharable_groups: [user_id],
            });
        setAddItemSelection(false);
    };

    const handleSubmit = () => {
        if ((name === '' || undefined)) {
            setError(true);
            return;
        }
        else { saveToDb() }
    }

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
                                Add Item
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
                                    <TextField
                                        fullWidth
                                        id='item-name-input'
                                        name="Item-name"
                                        label="Item Name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => handleSetName(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        id='item-quantity-input'
                                        name="Item-quantity"
                                        label="Item Quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleSetQuantity(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Box>
                                    <Tooltip title={`${shareItem ? 'Sharing items will share container' : 'Sharing disabled for item'}`}>
                                        <IconButton
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            onClick={handleShare}
                                        >
                                            <EmergencyShareRounded
                                                color={`${shareItem ? 'secondary' : 'warning'}`}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id='item-description-input'
                                        name="Item-description"
                                        label="Item Description"
                                        type="text"
                                        value={desc}
                                        onChange={(e) => handleSetDesc(e.currentTarget.value)}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Tags
                                        tag={tag}
                                        setTag={setTag}
                                        parent={'item'}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Tooltip title="Unique Identification for Item">
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