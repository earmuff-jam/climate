import dayjs from 'dayjs';
import { Box, Card, CardContent, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { useAssignInventoryItemToCategory, useFetchCategoryList } from '../../features/categories';

const AssignCategory = ({ rowSelected, handleCloseAssignFn }) => {
  const { data, isLoading } = useFetchCategoryList();
  const assignInventoryItemToCategory = useAssignInventoryItemToCategory();

  if (isLoading) return <Skeleton height="1" width="1" variant="rounded" />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent subtitle="Add category to begin" />;

  const handleAssignCategory = (categoryID, categoryName, rowSelected) => {
    assignInventoryItemToCategory.mutate({ categoryID, categoryName, selectedItemIDs: rowSelected });
    handleCloseAssignFn();
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {data.map((v) => (
          <Card
            key={v.id}
            onClick={() => handleAssignCategory(v.id, v.category_name, rowSelected)}
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
                        Created around {dayjs(v?.created_on).fromNow()} by {v.creator_name?.username || 'Anonymous'}
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
