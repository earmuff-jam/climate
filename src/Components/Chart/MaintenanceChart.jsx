import { Typography } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import PieBarChart from './PieBarChart';
import { useState } from 'react';
import { ChangeCircleRounded } from '@mui/icons-material';

const MaintenanceChart = ({ data }) => {
  const [displayOverflow, setDisplayOverflow] = useState(false);
  const handleDisplaySelection = () => setDisplayOverflow(!displayOverflow);

  return (
    <>
      <HeaderWithButton
        title="More details"
        showPrimaryButton={true}
        primaryButtonVariant={'outlined'}
        primaryButtonColor={'primary'}
        primaryButtonTextLabel={'Display overdue'}
        showPrimaryStartIcon={true}
        primaryStartIcon={<ChangeCircleRounded color="warning" />}
        showSecondaryTitle={true}
        secondaryTitle={
          !displayOverflow ? (
            <Typography variant="caption">Switch to overdue view to see items that require attention</Typography>
          ) : (
            <Typography variant="caption">{'Switch selection to view all plan vs total item(s)'}</Typography>
          )
        }
        handleClickPrimaryButton={handleDisplaySelection}
      />
      <PieBarChart
        legendLabel={!displayOverflow ? 'Plan vs total item(s)' : 'Overdue vs total items(s)'}
        data={
          !displayOverflow
            ? data.map((v) => ({ name: v.type, value: v.maintenanceItems.length }))
            : data.map((v) => ({ name: v.type, value: v.maintenanceItems.filter((el) => el.overflow).length }))
        }
        backgroundColor={`rgba(75, 192, 192, 0.4)`}
        borderColor={`rgba(75, 192, 192, 1)`}
      />
    </>
  );
};

export default MaintenanceChart;
