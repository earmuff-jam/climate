import dayjs from 'dayjs';
import { Alert, Box, Card, CardContent, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { DisplayNoMatchingRecordsComponent } from '../../util/util';
import { useAssignItemsToCategory, useFetchCategories } from '../../features/categories';
import { WarningOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AssignCategory = ({ rowSelected, handleCloseAssignFn }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchCategories();
  const asssignItemToCategory = useAssignItemsToCategory();

  if (isLoading) return <Skeleton height="1" width="1" variant="rounded" />;
  if (data.length <= 0) return <DisplayNoMatchingRecordsComponent subtitle="Add category to begin" />;

  const handleAssignCategory = (categoryID, categoryName, rowSelected) => {
    asssignItemToCategory.mutate({ categoryID, categoryName, selectedItemIDs: rowSelected });
    handleCloseAssignFn();
  };

  const existsInAnotherCategory = data.reduce((acc, el) => {
    const itemsWithinCategory = el.totalAssignedItems;
    const itemExists = itemsWithinCategory.some((item) => rowSelected.includes(item.item_id));
    if (itemExists) {
      acc = true;
    }
    return acc;
  }, false);

  return (
    <Box>
      {existsInAnotherCategory ? (
        <Alert severity="warning" icon={<WarningOutlined fontSize="inherit" color="warning" />} sx={{ mb: 1 }}>
          One or more selected item(s) belongs to an existing category. Adding to another category will not reassign
          selected item. Manage individual items from{' '}
          <Typography
            variant="subtitle"
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/inventories/categories/list')}
          >
            categories section
          </Typography>
        </Alert>
      ) : null}
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
