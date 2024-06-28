import { Card, Skeleton, Stack, Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import { useFetchCategoryList } from '../../features/categories';
import dayjs from 'dayjs';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import LimitMenu from './LimitMenu';

const CategoryFrequency = () => {
  const { data, isLoading } = useFetchCategoryList();

  if (isLoading) return <Skeleton height={100} width={'100%'} /> 
  return (
    <Stack>
      <HeaderWithButton
        title="Thresholds against categories"
        titleVariant="h6"
        showSecondaryTitle="true"
        secondaryTitle={'Adding threshold will setup alerts for items that fall below the provisioned limit'}
      />
      {data?.length <= 0 ? (
        <DisplayNoMatchingRecordsComponent subtitle="Add categories to setup thresholds" />
      ) : (
        data?.map((v) => (
          <Card key={v.id} elevation={2} direction="row" sx={{ width: '50vh', p: 1, m: 1 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack>
                <Typography>{v.category_name}</Typography>
                <Typography variant="caption">Total Items: {v.totalAssignedItems.length}</Typography>
                <Typography variant="caption">Created around {dayjs(v.created_on).fromNow()}</Typography>
              </Stack>
              <LimitMenu category={v} />
            </Stack>
          </Card>
        ))
      )}
    </Stack>
  );
};

export default CategoryFrequency;
