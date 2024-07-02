import { Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import PieBarChart from './PieBarChart';
import { useState } from 'react';
import { ChangeCircleRounded } from '@mui/icons-material';

const CategoryChart = ({ data }) => {
  const [chartVariant, setChartVariant] = useState(false);
  const handleDisplaySelection = () => setChartVariant(!chartVariant);
  return (
    <>
      <HeaderWithButton
        title="More details"
        primaryButtonTextLabel="Display threshold"
        primaryStartIcon={<ChangeCircleRounded color="warning" />}
        secondaryTitle={
          !chartVariant ? (
            <Typography variant="caption">Switch to threshold view to see items that require attention</Typography>
          ) : (
            <Typography variant="caption">Switch selection to view all plan vs total item(s)</Typography>
          )
        }
        handleClickPrimaryButton={handleDisplaySelection}
      />
      <PieBarChart
        legendLabel={!chartVariant ? 'Total item(s) vs categories' : 'Threshold vs categories'}
        data={
          !chartVariant
            ? data.map((v) => ({ name: v.category_name, value: v.totalAssignedItems.length }))
            : data.map((v) => ({ name: v.category_name, value: v.thresholdlimit }))
        }
        backgroundColor="rgba(75, 192, 192, 0.4)"
        borderColor="rgba(75, 192, 192, 1)"
      />
    </>
  );
};

export default CategoryChart;
