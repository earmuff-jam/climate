import { useDeleteSelectedCategory, useFetchCategoryList } from '../../features/categories';
import { Box, Card, CardContent, Grid, IconButton, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { VIEW_CATEGORY_LIST } from './constants';
import { DeleteRounded, TrendingUpRounded } from '@mui/icons-material';

const Categories = () => {
  const { data, isLoading } = useFetchCategoryList();
  const deleteCategoryMutation = useDeleteSelectedCategory();

  const handleDelete = (id) => {
    deleteCategoryMutation.mutate(id);
  };

  if (isLoading) {
    return <Skeleton variant="rounded" animation="wave" height={'100%'} width={'100%'} />;
  }

  return (
    <Grid container spacing={4}>
      {[...VIEW_CATEGORY_LIST, ...data].map((item, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Tooltip title={item.category_description}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <Stack direction={'row'}>
                  <IconButton disabled>{item.icon}</IconButton>
                  <Stack flexGrow={1}>
                    <Typography variant="h6" component="h3">
                      {item.category_name}
                    </Typography>
                    <Box sx={{ px: 1, py: 0, borderRadius: 2, maxWidth: '4rem' }}>
                      <Stack direction={'row'} alignItems={'center'} useFlexGap spacing={1}>
                        <TrendingUpRounded color={index % 2 == 0 ? 'success' : 'error'} />
                        <Typography variant="caption">${item.expensesInPercent ?? 0}%</Typography>
                      </Stack>
                    </Box>
                  </Stack>
                  {item.is_deleteable && (
                    <IconButton onClick={() => item?.is_deleteable && handleDelete(item.id)}>
                      <DeleteRounded />
                    </IconButton>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
