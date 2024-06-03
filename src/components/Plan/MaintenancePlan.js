import HeaderWithButton from '@/util/HeaderWithButton';
import SimpleModal from '@/util/SimpleModal';
import { AddRounded } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import React, { useState } from 'react';
import AddPlan from './AddPlan';
import PlanList from './PlanList';

const MaintenanceTypeList = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const handleAddNewPlan = () => {
    setDisplayModal(!displayModal);
  };
  const handleCloseAddNewPlan = () => {
    setDisplayModal(false);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='lg'>
        {/* Plan section */}
        <HeaderWithButton
          title='Maintenance Plans'
          showPrimaryButton={true}
          primaryButtonVariant={'outlined'}
          primaryButtonColor={'primary'}
          primaryButtonTextLabel={'Add Plan'}
          showPrimaryStartIcon={true}
          primaryStartIcon={<AddRounded />}
          showSecondaryButton={false}
          handleClickPrimaryButton={handleAddNewPlan}
        />
        <PlanList /> {/* plan component */}
      </Container>
      {displayModal && (
        <SimpleModal
          title={'Add new maintenance plan'}
          handleClose={handleCloseAddNewPlan}
          showSubmit={false}
          maxSize={'md'}
        >
          <AddPlan handleCloseAddNewPlan={handleCloseAddNewPlan} />
        </SimpleModal>
      )}
    </Box>
  );
};

export default MaintenanceTypeList;
