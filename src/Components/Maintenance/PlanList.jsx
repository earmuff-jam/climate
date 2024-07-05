import { useState } from 'react';
import { Box, Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import {
  CheckRounded,
  CircleRounded,
  CloseRounded,
  HighlightOffRounded,
  RestoreRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent, generateTitleColor } from '../../util/util';
import {
  fetchInventoryItemsAgainstSelectedMaintenancePlan,
  useDeleteSelectedItemFromMaintenancePlan,
  useDeleteSelectedMaintenancePlan,
  useFetchMaintenanceList,
} from '../../features/maintenancePlan';
import SimpleModal from '../../util/SimpleModal';
import TableComponent from '../InventoryDetails/TableComponent';
import { VIEW_INVENTORY_LIST_HEADERS } from '../InventoryDetails/constants';
import { useQuery } from 'react-query';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import MaintenanceChart from '../Chart/MaintenanceChart';
import dayjs from 'dayjs';

const PlanList = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const { data, isLoading } = useFetchMaintenanceList();
  const deleteMaintenancePlanMutation = useDeleteSelectedMaintenancePlan();
  const deleteSelectedItemFromMaintenancePlanMutation = useDeleteSelectedItemFromMaintenancePlan();

  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMaintenancePlan, setSelectedMaintenancePlan] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(-1);

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery(
    ['maintenanceItems', selectedMaintenancePlan?.id],
    () => fetchInventoryItemsAgainstSelectedMaintenancePlan(supabaseClient, user.id, selectedMaintenancePlan.id),
    {
      enabled: !!selectedMaintenancePlan?.id,
    }
  );

  const resetSelection = (id) => {
    if (id === -1) {
      return;
    }
    deleteSelectedItemFromMaintenancePlanMutation.mutate(id);
  };

  const rowFormatter = (row, column, color) => {
    if (['created_on', 'updated_on'].includes(column)) {
      return dayjs(row[column]).fromNow();
    }
    if (['price', 'quantity'].includes(column)) {
      return row[column] <= 0 ? '-' : row[column];
    }
    if (['updator_name', 'creator_name'].includes(column)) {
      return row[column]?.username ?? '-';
    }
    if (['is_returnable'].includes(column)) {
      return row[column] ? <CheckRounded color="primary" /> : <CloseRounded color="error" />;
    }
    if (['name'].includes(column)) {
      return (
        <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={{ xs: 1 }}>
          {row?.maintenance_item.length > 0 ? (
            <IconButton onClick={() => resetSelection(row.id)}>
              <RestoreRounded color="primary" />
            </IconButton>
          ) : null}
          <CircleRounded sx={{ height: '0.75rem', width: '0.75rem', color: color ? `${color}` : 'transparent' }} />
          <Typography variant="subtitle2">{row[column] || '-'}</Typography>
        </Stack>
      );
    }
    return row[column] ?? '-';
  };

  const handleSelection = (item) => {
    setDisplayModal(true);
    setSelectedMaintenancePlan(item);
  };

  const handleClose = () => {
    setDisplayModal(false);
    setSelectedMaintenancePlan(null);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const resetConfirmationBox = () => {
    setOpenDialog(false);
    setIdToDelete(-1);
  };

  const confirmDelete = (id) => {
    if (id === -1) {
      // unknown id to delete. protect from confirmation box
      return;
    }
    deleteMaintenancePlanMutation.mutate(id);
    resetConfirmationBox();
  };

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height="100%" width="100%" />;
  }
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent />;

  return (
    <>
      <Stack spacing="2rem">
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
          {data.map((item, index) => (
            <Stack key={index} sx={{ flexGrow: 1 }}>
              <Tooltip title={item.description}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent>
                    <Stack direction="row">
                      <Stack flexGrow={1}>
                        <Typography variant="h6" component="h3">
                          {item.plan}
                        </Typography>
                        <Typography variant="caption">{item.type}</Typography>

                        <Box sx={{ px: 1, py: 0, borderRadius: 2 }}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            useFlexGap
                            spacing={1}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleSelection(item)}
                          >
                            <TrendingUpRounded color={index % 2 == 0 ? 'success' : 'error'} />
                            <Stack>
                              <Typography variant="caption">Total items {item.maintenanceItems.length ?? 0}</Typography>
                              <Typography variant="caption">Due {dayjs(item.term_limit).fromNow()}</Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                      <IconButton
                        size="small"
                        disableFocusRipple
                        disableRipple
                        onClick={() => {
                          setIdToDelete(item.id);
                          handleDelete(item.id);
                        }}
                      >
                        <HighlightOffRounded />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>
              </Tooltip>
            </Stack>
          ))}
        </Stack>
        <MaintenanceChart data={data} />
      </Stack>
      {/* display list of inventories associated with the selected maintenance plan when selected */}
      {displayModal && (
        <SimpleModal title={`Item(s) under ${selectedMaintenancePlan?.plan}`} handleClose={handleClose} maxSize="md">
          <TableComponent
            hideActionMenu
            isLoading={inventoryLoading}
            data={inventoryData?.data || []}
            rowSelected={[]}
            rowFormatter={rowFormatter}
            generateTitleColor={generateTitleColor}
            columns={Object.values(VIEW_INVENTORY_LIST_HEADERS).filter((v) => v.displayConcise)}
          />
        </SimpleModal>
      )}
      <ConfirmationBoxModal
        openDialog={openDialog}
        title="Confirm deletion"
        text="Confirm deletion of maintenance plan? Deletion is permanent and cannot be undone."
        textVariant="body2"
        handleClose={resetConfirmationBox}
        showSubmit={false}
        maxSize="sm"
        deleteID={idToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default PlanList;
