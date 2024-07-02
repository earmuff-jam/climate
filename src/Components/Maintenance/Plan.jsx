import { useState } from 'react';
import { AddRounded } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import HeaderWithButton from '../../util/HeaderWithButton';
import SimpleModal from '../../util/SimpleModal';
import AddPlan from './AddPlan';
import PlanList from './PlanList';

const Plan = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const handleAddNewPlan = () => {
    setDisplayModal(!displayModal);
  };
  const handleCloseAddNewPlan = () => {
    setDisplayModal(false);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Container maxWidth="xl">
        {/* Plan section */}
        <HeaderWithButton
          title="Maintenance Plans"
          primaryButtonTextLabel="Add Plan"
          primaryStartIcon={<AddRounded />}
          handleClickPrimaryButton={handleAddNewPlan}
          showRedirectLink={false}
          secondaryTitle="Select total items in each maintenance plan(s) to view all items associated that plan"
        />
        <PlanList /> {/* plan component */}
      </Container>
      {displayModal && (
        <SimpleModal
          title="Add new maintenance plan"
          handleClose={handleCloseAddNewPlan}
          maxSize="md"
        >
          <AddPlan handleCloseAddNewPlan={handleCloseAddNewPlan} />
        </SimpleModal>
      )}
    </Box>
  );
};

export default Plan;
