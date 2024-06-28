import { useState } from 'react';
import { Box, Card, CardContent, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { HighlightOffRounded, TrendingUpRounded } from '@mui/icons-material';
import { ConfirmationBoxModal, DisplayNoMatchingRecordsComponent } from '../../util/util';
import {
  fetchInventoryItemsAgainstSelectedMaintenancePlan,
  useDeleteSelectedMaintenancePlan,
  useFetchMaintenanceList,
} from '../../features/maintenancePlan';
import SimpleModal from '../../util/SimpleModal';
import InventoryTable from '../InventoryDetails/InventoryTable';
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
        <SimpleModal
          title={`Item(s) under ${selectedMaintenancePlan?.plan}`}
          handleClose={handleClose}
          maxSize="md"
        >
          <InventoryTable
            plainView={true}
            isLoading={inventoryLoading}
            data={inventoryData?.data || []}
            rowSelected={[]}
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
