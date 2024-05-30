import { DownloadRounded, SaveRounded } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import React, { useState } from 'react';
import { Box, Button, Input, Stack, Typography } from '@mui/material';

const AddBulkUploadInventory = ({ handleClose }) => {
  const [uploadedFileInJson, setUploadedFileInJson] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const formattedArr = XLSX.utils.sheet_to_json(worksheet, {
          rawNumbers: true,
        });
        setUploadedFileInJson(formattedArr);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadBulkUploadTemplate = () => {
    const templatedData = [
      {
        name: '',
        description: '',
        price: '',
        quantity: '',
        is_bookmarked: '',
        storage_location: '',
      },
    ];

    const ws = XLSX.utils.json_to_sheet(templatedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'inventories');
    XLSX.writeFile(wb, 'inventory-template.xlsx');
  };

  const resetData = () => {
    setOpen(false);
    setUploadedFileInJson(null);
    handleClose(); // close the modal
  };

  const submit = () => {
    if (Array.isArray(uploadedFileInJson) && uploadedFileInJson.length > 0) {
    }
    resetData();
  };

  return (
    <>
      <Stack paddingBottom={'2rem'}>
        <Typography fontWeight='bold'>
          Upload inventory items in bulk
        </Typography>
        <Typography variant='caption'>
          Please use the provided template so that all fields are added in the
          system.
        </Typography>
      </Stack>
      <Stack alignItems={'center'}>
        <Box
          component='form'
          onSubmit={submit}
          sx={{ maxWidth: 600, width: '100%' }}
        >
          <form>
            <Input type='file' onChange={handleFileChange} />
          </form>
          <Typography variant='caption'>
            Uploading excel data must contain required headers
          </Typography>
        </Box>
        <Stack direction={'row'} spacing={2} useFlexGap sx={{ py: 4 }}>
          <Button
            variant='outlined'
            endIcon={<DownloadRounded />}
            onClick={downloadBulkUploadTemplate}
          >
            Download Template
          </Button>

          <Button endIcon={<SaveRounded />} onClick={submit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default AddBulkUploadInventory;
