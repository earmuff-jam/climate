import React, { useState } from 'react';
import SimpleModal from '@/util/SimpleModal';
import { Box, Container } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { useFetchInventoriesList } from '@/features/notifications/notification';
import Categories from './Categories';
import HeaderWithButton from '@/util/HeaderWithButton';
import AddCategory from './AddCategory';

const CategoryList = () => {
  // list of inventories // todo revamp to categories
  const { data, isLoading, isError } = useFetchInventoriesList();
  const [displayModal, setDisplayModal] = useState(false);

  const handleCloseAddCategory = () => setDisplayModal(false);

  const handleDisplayAddSingleInventoryModal = () =>
    setDisplayModal(!displayModal);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth='lg'>
        {/* categories section */}
        <HeaderWithButton
          title='Categories'
          showPrimaryButton={true}
          primaryButtonVariant={'outlined'}
          primaryButtonColor={'primary'}
          primaryButtonTextLabel={'Add Category'}
          showPrimaryStartIcon={true}
          primaryStartIcon={<AddRounded />}
          showSecondaryButton={false}
          handleClickPrimaryButton={handleDisplayAddSingleInventoryModal}
        />
        <Categories />
      </Container>
      {displayModal && (
        <SimpleModal
          title={'Add New Category'}
          handleClose={handleCloseAddCategory}
          showSubmit={false}
          maxSize={'md'}
        >
          <AddCategory />
        </SimpleModal>
      )}
    </Box>
  );
};

export default CategoryList;
