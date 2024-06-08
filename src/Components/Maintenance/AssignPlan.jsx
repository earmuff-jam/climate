import { Box, Card, CardContent, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useFetchMaintenanceList } from '../../features/maintenancePlan';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';

const AssignPlan = () => {
  const { data, isLoading } = useFetchMaintenanceList();
  if (isLoading) return <Skeleton height="1" width="1" variant="rounded" />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent subtitle="Add maintenance plan to begin" />;
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {data.map((v) => (
          <Card
            key={v.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              ':hover': {
                cursor: 'pointer',
                bgcolor: 'secondary.light',
              },
            }}
          >
            <CardContent>
              <Stack direction="row">
                <Stack>
                  <Tooltip title={v.description}>
                    <Typography>{v.plan}</Typography>
                  </Tooltip>
                  <Typography variant="caption" color="text.secondary">
                    Created around {dayjs(v?.created_on).fromNow()} by {v.creator_name}
                  </Typography>
                  {v.updated_on === null ? (
                    <Typography variant="caption" color="text.secondary">
                      Never updated
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Last updated around {dayjs(v?.updated_on).fromNow()}
                    </Typography>
                  )}
                </Stack>
                <Typography></Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AssignPlan;
