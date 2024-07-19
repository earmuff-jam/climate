import { Box, Card, CardContent, Container, Divider, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import PieBarChart from '../../Components/Chart/PieBarChart';
import { CategoryRounded, EngineeringRounded, WarningRounded } from '@mui/icons-material';
import { useFetchCategories, useFetchCategoryItems } from '../../features/categories';
import { useFetchPlanItems, useFetchPlans } from '../../features/plan';
import { useFetchInventories } from '../../features/inventories';

const InventoryOverview = () => {
  const { data: categories = [] } = useFetchCategories();
  const { data: plans = [], loading: isPlansLoading } = useFetchPlans();
  const { data: inventories = [] } = useFetchInventories();
  const { data: categoryItems = [], isLoading: categoryItemsLoading } = useFetchCategoryItems();
  const { data: planItems = [], isLoading: planItemsLoading } = useFetchPlanItems();

  const invItemsWithPrice = inventories?.reduce((acc, el) => {
    acc = acc + parseFloat(el.price);
    return acc;
  }, 0);

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="xl">
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
                      dataLabel={planItems.length || 0}
                      loading={planItemsLoading}
                    />
                  </CardItem>
                  <CardItem>
                    <ColumnItem
                      label="under assigned categories"
                      icon={<CategoryRounded />}
                      color="primary"
                      dataLabel={categoryItems.length || 0}
                      loading={categoryItemsLoading}
                    />
                  </CardItem>
                  <CardItem>
                    <ColumnItem
                      label="require attention"
                      icon={<WarningRounded />}
                      color="error"
                      dataLabel={plans.filter((v) => v.overflow).length || 0}
                      loading={isPlansLoading}
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
                    dataValue={invItemsWithPrice?.toFixed(2)}
                  />
                  <RowItem
                    label="Unestimated items"
                    color="text.secondary"
                    dataValue={inventories.length - inventories?.filter((v) => v.price > 0).length || 0}
                  />
                </Stack>
                <Stack>
                  <HeaderWithButton title="Product Details" />
                  <Stack direction="row" spacing="2rem">
                    <Stack spacing="2rem">
                      <RowItem
                        label="Overdue items"
                        color="error.main"
                        dataValue={plans.filter((v) => v.overflow).length || 0}
                      />
                      <RowItem label="All categories" color="text.secondary" dataValue={categories.length} />
                      <RowItem label="All maintenance plans" color="text.secondary" dataValue={plans.length} />
                      <RowItem label="All inventory items" color="text.secondary" dataValue={inventories.length} />
                    </Stack>
                    <Stack direction="row" spacing="2rem">
                      <Divider orientation="vertical" />
                      <PieBarChart
                        chartType="pie"
                        height="10rem"
                        legendLabel="Need attention"
                        data={[
                          categoryItems.length,
                          planItems.length,
                          inventories.length - (categoryItems.length + planItems.length),
                        ].map((v, index) => ({
                          label: ['under categories', 'under maintenance', 'unassigned'][index],
                          count: v,
                          color: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(211, 211, 211)'][index],
                        }))}
                        backgroundColor="rgba(75, 192, 192, 0.4)"
                        borderColor="rgba(75, 192, 192, 1)"
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
      <Typography textAlign="center" variant="h4" color={color}>
        {dataLabel}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <IconButton disabled size="small">
          {icon}
        </IconButton>
        <Typography variant="caption" textAlign="center">
          item(s)
        </Typography>
      </Stack>
      <Typography>{label}</Typography>
    </Stack>
  );
};

export default InventoryOverview;
