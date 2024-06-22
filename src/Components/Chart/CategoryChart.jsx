import { Box, Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import PieBarChart from './PieBarChart';
import { useState } from 'react';
import { ChangeCircleRounded } from '@mui/icons-material';

const CategoryChart = ({ data }) => {
  const [chartVariant, setChartVariant] = useState(false);
  const handleDisplaySelection = () => setChartVariant(!chartVariant);

  console.log(data);
  return (
    <Box>
      <HeaderWithButton
        title="More details"
        showPrimaryButton={true}
        primaryButtonVariant={'outlined'}
        primaryButtonColor={'primary'}
        primaryButtonTextLabel={'Display threshold'}
        showPrimaryStartIcon={true}
        primaryStartIcon={<ChangeCircleRounded color="warning" />}
        showSecondaryTitle={true}
        secondaryTitle={
          !chartVariant ? (
            <Typography variant="caption">Switch to overdue view to see items that require attention</Typography>
          ) : (
            <Typography variant="caption">{'Switch selection to view all plan vs total item(s)'}</Typography>
          )
        }
        handleClickPrimaryButton={handleDisplaySelection}
        showSecondaryButton={false}
      />
      <PieBarChart
        legendLabel={!chartVariant ? 'Total item(s) vs categories' : 'Threshold vs categories'}
        data={
          !chartVariant
            ? data.map((v) => ({ name: v.category_name, value: v.totalAssignedItems.length }))
            : data.map((v) => ({ name: v.category_name, value: v.thresholdlimit }))
        }
        backgroundColor={`rgba(75, 192, 192, 0.4)`}
        borderColor={`rgba(75, 192, 192, 1)`}
      />
    </Box>
  );
};

export default CategoryChart;
