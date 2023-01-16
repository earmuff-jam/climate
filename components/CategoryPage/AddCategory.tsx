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
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";

import { Box } from "@mui/system";
import ReactBarcode from "react-jsbarcode";
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const fetchedCategoryList = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const AddCategory = (props: any) => {

    const theme = useTheme();

    const { addCategorySelection, setAddCategorySelection } = props;

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagOptions, setTagOptions] = useState<string[]>([]);

    const handleSetType = (val: string) => setType(val);
    const handleSetName = (val: string) => setName(val);
    const handleSetDesc = (val: string) => setDesc(val);
    const handleSetTags = (event: SelectChangeEvent<typeof tags>) => {
        const { target: { value } } = event;
        setTags(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleSubmit = () => { console.log(`handle submit called`) }

    useEffect(() => {
        // when page loads give tag options
        setTagOptions(['food', 'mohit', 'breakfast'])
    }, [])

    return (
        <>
            <Dialog
                open={addCategorySelection}
                onClose={() => setAddCategorySelection(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Add Category"}
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
                                        id='category-type-input'
                                        name="category-type"
                                        label="Category Type"
                                        type="text"
                                        value={type}
                                        onChange={(e) => handleSetType(e.currentTarget.value)}
                                    />
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
                                            Add Tags
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
                                            MenuProps={MenuProps}
                                        >
                                            {tagOptions.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </form>
                        <ReactBarcode
                            value="ABC123"
                            options={{ format: 'code128' }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => setAddCategorySelection(false)}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default AddCategory;