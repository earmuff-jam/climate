import dayjs from 'dayjs';
import { Box, Card, CardContent, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { useFetchCategoryList } from '../../features/categories';
import { VIEW_CATEGORY_LIST } from './constants';

const AssignCategory = () => {
  const { data, isLoading } = useFetchCategoryList();

  // since we have some default categories we want to allow users to use them if possible
  const allCategories = [...VIEW_CATEGORY_LIST, ...data];
  if (isLoading) return <Skeleton height="1" width="1" variant="rounded" />;
  if (allCategories.length <= 0) return <DisplayNoMatchingRecordsComponent subtitle="Add category to begin" />;
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {allCategories.map((v) => (
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
                  <Tooltip title={v.category_description}>
                    <Typography>{v.category_name}</Typography>
                  </Tooltip>
                  {v?.is_deleteable ? (
                    <>
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
                    </>
                  ) : (
                    <Typography variant="caption">{v.category_description}</Typography>
                  )}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default AssignCategory;
