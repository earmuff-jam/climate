import {
    Autocomplete,
    Badge,
    Chip,
    IconButton,
    LinearProgress,
    TextField,
} from "@mui/material";
import Image from "next/image";
import { Box } from "@mui/system";
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from "react";
import SingleTextField from "../SingleTextField/SingleTextField";
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

interface Iprops {

}

const ItemForm = (props: Iprops) => {
    const autocompleteDisplayPlaceholder = 'Select Category';
    const userCategoryList = [
        { value: 'pantry', label: 'Pantry' },
        { value: 'garage', label: 'Garage' },
        { value: 'medicine-cabinet-1', label: 'Medicine Cabinate' },
        { value: 'bathroom-drawer-01', label: 'Bathroom Drawer 01' },
    ];
    const [pogress, setProgress] = useState<number>(0);
    const [fileAttachment, setFileAttachment] = useState([]);
    const [itemDesc, setItemDesc] = useState<string>("");
    const [error, setError] = useState(false);

    const handleCapture = ({ target }: any) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            setFileAttachment(prev => (
                [...prev,
                {
                    name: e.target?.result,
                    id: uuidv4()
                }
                ]
            ));
        };
    }

    const handleDelete = (id: string) => {
        const remainingAttachments = fileAttachment.filter(x => x.id !== id);
        setFileAttachment(remainingAttachments);
        return;
    };

    const handleProgress = (val: number): void => setProgress(val);
    const handleItemDesc = (val: string): void => setItemDesc(val);
    const handleMonitor = () => { console.log('handle monitor is called') };

    const itemFormSx = {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    };
    const chipDisplaySx = {
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
    };

    return (
        <Box sx={itemFormSx}>
            <LinearProgress
                variant="determinate"
                value={20}
                color={"secondary"}
            />
            <Autocomplete
                id="category-box-id"
                options={userCategoryList}
                renderInput={
                    (params) =>
                        <TextField
                            {...params}
                            label={autocompleteDisplayPlaceholder}
                        />
                }
            />
            {
                fileAttachment.map(x => (
                    <Image
                        width={100}
                        height={100}
                        src={x.name}
                        alt={"none"}
                        onDoubleClick={() => handleDelete(x.id)}
                    />
                ))
            }
            <SingleTextField
                key={0}
                error={error}
                label="Add item"
                helperText=""
                value={itemDesc}
                handleEmail={handleItemDesc}
            />
            <Box sx={chipDisplaySx}>
                <Chip
                    label={'Monitor'}
                    onClick={handleMonitor}
                    icon={<MyLocationRoundedIcon />}
                />
                <Box>
                    <Chip
                        label={'Upload'}
                        onClick={handleCapture}
                        icon={<CloudUploadRoundedIcon />}
                    />
                    <Badge
                        badgeContent={fileAttachment.length}
                        color={"error"}
                    >
                        <IconButton
                            component="label"
                        >
                            <input
                                type="file"
                                hidden />

                            <AttachFileRoundedIcon />
                        </IconButton>
                    </Badge>
                </Box>
            </Box>
        </Box>
    )

};

export default ItemForm;