import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { EditRounded } from '@mui/icons-material';
import dayjs from 'dayjs';

const GridComponent = ({ isLoading, data, rowSelected, handleEdit, handleRowSelection }) => {
  if (isLoading) return <Skeleton height="10vh" width="100%" />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent />;

  return (
    <Stack spacing={{ xs: 1 }} marginBottom="1rem" direction="row" useFlexGap flexWrap="wrap">
      {data.map((row, index) => {
        const isSelected = (id) => rowSelected.indexOf(id) !== -1;
        const selectedID = row.id;
        const isItemSelected = isSelected(selectedID);
        return (
          <Stack key={index} flexGrow={1} height="14rem" width="20rem">
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Tooltip title={row.description}>
                <CardMedia sx={{ height: 200 }} image="/blank_canvas.svg" />
              </Tooltip>
              <CardContent>
                <Stack>
                  <Typography variant="caption">{row.name}</Typography>
                  <Typography variant="caption" color="text.secondary" textOverflow="auto">
                    {row.description}
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <Stack flexGrow={1}>
                  <Typography variant="caption">{row.quantity} items</Typography>
                  <Typography variant="caption">Edited around {dayjs(row.updated_on).fromNow()}</Typography>
                </Stack>
                <Checkbox
                  checked={isItemSelected}
                  color="primary"
                  size="small"
                  onClick={(event) => handleRowSelection(event, selectedID)}
                  inputProps={{ 'aria-labelledby': 'labelId' }}
                />
                <IconButton size="small" color="primary" onClick={() => handleEdit(selectedID)}>
                  <EditRounded fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default GridComponent;
