import { Box, Card, CardContent, Container, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import PieBarChart from '../../Components/Chart/PieBarChart';
import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import { useFetchCategoriesCount, useFetchCategoryItemsCount } from '../../features/categories';
import {
  useFetchItemMaintenancePlanOverdueCount,
  useFetchMaintenancePlanItemsCount,
  useFetchMaintenancePlansCount,
} from '../../features/maintenancePlan';
import { useFetchInventoriesCount, useFetchInventoryItemsCost } from '../../features/inventories';

const InventoryOverview = () => {
  const { data: inventoryItemsWithAssociatedCost } = useFetchInventoryItemsCost();
  const { data: categoriesCount } = useFetchCategoriesCount();
  const { data: inventoriesCount } = useFetchInventoriesCount();
  const { data: maintenancePlanCount } = useFetchMaintenancePlansCount();
  const { data: categoryItemCounts, isLoading: categoryItemCountsLoading } = useFetchCategoryItemsCount();
  const { data: maintenancePlanItemCounts, isLoading: maintenancePlanItemCountsLoading } =
    useFetchMaintenancePlanItemsCount();
  const { data: maintenancePlanItemOverdueCounts, isLoading: maintenancePlanItemOverdueCountsLoading } =
    useFetchItemMaintenancePlanOverdueCount();

  const itemsWithAssociatedCosts = inventoryItemsWithAssociatedCost?.reduce((acc, el) => {
    acc = acc + el.price;
    return acc;
  }, 0);

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <HeaderWithButton title="Overview" />
        <Stack spacing="2rem">
          <Card elevation={0}>
            <CardContent>
              <Stack>
                <HeaderWithButton title="Inventory Summary" />
                <Stack direction="row" spacing={{ xs: 1 }} useFlexGap flexWrap="wrap">
                  <CardItem>
                    <ColumnItem
                      label="under assigned maintenance plan"
                      icon={<EngineeringRounded />}
                      color="primary"
                      dataLabel={maintenancePlanItemCounts || 0}
                      loading={maintenancePlanItemCountsLoading}
                    />
                  </CardItem>
                  <CardItem>
                    <ColumnItem
                      label="under assigned categories"
                      icon={<CategoryRounded />}
                      color="primary"
                      dataLabel={categoryItemCounts || 0}
                      loading={categoryItemCountsLoading}
                    />
                  </CardItem>
                  <CardItem>
                    <ColumnItem
                      label="require attention"
                      icon={<WarningRounded />}
                      color="error"
                      dataLabel={maintenancePlanItemOverdueCounts || 0}
                      loading={maintenancePlanItemOverdueCountsLoading}
                    />
                  </CardItem>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing="2rem" useFlexGap flexWrap="wrap">
                <Stack spacing="2rem">
                  <HeaderWithButton title="Cost Summary" />
                  <RowItem
                    label="Estimated valuation of items"
                    color="text.secondary"
                    dataValue={itemsWithAssociatedCosts}
                  />
                  <RowItem
                    label="Unestimated items"
                    color="text.secondary"
                    dataValue={
                      inventoriesCount - inventoryItemsWithAssociatedCost?.filter((v) => v.price > 0).length || 0
                    }
                  />
                </Stack>
                <Stack>
                  <HeaderWithButton title="Product Details" />
                  <Stack direction="row" spacing="2rem">
                    <Stack spacing="2rem">
                      <RowItem label="Overdue items" color="error.main" dataValue={maintenancePlanItemOverdueCounts} />
                      <RowItem label="All categories" color="text.secondary" dataValue={categoriesCount} />
                      <RowItem label="All maintenance plans" color="text.secondary" dataValue={maintenancePlanCount} />
                      <RowItem label="All inventory items" color="text.secondary" dataValue={inventoriesCount} />
                    </Stack>
                    <Stack direction={'row'} spacing="2rem">
                      <Divider orientation="vertical" />
                      <PieBarChart
                        chartType="pie"
                        height="10rem"
                        legendLabel={'Need attention'}
                        data={[
                          categoryItemCounts,
                          maintenancePlanItemCounts,
                          inventoriesCount - (categoryItemCounts + maintenancePlanItemCounts),
                        ].map((v, index) => ({
                          label: ['under categories', 'under maintenance', 'unassigned'][index],
                          count: v,
                          color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index],
                        }))}
                        backgroundColor={`rgba(75, 192, 192, 0.4)`}
                        borderColor={`rgba(75, 192, 192, 1)`}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
};

const CardItem = ({ children }) => (
  <Card sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
    <CardContent>{children}</CardContent>
  </Card>
);

const RowItem = ({ label, color, dataValue }) => {
  return (
    <Stack direction="row" justifyContent="space-between" spacing="2rem">
      <Typography color={color}>{label}</Typography>
      <Typography color={color}>{dataValue}</Typography>
    </Stack>
  );
};

const ColumnItem = ({ label, dataLabel, icon, color, loading }) => {
  if (loading) return <Skeleton width="100%" height="1rem" />;
  return (
    <Stack>
      <Typography textAlign={'center'} variant="h4" color={color}>
        {dataLabel}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent={'center'}>
        <IconButton disabled size="small">
          {icon}
        </IconButton>
        <Typography variant="caption" textAlign={'center'}>
          item(s)
        </Typography>
      </Stack>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default InventoryOverview;
