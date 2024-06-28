import { Box, Container } from '@mui/material';
import { useState } from 'react';
import HeaderWithButton from '../../util/HeaderWithButton';
import { AddRounded } from '@mui/icons-material';
import SimpleModal from '../../util/SimpleModal';
import AddCategory from '../AddCategory/AddCategory';
import Categories from './Categories';

const CategoryListDetails = () => {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCloseAddCategory = () => setDisplayModal(false);

  const handleDisplayAddSingleInventoryModal = () => setDisplayModal(!displayModal);

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        {/* categories section */}
        <HeaderWithButton
          title="Categories"
          showPrimaryButton={true}
          primaryButtonVariant="outlined"
          primaryButtonColor="primary"
          primaryButtonTextLabel="Add Category"
          showPrimaryStartIcon={true}
          primaryStartIcon={<AddRounded />}
          showSecondaryButton={false}
          handleClickPrimaryButton={handleDisplayAddSingleInventoryModal}
        />
        <Categories /> {/* categories component */}
      </Container>
      {displayModal && (
        <SimpleModal title="Add New Category" handleClose={handleCloseAddCategory} maxSize="md">
          <AddCategory handleCloseAddCategory={handleCloseAddCategory} />
        </SimpleModal>
      )}
    </Box>
  );
};

export default CategoryListDetails;
