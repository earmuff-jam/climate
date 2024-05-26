import React from 'react';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import {
  BookmarksRounded,
  FileDownloadRounded,
  SignpostRounded,
} from '@mui/icons-material';

const InfoSection = () => {
  return (
    <Stack spacing={2}>
      <Stack
        direction='row'
        spacing={2}
        useFlexGap
        sx={{ maxWidth: (theme) => theme.spacing(100) }}
      >
        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Stack direction='row' spacing={2}>
            <Stack alignItems='center' spacing={2}>
              <Stack>
                <Typography variant='h5' color='primary.dark'>
                  Save favourite items
                </Typography>
                <Typography variant='caption'>
                  Bookmark favourite products and quickly view their storage
                  location, enabling strategic planning.
                </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent='center' alignItems='center'>
              <IconButton disabled>
                <BookmarksRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Card>

        <Card sx={{ p: 4, boxShadow: 3 }}>
          <Stack direction='row' spacing={2}>
            <Stack alignItems='center' spacing={2}>
              <Stack>
                <Typography variant='h5' color='primary.dark'>
                  Export Inventory
                </Typography>
                <Typography variant='caption'>
                  Seemlessly export inventories to view and edit them. Update
                  existing inventories easily.
                </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent='center' alignItems='center'>
              <IconButton disabled>
                <FileDownloadRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>

      <Stack
        direction='row'
        spacing={2}
        useFlexGap
        sx={{ maxWidth: (theme) => theme.spacing(100) }}
      >
        <Card sx={{ p: 4, boxShadow: 3, width: '100%' }}>
          <Stack direction='row' spacing={2}>
            <Stack alignItems='center' spacing={2}>
              <Stack>
                <Typography variant='h5' color='primary.dark'>
                  Know wheareabout of your items
                </Typography>
                <Typography variant='caption'>
                  View detailed reports of your inventory. Share items with
                  friends and keep records of all changes. View changes in
                  timeline for bookmarked items. Do more than what you expect.
                </Typography>
              </Stack>
            </Stack>
            <Stack justifyContent='center' alignItems='center'>
              <IconButton disabled>
                <SignpostRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />
              </IconButton>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
};

export default InfoSection;
